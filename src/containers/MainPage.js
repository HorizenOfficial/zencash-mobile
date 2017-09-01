import React from 'react';
import QRCode from 'qrcode.react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Page,
  PullHook,
  Splitter,
  SplitterSide,
  SplitterContent,
  Dialog,
  Toolbar,
  ToolbarButton,
  Button,
  BackButton,
  Icon,
  List,
  ListItem,
  ListHeader
} from 'react-onsenui';

import axios from 'axios'

import { setAddress, setPrivateKey, setAddressValue } from '../actions/Context'

import SendPage from './SendPage';
import SettingsPage from '../components/SettingsPage'

import { urlAppend } from '../utils/index'

const TX_ITEM_COUNT = 10; // How many tx do we wanna get at one time

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderOpen: false,
      dialogOpen: false,        
      selectedAddress: '',
      selectedAddressValue: null,      
      selectedAddressTxFrom: 10,
      selectedAddressTxTo: 0,
      selectedAddressTxs: [],
      selectedAddressNoTxs: false,
      selectedAddressScannedTxs: false, // Have we tried and fined the txs? (used to display loading...)
    };

    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
    this.gotoComponent = this.gotoComponent.bind(this)
    this.setAddressInfo = this.setAddressInfo.bind(this)    
    this.setAddressTxList = this.setAddressTxList.bind(this)    
    this.handlePullLoad = this.handlePullLoad.bind(this)
  }

  hide() {
    this.setState({
      sliderOpen: false
    });
  }

  show() {
    this.setState({
      sliderOpen: true
    });
  }

  handlePullLoad(done){
    const address = this.props.secrets.items[0].address;
    this.setAddressInfo(address)
    done()
  }

  toggleDialog() {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    })
  }  

  // Sets information about address
  setAddressInfo(address) {
    // Resets
    this.setState({      
      selectedAddressValue: null
    })

    // How many zen
    const addrURL = urlAppend(this.props.settings.insightAPI, 'addr/' + address + '/')    
    axios.get(addrURL)
    .then(function(resp){
      const addr_info = resp.data
      this.setState({                
        selectedAddressValue: addr_info.totalReceived
      })
      this.props.setAddressValue(addr_info.totalReceived)
    }.bind(this))
    .catch(function(err){
      alert(err)
    })

    // Sets information about tx
    // When we set address info
    // we get a new address, user isn't pulling down to refresh
    this.setAddressTxList(address, false)
  }

  // Sets information about tx  
  setAddressTxList(address, append=true) {
    const txInfoURL = urlAppend(this.props.settings.insightAPI, 'addrs/' + address + '/txs?from=' + this.state.selectedAddressTxFrom + '&to=' + this.state.selectedAddressTxTo)

    this.setState({
      selectedAddressScannedTxs: false
    })

    axios.get(txInfoURL)
    .then(function(resp){
      const txinfo = resp.data      
      const curTxs = this.state.selectedAddressTxs || []
      const newTxs = append ? curTxs.concat(txinfo.items) : txinfo.items      
      
      this.setState({
        selectedAddressTxs: newTxs,
        selectedAddressNoTxs: newTxs.length === 0,
        selectedAddressScannedTxs: true
      })
    }.bind(this))
    .catch(function(err){
      alert(err)
    })
  }

  gotoComponent(c) {    
    this.props.navigator.pushPage({component: c});
    this.setState({
      sliderOpen: false
    })
  }

  componentDidMount() {
    if (this.props.secrets.items.length > 0){
      const address = this.props.secrets.items[0].address;
      this.props.setAddress(address) // for the send page
      this.setState({
        selectedAddress: address        
      }, () => {
        this.setAddressInfo(address)                
      })      
    }
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <ToolbarButton onClick={(e) => this.show()}>
            <Icon icon='ion-navicon, material:md-menu' />
          </ToolbarButton>
        </div>
        <div className='center'>
          ZENCash Wallet
        </div>
        <div className='right'>
          <ToolbarButton onClick={(e) => this.toggleDialog()}>
            <Icon icon='ion-clipboard'/>
          </ToolbarButton>
        </div>        
      </Toolbar>
    );
  }

  render() {
    return (
      <Page>        
        <Splitter>
          <SplitterSide
            side='left'
            isOpen={this.state.sliderOpen}
            onClose={(e) => this.hide()}
            onOpen={(e) => this.show()}
            collapse={true}
            width={240}
            isSwipeable={true}>
            <Page>
              <List
                dataSource=
                {[{
                    name: 'Send',
                    component: SendPage
                  },
                  {
                    name: 'Settings',
                    component: SettingsPage
                  }
                ]}                
                renderHeader={() => <ListHeader>ZEN</ListHeader>}
                renderRow={(i) => 
                  <ListItem
                    onClick={() => this.gotoComponent(i.component)}
                    modifier='longdivider'
                    tappable>
                    {i.name}
                  </ListItem>
                }
              />
            </Page>
          </SplitterSide>

          <SplitterContent>
            <Page renderToolbar={(e) => this.renderToolbar()}>
              <PullHook onChange={this.handlePullChange} onLoad={this.handlePullLoad}>                
              </PullHook>              
              <div style={{textAlign: 'center'}}>
                <p>
                  <QRCode value={this.state.selectedAddress}/>                
                </p>
                <p style={{fontSize: '13px'}}>
                  Value: {
                    this.state.selectedAddressValue === null ?
                    'loading...' :
                    this.state.selectedAddressValue + ' ZEN'
                  }
                </p>
                <p style={{fontSize: '12px'}}>                  
                  Address: { this.state.selectedAddress }
                </p>
                
                <Button                  
                  style={{fontSize: '12px', marginBottom: '10px', width: '90%'}}>                  
                  Copy address to clipboard
                </Button>                
              </div>

              <hr/>             

              <List>
                {
                  this.state.selectedAddressScannedTxs === false ?
                  (
                    <ListHeader>
                      <div style={{textAlign: 'center'}}>
                        <Icon icon='spinner' spin/>
                      </div>
                    </ListHeader>
                  ) : 
                  this.state.selectedAddressNoTxs ?
                  (
                    <ListHeader>
                      No transaction history found
                    </ListHeader>
                  )
                  :
                  this.state.selectedAddressTxs.map(function(tx){
                    const selectedAddress = this.state.selectedAddress
                    const vins = tx.vin || []
                    const vouts = tx.vout || []
                    var ret

                    // Are we receiving zen?
                    // and whats the amount of zen we receive / sent?
                    function getTxListItem (received, value) {
                      return (
                        <ListItem tappable>
                          <ons-row>
                            <ons-col>{ received ? 'Received' : 'Sent' }</ons-col>
                            <ons-col style={{textAlign: 'right', paddingRight: '12px'}}>
                              { received ? '+' : '-' } { value } zen
                            </ons-col>
                          </ons-row>
                        </ListItem>
                      )
                    }                    

                    vins.forEach(function(vin){
                      if (vin.addr === selectedAddress){                     
                        ret = getTxListItem(false, vin.value)                        
                      }
                    })
                    
                    if (ret === undefined){
                      vouts.forEach(function(vout){                      
                        vout.scriptPubKey.addresses.forEach(function(addr){
                          if (addr === selectedAddress){
                            ret = getTxListItem(true, vout.value)                            
                          }
                        })
                      })
                    }

                    return ret                               
                  }.bind(this))
                }                
              </List>        
            </Page>
          </SplitterContent>
        </Splitter>        

        <Dialog
          isOpen={this.state.dialogOpen}
          onCancel={this.toggleDialog}
          cancelable>
          <List>
            <ListHeader>Choose Another Address</ListHeader>
            {
              this.props.secrets.items.map(function(e){
                return (
                  <ListItem
                    style={{fontSize: '12px'}}
                    onClick={function(){
                      // Some redundancy
                      // TODO: set so mainpage uses
                      // this.props.context
                      // instead of this.state.selectedAddress..
                      this.props.setAddress(e.address)
                      this.props.setPrivateKey(e.privateKey)
                      this.setState({
                        selectedAddress: e.address,
                        selectedAddressValue: 'loading...',
                        dialogOpen: false
                      })
                      this.setAddressInfo(e.address)                      
                    }.bind(this)}
                    tappable
                  >
                  { e.address }
                  </ListItem>
                )
              }.bind(this))
            }            
          </List>
        </Dialog>
      </Page>
    );
  }
}


function mapStateToProps(state){  
  return {
    secrets: state.secrets,
    settings: state.settings    
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setAddress,
      setAddressValue,
      setPrivateKey
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage);