import PropTypes from 'prop-types'
import React from 'react'

import {
  Page,
  Toolbar,
  ToolbarButton,
  BackButton,
  Button,
  Input,
  Icon,
  ProgressBar,
  Checkbox,
  Range
} from 'react-onsenui'

import zencashjs from 'zencashjs'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setQrScanning } from '../actions/Context'

import { urlAppend, prettyFormatPrices } from '../utils/index'
import TRANSLATIONS from '../translations'

class SendPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      confirmSend: false,
      addressReceive: '',
      sendValue: 1,
      sendFee: 500,
      progressValue: 0,
      sendTxid: '',
      sendCurrencyValue: props.context.currencyValue
    }

    this.handleQRScan = this.handleQRScan.bind(this)
    this.handleSendZEN = this.handleSendZEN.bind(this)
    this.handleSendValueChange = this.handleSendValueChange.bind(this)
    this.handleSendCurrencyValueChange = this.handleSendCurrencyValueChange.bind(this)
    this.setProgressValue = this.setProgressValue.bind(this)
    this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
  }

  // Handles conversion between
  // zen and fiat and sets sendValue
  handleSendValueChange (e) {
    const str = e.target.value
    const sendVal = parseFloat(str)

    if (!isNaN(sendVal) && str[str.length - 1] !== '.') {
      // Jesus fuck Javascript
      this.setState({
        sendValue: str,
        sendCurrencyValue: prettyFormatPrices((this.props.context.currencyValue * sendVal), 6)
      })
    } else {
      this.setState({
        sendValue: str
      })
    }
  }

  handleSendCurrencyValueChange (e) {
    const str = e.target.value
    const sendCurrencyVal = parseFloat(str)

    if (!isNaN(sendCurrencyVal) && str[str.length - 1] !== '.') {
      this.setState({
        sendValue: prettyFormatPrices((sendCurrencyVal / this.props.context.currencyValue), 6),
        sendCurrencyValue: str
      })
    } else {
      this.setState({
        sendCurrencyValue: e.target.value
      })
    }
  }

  setProgressValue (v) {
    this.setState({
      progressValue: v
    })
  }

  safeReleaseCamera () {
    // Destroy QR scanner if user goes back
    // while scanning
    if (this.props.context.qrScanning) {
      QRScanner.destroy()
      this.props.setQrScanning(false)
    }
  }

  componentWillUnmount () {
    this.safeReleaseCamera()
  }

  handleQRScan () {
    // Prepare QR Scanner
    QRScanner.prepare(function (err, status) {
      // Oh no!
      if (err) {
        alert(JSON.stringify(err))
      }

      // If we are authorized to scan, then only do we invoke
      // the scan method
      if (status.authorized) {
        // Start scanning
        QRScanner.scan(function (err, address) {
          // an error occurred, or the scan was canceled (error code `6`)
          if (err) {
            alert(JSON.stringify(err))
          }

          // The scan completed, display the contents of the QR code:
          else {
            this.setState({
              addressReceive: address
            })
          }

          // Set finished scanning
          this.props.setQrScanning(false)
        }.bind(this))

        // Show scanning preview
        QRScanner.show()

        // Set transparency
        this.props.setQrScanning(true)
      } else if (status.denied) {
        const CUR_LANG = this.props.settings.language
        alert(TRANSLATIONS[CUR_LANG].SendPage.noCameraPermissions)
        QRScanner.openSettings()
      } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
      }
    }.bind(this))
  }

  handleSendZEN () {
    // Language stuff
    const CUR_LANG = this.props.settings.language

    const value = this.state.sendValue
    const fee = this.state.sendFee
    const recipientAddress = this.state.addressReceive
    const senderAddress = this.props.context.address

    // Convert how much we wanna send
    // to satoshis
    const satoshisToSend = Math.round(value * 100000000)
    const satoshisfeesToSend = Math.round(fee) // fees already in satoshis

    // Reset zen send progress
    this.setProgressValue(1)

    // Reset zen send progress
    // Alert messages too
    var errString = ''

    if (recipientAddress.length != 35) {
      errString += TRANSLATIONS[CUR_LANG].SendPage.invalidAddress
      errString += '\n\n'
    }

    if (typeof parseInt(value) !== 'number' || value === '') {
      errString += TRANSLATIONS[CUR_LANG].SendPage.invalidAmount
      errString += '\n\n'
    }

    // Can't send 0 satoshis
    if (satoshisToSend <= 0) {
      errString += TRANSLATIONS[CUR_LANG].SendPage.zeroAmount
      errString += '\n\n'
    }

    if (typeof parseInt(fee) !== 'number' || fee === '') {
      errString += TRANSLATIONS[CUR_LANG].SendPage.invalidFee
      errString += '\n\n'
    }

    // Alert errors
    if (errString !== '') {
      alert(errString)
      this.setProgressValue(0)
      return
    }

    // Private key
    const senderPrivateKey = zencashjs.address.WIFToPrivKey(this.props.context.privateKey)

    // Get previous transactions
    const prevTxURL = urlAppend(this.props.settings.insightAPI, 'addr/') + senderAddress + '/utxo'
    const infoURL = urlAppend(this.props.settings.insightAPI, 'status?q=getInfo')
    const sendRawTxURL = urlAppend(this.props.settings.insightAPI, 'tx/send')

    // Building our transaction TXOBJ
    // How many satoshis do we have so far
    var satoshisSoFar = 0
    var history = []
    var recipients = [{address: recipientAddress, satoshis: satoshisToSend}]

    // Get previous unspent transactions
    cordovaHTTP.get(prevTxURL, {}, {}, function (tx_resp) {
      this.setProgressValue(25)

      const tx_data = JSON.parse(tx_resp.data)

      // Get blockheight and hash
      cordovaHTTP.get(infoURL, {}, {}, function (info_resp) {
        this.setProgressValue(50)
        const info_data = JSON.parse(info_resp.data)

        const blockHeight = info_data.info.blocks - 300
        const blockHashURL = urlAppend(this.props.settings.insightAPI, 'block-index/') + blockHeight

        // Get block hash
        cordovaHTTP.get(blockHashURL, {}, {}, function (response_bhash) {
          this.setProgressValue(75)

          const blockHash = JSON.parse(response_bhash.data).blockHash

          // Iterate through each utxo
          // append it to history
          for (var i = 0; i < tx_data.length; i++) {
            if (tx_data[i].confirmations === 0) {
              continue
            }

            history = history.concat({
              txid: tx_data[i].txid,
              vout: tx_data[i].vout,
              scriptPubKey: tx_data[i].scriptPubKey
            })

            // How many satoshis do we have so far
            satoshisSoFar = satoshisSoFar + tx_data[i].satoshis
            if (satoshisSoFar >= satoshisToSend + satoshisfeesToSend) {
              break
            }
          }

          // If we don't have enough address
          // fail and tell user
          if (satoshisSoFar < satoshisToSend + satoshisfeesToSend) {
            alert(TRANSLATIONS[CUR_LANG].SendPage.notEnoughZEN)
            this.setProgressValue(0)
            return
          }

          // If we don't have exact amount
          // Refund remaining to current address
          if (satoshisSoFar !== satoshisToSend + satoshisfeesToSend) {
            var refundSatoshis = satoshisSoFar - satoshisToSend - satoshisfeesToSend
            recipients = recipients.concat({address: senderAddress, satoshis: refundSatoshis})
          }

          // Create transaction
          var txObj = zencashjs.transaction.createRawTx(history, recipients, blockHeight, blockHash)

          // Sign each history transcation          
          for (var i = 0; i < history.length; i++) {
            txObj = zencashjs.transaction.signTx(txObj, i, senderPrivateKey, true)
          }

          // Convert it to hex string
          const txHexString = zencashjs.transaction.serializeTx(txObj)

          // Post it to the api
          cordovaHTTP.post(sendRawTxURL, {rawtx: txHexString}, {}, function (sendtx_resp) {
            const tx_resp_data = JSON.parse(sendtx_resp.data)

            this.setState({
              progressValue: 100,
              sendTxid: tx_resp_data.txid
            })
          }.bind(this), (err) => { alert('ERROR: ' + JSON.stringify(err)); this.setProgressValue(0) })
        }.bind(this), (err) => { alert('ERROR: ' + JSON.stringify(err)); this.setProgressValue(0) })
      }.bind(this), (err) => { alert('ERROR: ' + JSON.stringify(err)); this.setProgressValue(0) })
    }.bind(this), (err) => { alert('ERROR: ' + JSON.stringify(err)); this.setProgressValue(0) })
  }

  renderToolbar () {
    // Language stuff
    const CUR_LANG = this.props.settings.language

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={
            () => {
              this.safeReleaseCamera()
              this.props.navigator.popPage()
            }}>Back</BackButton>
        </div>
        <div className='center'>
          { TRANSLATIONS[CUR_LANG].SendPage.title }
        </div>
        <div className='right'>
          <ToolbarButton onClick={() => {
            try {
              this.handleQRScan()
            } catch (err) {
              alert(JSON.stringify(err))
            }
          }}>
            <Icon icon='ion-camera'/>
          </ToolbarButton>
        </div>
      </Toolbar>
    )
  }

  render () {
    // For qr scanning
    const pageOpacity = this.props.context.qrScanning ? '0.4' : '1.0'
    const pageStyle = this.props.context.qrScanning ? {opacity: pageOpacity, visibility: 'visible', transition: 'all 0.1s ease-out', WebkitTransform: 'translateZ(0)'} : {}

    // Translation stuff    
    const CUR_LANG = this.props.settings.language

    const addressLang = TRANSLATIONS[CUR_LANG].General.address
    const cancelLang = TRANSLATIONS[CUR_LANG].General.cancel
    const feesLang = TRANSLATIONS[CUR_LANG].General.fees

    const payToLang = TRANSLATIONS[CUR_LANG].SendPage.payTo
    const amountToPayLang = TRANSLATIONS[CUR_LANG].SendPage.amountToPay
    const balanceLang = TRANSLATIONS[CUR_LANG].SendPage.balance
    const networkFeeLang = TRANSLATIONS[CUR_LANG].SendPage.networkFee
    const slowTxLang = TRANSLATIONS[CUR_LANG].SendPage.slowTx
    const fastTxLang = TRANSLATIONS[CUR_LANG].SendPage.fastTx
    const amountLang = TRANSLATIONS[CUR_LANG].SendPage.amount
    const maxLang = TRANSLATIONS[CUR_LANG].SendPage.max
    const sendLang = TRANSLATIONS[CUR_LANG].SendPage.send
    const txSuccessfulLang = TRANSLATIONS[CUR_LANG].SendPage.txSuccessful
    const confirmSendLang = TRANSLATIONS[CUR_LANG].SendPage.confirmSend

    return (
      <Page
        style={pageStyle}
        renderToolbar={this.renderToolbar.bind(this)} >
        {
          // Show qr capture area
          this.props.context.qrScanning
            ? (
              <div style={{height: '100%', opacity: '0.4'}}>
                <ons-row style={{height: '30%'}}>
                  <ons-col></ons-col>
                </ons-row>
                <ons-row style={{height: '40%'}}>
                  <ons-col width="25%"></ons-col>
                  <ons-col
                    style={{border: '5px solid red'}}>
                  </ons-col>
                  <ons-col width="25%"></ons-col>
                </ons-row>
                <ons-row style={{height: '30%'}}>
                </ons-row>
              </div>
            )
            : (
              <div style={{padding: '12px 12px 0 12px'}}>
                <div>
                  <h3>{ payToLang }</h3>
                  <Input
                    onChange={(e) => this.setState({ addressReceive: e.target.value })}
                    value={this.state.addressReceive}
                    placeholder={addressLang}
                    style={{width: '100%'}}
                    float={true}
                  />
                </div>

                <br/>

                <h3>{amountToPayLang}&nbsp;&nbsp;
                  <Button
                    modifier='quiet'
                    onClick={
                      () => this.handleSendValueChange({target: {value: (this.props.context.value - (this.state.sendFee / 100000000)).toPrecision(8)}})}
                  >
                    {maxLang}
                  </Button>
                </h3>
                <ons-row width={'45%'} style={{textAlign: 'center'}}>
                  <ons-col>
                    <span style={{fontSize: '12px', color: '#7f8c8d'}}>
                      {balanceLang}:&nbsp;
                      {prettyFormatPrices(this.props.context.value)}&nbsp;
                    ZEN
                    </span>
                    <Input
                      onChange={this.handleSendValueChange}
                      value={this.state.sendValue}
                      placeholder={amountLang}
                      style={{width: '100%'}}
                    /><br/>
                  ZEN
                  </ons-col>
                  <ons-col width={'10%'}>
                    <br/>
                    <Icon icon='ion-arrow-swap'/>
                    <br/>
                  </ons-col>
                  <ons-col width={'45%'}>
                    <span style={{fontSize: '12px', color: '#7f8c8d'}}>
                      {balanceLang}:&nbsp;
                      {prettyFormatPrices(this.props.context.value * this.props.context.currencyValue)}&nbsp;
                      {this.props.settings.currency}
                    </span>
                    <Input
                      onChange={this.handleSendCurrencyValueChange}
                      value={this.state.sendCurrencyValue}
                      placeholder={amountLang}
                      style={{width: '100%'}}
                    /><br/>
                    {this.props.settings.currency}
                  </ons-col>
                </ons-row>

                <br/>

                <h3>{networkFeeLang}</h3>
                <ons-row style={{textAlign: 'center'}}>
                  <ons-col width={'25%'}>
                    {slowTxLang}
                  </ons-col>

                  <ons-col width={'50%'}>
                    <Range
                      style={{width: '100%'}}
                      onChange={(e) => this.setState({ sendFee: e.target.value })}
                      value={this.state.sendFee}
                      min={0}
                      max={10000}
                    />
                    <br/>
                    {feesLang}: {parseFloat(this.state.sendFee / 100000000).toString()} ZEN
                  </ons-col>

                  <ons-col width={'25%'}>
                    {fastTxLang}
                  </ons-col>
                </ons-row>

                <br/>

                <div>
                  <label className="left">
                    <Checkbox
                      onChange={(e) => {
                        this.setState({
                          confirmSend: !this.state.confirmSend
                        })
                      }}
                      checked={this.state.confirmSend}
                      inputId='understoodCheckbox' type="checkbox"
                    />
                  </label>
                  <label htmlFor='understoodCheckbox' className="center">
                  &nbsp;{confirmSendLang}
                  </label>
                </div>

                <br/>

                <ons-row style={{textAlign: 'center'}}>
                  <ons-col width={'47.5%'}>
                    <Button
                      onClick={() => this.props.navigator.popPage()}
                      style={{width: '100%', height: '50px', paddingTop: '7px'}}>{cancelLang}</Button>
                  </ons-col>
                  <ons-col width={'5%'}></ons-col>
                  <ons-col width={'47.5%'}>
                    <Button
                      onClick={() => this.handleSendZEN()}
                      disabled={!this.state.confirmSend || (this.state.progressValue > 0)}
                      style={{width: '100%', height: '50px', paddingTop: '7px'}}>{sendLang}</Button>
                  </ons-col>
                </ons-row>

                <p>
                  <ProgressBar
                    style={{width: ' 100%', height: '20px'}}
                    value={this.state.progressValue}
                  />
                </p>

                <p>
                  {
                    this.state.progressValue === 100
                      ? (
                        <div style={{textAlign: 'center'}}>
                          <a
                            href='#'
                            onClick={() => window.open(urlAppend(this.props.settings.explorerURL, 'tx/') + this.state.sendTxid, '_system')}
                          >{txSuccessfulLang}</a>
                        </div>
                      )
                      : null
                  }
                </p>
              </div>
            )
        }
      </Page>
    )
  }
}

SendPage.propTypes = {
  setQrScanning: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setQrScanning
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SendPage)
