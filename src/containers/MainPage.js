import React from 'react';
import QRCode from 'qrcode.react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Page,
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

import SendPage from '../components/SendPage';
import SettingsPage from '../components/SettingsPage'

import { urlAppend } from '../utils/index'

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderOpen: false,
      dialogOpen: false,
      selectedAddress: '',
      selectedAddressValue: 'loading...',
      totalZenValue: 'loading...'
    };

    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
    this.gotoComponent = this.gotoComponent.bind(this)
    this.getAddressInfo = this.getAddressInfo.bind(this)
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

  toggleDialog() {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    })
  }

  getAddressInfo(address) {    
    const addrURL = urlAppend(this.props.settings.insightAPI, 'addr/' + address + '/')    
    axios.get(addrURL)
    .then(function(addr_info){    
      console.log(addr_info)  
      this.setState({                
        selectedAddressValue: addr_info.data.totalReceived
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
    if (this.props.secrets.length > 0){
      const address = this.props.secrets[0].address;
      this.setState({
        selectedAddress: address        
      }, this.getAddressInfo(address))      
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
                    name: 'send',
                    component: SendPage
                  },
                  {
                    name: 'settings',
                    component: SettingsPage
                  }
                ]}                
                renderHeader={() => <ListHeader>zen</ListHeader>}
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
              <p style={{fontSize: '15px', textAlign: 'center'}}>
                Total ZEN: 12324242.12131
              </p>              

              <hr/>

              <div style={{textAlign: 'center'}}>
                <p>
                  <QRCode value={this.state.selectedAddress}/>                
                </p>
                <p style={{fontSize: '13px'}}>
                  Value: {
                    this.state.selectedAddressValue === 'loading...' ?
                    this.state.selectedAddressValue :
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
                <ListItem tappable>
                  <ons-row>
                    <ons-col>+ Received</ons-col>
                    <ons-col style={{textAlign: 'right', paddingRight: '12px'}}>
                      10.0000000000 zen
                    </ons-col>
                  </ons-row>
                </ListItem>
                <ListItem tappable>
                  <ons-row>
                    <ons-col>+ Received</ons-col>
                    <ons-col style={{textAlign: 'right', paddingRight: '12px'}}>
                      10.0000000000 zen
                    </ons-col>
                  </ons-row>
                </ListItem>    
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
              this.props.secrets.map(function(e){
                return (
                  <ListItem
                    style={{fontSize: '12px'}}
                    onClick={function(){                      
                      this.setState({
                        selectedAddress: e.address,
                        selectedAddressValue: 'loading...',
                        dialogOpen: false
                      })
                      this.getAddressInfo(e.address)
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


export default connect(mapStateToProps)(MainPage);