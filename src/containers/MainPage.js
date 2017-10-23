import 'babel-polyfill'

import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  Page,
  Dialog,
  Toolbar,
  ToolbarButton,
  BackButton,
  Icon,
  List,
  ListItem,
  ListHeader,
  Fab,
  Splitter,
  SplitterSide,
  SplitterContent,
  SpeedDial,
  SpeedDialItem
} from 'react-onsenui'

import {
  setAddress,
  setPrivateKey,
  setAddressValue,
  setZenInBtcValue,
  setZenInCurrencyValue
} from '../actions/Context'
import { LANG_ENGLISH } from '../actions/Settings'
import { urlAppend, prettyFormatPrices } from '../utils/index'

import AddressInfoPage from './AddressInfoPage'
import SendPage from './SendPage'
import AboutPage from './AboutPage'
import SettingsPage from './SettingsPage'
import ContactsPage from './ContactsPage'

import TRANSLATIONS from '../translations'

const getTxDetailPage = (navigator, tx, curLang = LANG_ENGLISH) => {
  const curTranslation = TRANSLATIONS[curLang]
  const txPage = () => (
    <Page renderToolbar={() => (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => navigator.popPage()}>Back</BackButton>
        </div>
      </Toolbar>
    )}>
      <List style={{wordBreak: 'break-word'}}>
        <ListItem tappable>
          <ons-row><strong>{ curTranslation.TxDetailPage.txid }</strong></ons-row>
          <ons-row>{tx.txid}</ons-row>
        </ListItem>
        <ListItem tappable>
          <ons-row><strong>{ curTranslation.TxDetailPage.blockhash }</strong></ons-row>
          <ons-row>{tx.blockhash}</ons-row>
        </ListItem>
        <ListItem tappable>
          <ons-row><strong>{ curTranslation.General.version }</strong></ons-row>
          <ons-row>{tx.version}</ons-row>
        </ListItem>
        <ListItem tappable>
          <ons-row><strong>{ curTranslation.TxDetailPage.blockheight }</strong></ons-row>
          <ons-row>{tx.blockheight}</ons-row>
        </ListItem>
        <ListItem tappable>
          <ons-row><strong>{ curTranslation.TxDetailPage.confirmations }</strong></ons-row>
          <ons-row>{tx.confirmations}</ons-row>
        </ListItem>
        <ListItem tappable>
          <ons-row><strong>{ curTranslation.General.fees }</strong></ons-row>
          <ons-row>{tx.fees}</ons-row>
        </ListItem>
        <ListItem tappable>
          <ons-row><strong>{ curTranslation.General.in }&nbsp;({tx.valueIn} ZEN)</strong></ons-row>
          {
            tx.vin.map(function (vin, idx) {
              return (
                <ons-row key={idx} style={{marginTop: '10px'}}>
                  <ons-col width={'90%'}>
                    { vin.addr }<br/>
                    <span style={{color: '#7f8c8d'}}>({ vin.value } ZEN)</span>
                  </ons-col>

                  <ons-col width={'10%'}>
                    <Icon icon='ion-arrow-right-c'/>
                  </ons-col>
                </ons-row>
              )
            })
          }
        </ListItem>
        <ListItem tappable>
          <ons-row><strong>{ curTranslation.General.out } ({tx.valueOut} ZEN)</strong></ons-row>
          {
            tx.vout.map(function (vout, idx) {
              return (
                <ons-row key={idx} style={{marginTop: '10px'}}>
                  <ons-col width={'90%'}>
                    { vout.scriptPubKey.addresses[0] }<br/>
                    <span style={{color: '#7f8c8d'}}>({ vout.value } ZEN)</span>
                  </ons-col>

                  <ons-col width={'10%'}>
                    <Icon icon='ion-arrow-left-c'/>
                  </ons-col>
                </ons-row>
              )
            })
          }
        </ListItem>
      </List>
    </Page>
  )
  return txPage
}

class MainPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      splitterOpen: false,
      dialogSelectAddressOpen: false,
      connectionError: false, // Are we connected to the internet or nah.
      selectedAddressTxFrom: 0,
      selectedAddressTxTo: 50,
      selectedAddressTxs: [],
      selectedAddressNoTxs: false,
      selectedAddressScannedTxs: false // Have we tried and fined the txs? (used to display loading...)      
    }

    this.toggleSelectAddressDialog = this.toggleSelectAddressDialog.bind(this)
    this.gotoComponent = this.gotoComponent.bind(this)
    this.setAddressInfo = this.setAddressInfo.bind(this)
    this.setAddressTxList = this.setAddressTxList.bind(this)
    this.setConnectionError = this.setConnectionError.bind(this)
  }

  toggleSelectAddressDialog () {
    this.setState({
      dialogSelectAddressOpen: !this.state.dialogSelectAddressOpen
    })
  }

  setConnectionError (b) {
    this.setState({
      connectionError: b
    })
  }

  // Sets information about address
  setAddressInfo (address) {
    // Resets
    this.setConnectionError(false)
    this.props.setAddressValue(null)
    this.props.setZenInBtcValue(null)
    this.props.setZenInCurrencyValue(null)

    // How many zen
    const addrURL = urlAppend(this.props.settings.insightAPI, 'addr/' + address + '/')
    cordovaHTTP.get(addrURL, {}, {},
      (resp) => {
        try {
          const addrInfo = JSON.parse(resp.data)
          const addrBalance = parseFloat(addrInfo.balance)
          this.props.setAddressValue(addrBalance)
        } catch (err) {
          if (err) {
            console.log(err)
          }
          this.setConnectionError(true)
        }

        // Get btc value and get local currency
        // via coinmarketcap
        const curCurrency = this.props.settings.currency
        const cmcZenInfoURL = 'https://api.coinmarketcap.com/v1/ticker/zencash/?convert=' + curCurrency
        cordovaHTTP.get(cmcZenInfoURL, {}, {},
          (resp) => {
            try {
              const coinmarketcapData = JSON.parse(resp.data)
              const priceBtc = parseFloat(coinmarketcapData[0]['price_btc'])
              const priceCurrency = parseFloat(coinmarketcapData[0]['price_' + curCurrency.toLowerCase()])

              this.props.setZenInBtcValue(priceBtc)
              this.props.setZenInCurrencyValue(priceCurrency)
            } catch (err) {
              if (err) {
                console.log(err)
              }
              this.setConnectionError(true)
            }
          }, (err) => {
            if (err) {
              // If there's an error here
              // I think it's safe to assume that 
              // there is no connection
              console.log(err)
            }

            this.setConnectionError(true)
          }
        )
      }, (err) => {
        if (err) {
          // If there's an error here
          // I think it's safe to assume that 
          // there is no connection
          console.log(err)
        }

        this.setConnectionError(true)
      }
    )

    // Sets information about tx
    // When we set address info
    this.setAddressTxList(address, false)
  }

  // Sets information about tx  
  setAddressTxList (address, append = true) {
    const txInfoURL = urlAppend(this.props.settings.insightAPI, 'addrs/' + address + '/txs?from=' + this.state.selectedAddressTxFrom + '&to=' + this.state.selectedAddressTxTo)

    this.setState({
      selectedAddressScannedTxs: false
    })

    cordovaHTTP.get(txInfoURL, {}, {},
      (resp) => {
        const txinfo = JSON.parse(resp.data)
        const curTxs = this.state.selectedAddressTxs || []
        const newTxs = append ? curTxs.concat(txinfo.items) : txinfo.items

        this.setState({
          selectedAddressTxs: newTxs,
          selectedAddressNoTxs: newTxs.length === 0,
          selectedAddressScannedTxs: true
        })
      }, (err) => {
        if (err) {
          console.log(err)
        }
        this.setConnectionError(true)
      })
  }

  gotoComponent (c) {
    this.props.navigator.pushPage({component: c})
    if (this.state.splitterOpen) {
      this.setState({
        splitterOpen: false
      })
    }
  }

  componentDidMount () {
    if (this.props.secrets.items.length > 0) {
      const address = this.props.secrets.items[0].address
      const privateKey = this.props.secrets.items[0].privateKey

      this.props.setAddress(address) // for the send page
      this.props.setPrivateKey(privateKey)
      this.setAddressInfo(address)
    }
  }

  componentWillReceiveProps (nextProps) {
    // Update component if either the address or the currency is updated
    if (nextProps.context.address !== this.props.context.address) {
      this.setAddressInfo(nextProps.context.address)
    } else if (nextProps.settings.currency !== this.props.settings.currency) {
      this.setAddressInfo(nextProps.context.address)
    }
  }

  renderFixed () {
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
    )
  }

  renderToolbar () {
    // toolbar title in X language
    const CUR_LANG = this.props.settings.language
    const titleLang = TRANSLATIONS[CUR_LANG].MainPage.title

    return (
      <Toolbar>
        <div className='left'>
          <ToolbarButton onClick={() => this.setState({ splitterOpen: true })}>
            <Icon icon='ion-navicon, material:md-menu' />
          </ToolbarButton>
        </div>
        <div className='center'>
          { titleLang }
        </div>
        <div className='right'>
          <ToolbarButton onClick={() => this.setAddressInfo(this.props.context.address)}>
            <Icon icon='ion-refresh'/>
          </ToolbarButton>
          <ToolbarButton onClick={(e) => this.toggleSelectAddressDialog()}>
            <Icon icon='ion-clipboard'/>
          </ToolbarButton>
        </div>
      </Toolbar>
    )
  }

  render () {
    // Language translations
    const CUR_LANG = this.props.settings.language
    const addressLang = TRANSLATIONS[CUR_LANG].General.address
    const sentLang = TRANSLATIONS[CUR_LANG].MainPage.sent
    const receivedLang = TRANSLATIONS[CUR_LANG].MainPage.received
    const settingsLang = TRANSLATIONS[CUR_LANG].SettingsPage.title
    const aboutLang = TRANSLATIONS[CUR_LANG].AboutPage.title
    const noTxFoundLang = TRANSLATIONS[CUR_LANG].MainPage.noTxFound
    const loadingLang = TRANSLATIONS[CUR_LANG].General.loading
    const noConnectionLang = TRANSLATIONS[CUR_LANG].MainPage.noConnection
    const contactsLang = TRANSLATIONS[CUR_LANG].ContactsPage.contacts

    // For qr scanning
    const pageOpacity = this.props.context.qrScanning ? '0.0' : '1.0'
    const pageStyle = this.props.context.qrScanning ? { opacity: pageOpacity, visibility: 'visible', transition: 'all 0.1s ease-out' } : {}

    return (
      <Page
        style={pageStyle}>
        <Splitter>
          <SplitterSide
            style={pageStyle}
            side='left'
            isOpen={this.state.splitterOpen}
            onClose={(e) => this.setState({ splitterOpen: false })}
            onOpen={(e) => this.setState({ splitterOpen: true })}
            collapse={true}
            width={240}
            isSwipeable={true}>
            <Page>
              <List
                dataSource=
                  {[
                    {
                      name: aboutLang,
                      component: AboutPage
                    },
                    {
                      name: contactsLang,
                      component: ContactsPage
                    },
                    {
                      name: settingsLang,
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
            <Page
              style={{ opacity: pageOpacity }}
              renderToolbar={(e) => this.renderToolbar()}
              renderFixed={(e) => this.renderFixed()}>
              <ons-row style={{marginTop: '25px', marginBottom: '25px', overflowWrap: 'break-word'}}>
                <ons-col width={'47%'}>
                  <h1 style={{marginLeft: '12px'}}>
                    {
                      this.props.context.value === null
                        ? (
                          this.state.connectionError
                            ? <Icon icon='ion-minus-round' />
                            : loadingLang
                        ) : prettyFormatPrices(this.props.context.value)
                    }&nbsp;
                    {
                      this.props.context.value === null
                        ? null
                        : <span style={{fontSize: '16px'}}>ZEN</span>
                    }
                  </h1>
                </ons-col>
                <ons-col>
                  <ons-row>
                    <ons-col>
                      <h5 style={{marginLeft: '12px'}}>
                        BTC<br/>
                        {
                          this.props.context.BTCValue === null && this.props.context.value === null
                            ? (
                              this.state.connectionError
                                ? <Icon icon='ion-minus-round' />
                                : loadingLang
                            ) : prettyFormatPrices(this.props.context.value * this.props.context.BTCValue)
                        }
                      </h5>
                    </ons-col>
                    <ons-col>
                      <h5 style={{marginLeft: '12px'}}>
                        { this.props.settings.currency }<br/>
                        {
                          this.props.context.currencyValue === null && this.props.context.value === null
                            ? (
                              this.state.connectionError
                                ? <Icon icon='ion-minus-round' />
                                : loadingLang
                            ) : prettyFormatPrices(this.props.context.value * this.props.context.currencyValue, 2)
                        }
                      </h5>
                    </ons-col>
                  </ons-row>
                </ons-col>
              </ons-row>

              <hr/>

              <List>
                {
                  this.state.selectedAddressScannedTxs === false
                    ? (
                      <ListHeader>
                        <div style={{textAlign: 'center'}}>
                          {
                            this.state.connectionError
                              ? (
                                <div>
                                  <Icon icon='ion-alert-circled' />&nbsp;{noConnectionLang}
                                </div>
                              ) : (<Icon icon='spinner' spin/>)
                          }
                        </div>
                      </ListHeader>
                    )
                    : this.state.selectedAddressNoTxs
                      ? (
                        <ListHeader>
                          { noTxFoundLang }
                        </ListHeader>
                      )
                      : this.state.selectedAddressTxs.map(function (tx) {
                        const selectedAddress = this.props.context.address
                        const vins = tx.vin || []
                        const vouts = tx.vout || []
                        var txTime = moment.unix(tx.time).local().format('lll')
                        var txValue = 0.0

                        // Double tap tx to get more info on it
                        const txPage = getTxDetailPage(this.props.navigator, tx, CUR_LANG)
                        const handleTxClick = () => this.gotoComponent(txPage)

                        vins.forEach(function (vin) {
                          if (vin.addr === selectedAddress) {
                            txValue = txValue - parseFloat(vin.value)
                          }
                        })

                        vouts.forEach(function (vout) {
                          if (vout.scriptPubKey.addresses[0] === selectedAddress) {
                            txValue = txValue + parseFloat(vout.value)
                          }
                        })

                        // Don't display useless data
                        if (parseFloat(txValue.toFixed(8)) === 0.0) {
                          return null
                        }

                        return (
                          <ListItem
                            onClick={handleTxClick}
                            tappable>
                            <ons-row>
                              <ons-col width={'25px'}>
                                {
                                  txValue > 0
                                    ? <Icon style={{color: '#2ecc71'}} icon='ion-arrow-right-c'/>
                                    : <Icon style={{color: '#e74c3c'}} icon='ion-arrow-left-c'/>
                                }
                              </ons-col>

                              <ons-col>
                                { txValue > 0 ? receivedLang : sentLang } <br/>
                                <span style={{color: '#7f8c8d'}}>{ txTime }</span>
                              </ons-col>
                              <ons-col style={{textAlign: 'right', paddingRight: '12px'}}>
                                { parseFloat(Math.abs(txValue)).toFixed(8) }&nbsp;ZEN
                              </ons-col>
                            </ons-row>
                          </ListItem>
                        )
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
                    this.props.secrets.items.map(function (e) {
                      return (
                        <ListItem
                          style={{fontSize: '14px'}}
                          onClick={function () {
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
          </SplitterContent>
        </Splitter>
      </Page>
    )
  }
}

MainPage.propTypes = {
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setAddress: PropTypes.func.isRequired,
  setAddressValue: PropTypes.func.isRequired,
  setPrivateKey: PropTypes.func.isRequired,
  setZenInBtcValue: PropTypes.func.isRequired,
  setZenInCurrencyValue: PropTypes.func.isRequired
}

function mapStateToProps (state) {
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
