import React from 'react';
import QRCode from 'qrcode.react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Page,
  Dialog,
  Toolbar,
  ToolbarButton,
  Button,
  BackButton,
  Icon,
  List,
  ListItem,
  ListHeader,
  Fab,
  SpeedDial,
  SpeedDialItem
} from 'react-onsenui';


import { 
  setAddress,
  setPrivateKey,
  setAddressValue,
  setZenInBtcValue,
  setZenInCurrencyValue
} from '../actions/Context'
import { urlAppend } from '../utils/index'

import AddressInfoPage from './AddressInfoPage'
import SendPage from './SendPage';
import SettingsPage from './SettingsPage'

import TRANSLATIONS from '../translations'

// Helper function to format prices to decimal places
// of 5 by default
function prettyFormatPrices (v, decimalPlaces=5) {
  return parseFloat(v).toFixed(decimalPlaces)
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {      
      dialogSelectAddressOpen: false,      
      selectedAddressTxFrom: 0,
      selectedAddressTxTo: 50,
      selectedAddressTxs: [],
      selectedAddressNoTxs: false,
      selectedAddressScannedTxs: false, // Have we tried and fined the txs? (used to display loading...)
    };
    
    this.toggleSelectAddressDialog = this.toggleSelectAddressDialog.bind(this)
    this.gotoComponent = this.gotoComponent.bind(this)
    this.setAddressInfo = this.setAddressInfo.bind(this)    
    this.setAddressTxList = this.setAddressTxList.bind(this)        
  }

  toggleSelectAddressDialog() {
    this.setState({
      dialogSelectAddressOpen: !this.state.dialogSelectAddressOpen
    })
  }

  // Sets information about address
  setAddressInfo(address) {
    // Resets
    this.props.setAddressValue(null)
    this.props.setZenInBtcValue(null)    
    this.props.setZenInCurrencyValue(null)

    // How many zen
    const addrURL = urlAppend(this.props.settings.insightAPI, 'addr/' + address + '/')
    cordovaHTTP.get(addrURL, {}, {},
      function(resp){
        const addr_info = JSON.parse(resp.data)
        const addr_balance = parseFloat(addr_info.balance)
        this.props.setAddressValue(prettyFormatPrices(addr_balance))

        // Get btc value and get local currency
        // via coinmarketcap
        const curCurrency = this.props.settings.currency
        const cmcZenInfoURL = 'https://api.coinmarketcap.com/v1/ticker/zencash/?convert=' + curCurrency
        cordovaHTTP.get(cmcZenInfoURL, {}, {},
          function(resp){
            try{
              const coinmarketcap_data = JSON.parse(resp.data)              
              const price_btc = addr_balance * parseFloat(coinmarketcap_data[0].price_btc)
              const price_currency = addr_balance * parseFloat(coinmarketcap_data[0]['price_' + curCurrency.toLowerCase()])
              
              this.props.setZenInBtcValue(prettyFormatPrices(price_btc))
              this.props.setZenInCurrencyValue(prettyFormatPrices(price_currency))
            } catch(err){
              alert(err)
            }            
          }.bind(this)
        ), (err) => alert(JSON.stringify(err))
      }.bind(this), (err) => alert(JSON.stringify(err))
    )    

    // Sets information about tx
    // When we set address info
    this.setAddressTxList(address, false)

    // Convert the amount of zen we have to BTC
  }

  // Sets information about tx  
  setAddressTxList(address, append=true) {
    const txInfoURL = urlAppend(this.props.settings.insightAPI, 'addrs/' + address + '/txs?from=' + this.state.selectedAddressTxFrom + '&to=' + this.state.selectedAddressTxTo)    

    this.setState({
      selectedAddressScannedTxs: false
    })

    cordovaHTTP.get(txInfoURL, {}, {},
      function(resp){        
        const txinfo = JSON.parse(resp.data)
        const curTxs = this.state.selectedAddressTxs || []        
        const newTxs = append ? curTxs.concat(txinfo.items) : txinfo.items        
        
        this.setState({
          selectedAddressTxs: newTxs,
          selectedAddressNoTxs: newTxs.length === 0,
          selectedAddressScannedTxs: true
        })
      }.bind(this), (err) => alert(JSON.stringify(err)))
  }

  gotoComponent(c) {    
    this.props.navigator.pushPage({component: c});  
  }

  componentDidMount() {    
    if (this.props.secrets.items.length > 0){
      const address = this.props.secrets.items[0].address;
      const privateKey = this.props.secrets.items[0].privateKey;

      this.props.setAddress(address) // for the send page
      this.props.setPrivateKey(privateKey)
      this.setAddressInfo(address)      
    }
  }

  componentWillReceiveProps(nextProps) { 
    // Update component if either the address or the currency is updated
    if (nextProps.context.address !== this.props.context.address){
      this.setAddressInfo(nextProps.context.address)
    }

    else if (nextProps.settings.currency !== this.props.settings.currency){
      this.setAddressInfo(nextProps.context.address)
    }
  }

  renderFixed() {
    return (
      <SpeedDial position='bottom right'>
        <Fab>          
          <Icon icon='md-plus' />          
        </Fab>

        <SpeedDialItem onClick={() => this.gotoComponent(SendPage)}>
          <Icon icon='ion-paper-airplane' />
        </SpeedDialItem>
        <SpeedDialItem onClick={() => this.gotoComponent(AddressInfoPage)}>
          <Icon icon='ion-qr-scanner' />
        </SpeedDialItem>   
      </SpeedDial>
    );
  }

  renderToolbar() {
    // toolbar title in X language
    const CUR_LANG = this.props.settings.language
    const titleLang = TRANSLATIONS[CUR_LANG].MainPage.title

    return (
      <Toolbar>
        <div className='center'>
          { titleLang }
        </div>
        <div className='right'>
          <ToolbarButton onClick={() => this.gotoComponent(SettingsPage)}>
            <Icon icon='ion-wrench'/>
          </ToolbarButton>
          <ToolbarButton onClick={() => this.setAddressInfo(this.props.context.address)}>
            <Icon icon='ion-refresh'/>
          </ToolbarButton>
          <ToolbarButton onClick={(e) => this.toggleSelectAddressDialog()}>
            <Icon icon='ion-clipboard'/>
          </ToolbarButton>
        </div>        
      </Toolbar>
    );
  }

  render() {
    // Language translations
    const CUR_LANG = this.props.settings.language
    const valueLang = TRANSLATIONS[CUR_LANG].MainPage.value
    const addressLang = TRANSLATIONS[CUR_LANG].General.address
    const copyToClipboardLang = TRANSLATIONS[CUR_LANG].MainPage.copyToClipboard
    const sendLang = TRANSLATIONS[CUR_LANG].MainPage.send
    const sentLang = TRANSLATIONS[CUR_LANG].MainPage.sent
    const receivedLang = TRANSLATIONS[CUR_LANG].MainPage.received
    const settingsLang = TRANSLATIONS[CUR_LANG].MainPage.settings
    const noTxFoundLang = TRANSLATIONS[CUR_LANG].MainPage.noTxFound
    const loadingLang = TRANSLATIONS[CUR_LANG].General.loading  

    // For qr scanning
    const pageOpacity = this.props.context.qrScanning ? '0.0' : '1.0'

    return (      
      <Page 
        style={{ opacity: pageOpacity }}
        renderToolbar={(e) => this.renderToolbar()}
        renderFixed={(e) => this.renderFixed()}>        

        <ons-row style={{marginTop: '25px', marginBottom: '25px', overflowWrap: 'break-word'}}>
          <ons-col width={'47%'}>
          <h1 style={{marginLeft: '12px'}}>
            {
              this.props.context.value === null ?
              loadingLang :
              this.props.context.value
            }&nbsp;
            {
              this.props.context.value === null ?
              null :
              <span style={{fontSize: '16px'}}>ZEN</span>
            }     
          </h1>
          </ons-col>          
          <ons-col>
            <ons-row>
              <ons-col>
                <h5 style={{marginLeft: '12px'}}>
                  BTC<br/>
                  {
                    this.props.context.BTCValue === null ?
                    loadingLang :
                    this.props.context.BTCValue
                  }
                </h5>
              </ons-col>
              <ons-col>
                <h5 style={{marginLeft: '12px'}}>
                  { this.props.settings.currency }<br/>
                  {
                    this.props.context.currencyValue === null ?
                    loadingLang :
                    this.props.context.currencyValue
                  }
                </h5>
              </ons-col>
            </ons-row>            
          </ons-col>
        </ons-row>

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
                { noTxFoundLang }
              </ListHeader>
            )
            :
            this.state.selectedAddressTxs.map(function(tx){
              const selectedAddress = this.props.context.address
              const vins = tx.vin || []
              const vouts = tx.vout || []
              var ret

              // Are we receiving zen?
              // and whats the amount of zen we receive / sent?
              function getTxListItem (received, value) {
                return (
                  <ListItem tappable>
                    <ons-row>
                      <ons-col>{ received ? receivedLang : sentLang }</ons-col>
                      <ons-col style={{textAlign: 'right', paddingRight: '12px'}}>
                        { received ? '+' : '-' } { parseFloat(value) } zen
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

        <Dialog
          isOpen={this.state.dialogSelectAddressOpen}
          onCancel={this.toggleSelectAddressDialog}
          animationOptions={
            {duration: 0.1, delay: 0.2}
          }
          cancelable>
          <List>
            <ListHeader>{ addressLang }</ListHeader>
            {
              this.props.secrets.items.map(function(e){
                return (
                  <ListItem
                    style={{fontSize: '14px'}}
                    onClick={function(){
                      this.props.setAddress(e.address)
                      this.props.setPrivateKey(e.privateKey)                      
                      this.setState({                        
                        dialogSelectAddressOpen: false
                      })
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
    settings: state.settings,
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setAddress,
      setAddressValue,
      setPrivateKey,
      setZenInBtcValue,
      setZenInCurrencyValue
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage)