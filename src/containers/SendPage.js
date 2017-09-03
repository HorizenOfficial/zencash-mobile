import React from 'react';

import {
  Page,  
  Toolbar, 
  ToolbarButton, 
  BackButton,
  Button,
  Input,
  Icon,
  ProgressBar,
  Checkbox  
} from 'react-onsenui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { urlAppend } from '../utils/index'

import zencashjs from 'zencashjs'

class SendPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      confirmSend: false,
      qrScanning: false,
      addressReceive: '',
      sendValue: '',
      sendFee: '',
      progressValue: 0,
      sendTxid: ''
    }

    this.handleQRScan = this.handleQRScan.bind(this)
    this.handleSendZEN = this.handleSendZEN.bind(this)
    this.setProgressValue = this.setProgressValue.bind(this)
  }

  setProgressValue(v){
    this.setState({
      progressValue: v
    })
  }

  handleQRScan(){    
    // Prepare QR Scanner
    QRScanner.prepare(function(err, status){
      if (err) {
       // here we can handle errors and clean up any loose ends.
        alert(err);         
      }
      if (status.authorized) {
        this.setState({
          qrScanning: true
        })
      } else if (status.denied) {
        alert('No camera permissions. You can allow camera access in your settings.')
        QRScanner.openSettings()       
      } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
      }
    }.bind(this))

    // Start scanning
    QRScanner.scan(function(err, address){
      if(err){
        // an error occurred, or the scan was canceled (error code `6`)
        alert(err)
      } else {
        // The scan completed, display the contents of the QR code:
        this.setState({
          addressReceive: address
        })
      }
      this.setState({
        qrScanning: false
      })
    }.bind(this))
    
    // Show scanning preview
    QRScanner.show()
  }

  handleSendZEN(){
    const value = this.state.sendValue
    const fee = this.state.sendFee
    const recipientAddress = this.state.addressReceive
    const senderAddress = this.props.context.address
    
    // Convert how much we wanna send
    // to satoshis
    const satoshisToSend = Math.round(value * 100000000)
    const satoshisfeesToSend = Math.round(fee * 100000000)

    // Reset zen send progress
    this.setProgressValue(1)

    // Reset zen send progress
    // Alert messages too
    var errString = ''

    if (recipientAddress.length != 35){
      errString += 'Invalid `To Address` Only transparent addresses are supported at this point in time.\n\n'
    }

    if (typeof parseInt(value) !== 'number' || value === ''){
      errString += 'Invalid `Amount`.\n\n'
    }

    // Can't send 0 satoshis
    if (satoshisToSend <= 0){
      errString += 'Amount must be greater than 0.\n\n'
    }

    if (typeof parseInt(fee) !== 'number' || fee === ''){
      errString += 'Invalid fee.\n\n'
    }

    // Alert errors
    if (errString !== ''){    
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
    cordovaHTTP.get(prevTxURL, {}, {}, function(tx_resp){
      this.setProgressValue(25)

      const tx_data = JSON.parse(tx_resp.data)

      // Get blockheight and hash
      cordovaHTTP.get(infoURL, {}, {}, function(info_resp){
        this.setProgressValue(50)
        const info_data = JSON.parse(info_resp.data)

        const blockHeight = info_data.info.blocks - 300
        const blockHashURL = urlAppend(this.props.settings.insightAPI, 'block-index/') + blockHeight

        // Get block hash
        cordovaHTTP.get(blockHashURL, {}, {}, function(response_bhash){
          this.setProgressValue(75)

          const blockHash = JSON.parse(response_bhash.data).blockHash          

          // Iterate through each utxo
          // append it to history
          for (var i = 0; i < tx_data.length; i++){
            if (tx_data[i].confirmations === 0) { 
              continue;
            }

            history = history.concat({
              txid: tx_data[i].txid,
              vout: tx_data[i].vout,
              scriptPubKey: tx_data[i].scriptPubKey,            
            });

            // How many satoshis do we have so far
            satoshisSoFar = satoshisSoFar + tx_data[i].satoshis;
            if (satoshisSoFar >= satoshisToSend + satoshisfeesToSend){
              break;
            }
          }                  

          // If we don't have enough address
          // fail and tell user
          if (satoshisSoFar < satoshisToSend + satoshisfeesToSend){            
            alert('Not enough confirmed ZEN in account to perform transaction')
            this.setProgressValue(0)
            return
          }          

          // If we don't have exact amount
          // Refund remaining to current address
          if (satoshisSoFar !== satoshisToSend + satoshisfeesToSend){
            var refundSatoshis = satoshisSoFar - satoshisToSend - satoshisfeesToSend
            recipients = recipients.concat({address: senderAddress, satoshis: refundSatoshis})
          }

          // Create transaction
          var txObj = zencashjs.transaction.createRawTx(history, recipients, blockHeight, blockHash)
                    
          // Sign each history transcation          
          for (var i = 0; i < history.length; i ++){                                      
            txObj = zencashjs.transaction.signTx(txObj, i, senderPrivateKey, true)        
          }          

          // Convert it to hex string
          const txHexString = zencashjs.transaction.serializeTx(txObj)          

          // Post it to the api
          cordovaHTTP.post(sendRawTxURL, {rawtx: txHexString}, {}, function(sendtx_resp){
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

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          Send ZENCash
        </div>
        <div className='right'>
          <ToolbarButton onClick={() => this.handleQRScan()}>
            <Icon icon='ion-camera'/>
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  render() {
    const opacity = this.state.qrScanning ? '0.4' : '1.0'

    return (      
      <Page renderToolbar={this.renderToolbar.bind(this)} style={{opacity: opacity}}>
        {
          // Show qr capture area
          this.state.qrScanning ?
          (
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
          ) :
          (
            <div style={{padding: '0 12px 0 12px' }}>
              <p>
                From: <br/>
                { this.props.context.address }
              </p>
              <p>                
                <Input
                  onChange={(e) => this.setState({ addressReceive: e.target.value })}
                  value={this.state.addressReceive}
                  placeholder="To Address"
                  style={{width: '100%'}}
                />
              </p>
              <p>                
                <Input                  
                  placeholder={"Amount (Max: " + this.props.context.value + ")"}
                  onChange={(e) => this.setState({ sendValue: e.target.value })}
                  value={this.state.sendValue}                  
                  style={{width: '100%'}}
                />
              </p>
              <p>                
                <Input 
                  placeholder={'Fees'}
                  style={{width: '100%'}}
                  onChange={(e) => this.setState({ sendFee: e.target.value })}
                  value={this.state.sendFee}/>
              </p>

              <p>
                <label className="left">
                  <Input 
                    onChange={(e) => {                               
                      this.setState({
                        confirmSend: !this.state.confirmSend                    
                      })
                    }}
                    value={this.state.confirmSend}
                    inputId='understoodCheckbox' type="checkbox"
                  />
                </label>
                <label htmlFor='understoodCheckbox' className="center">
                  &nbsp;I want to send these ZEN
                </label>
              </p>

              <p>
                <Button
                  onClick={() => this.handleSendZEN()}
                  disabled={!this.state.confirmSend || (this.state.progressValue > 0 && this.state.progressValue < 100)}
                  style={{width: '100%'}}>Send</Button>
              </p>

              <p>
                <ProgressBar
                  style={{width: ' 100%', height: '20px'}}
                  value={this.state.progressValue}
                />
              </p>

              <p>
                {
                  this.state.progressValue === 100 ?
                  (
                    <div style={{textAlign: 'center'}}>
                      <a
                        href='#'
                        onClick={() => window.open(urlAppend(this.props.settings.explorerURL, 'tx/') + this.state.sendTxid, '_system')}
                      >Transcation successful! Click here to see your transaction</a>
                    </div>
                  ) :
                  null
                }
              </p>
            </div>
          )
        }
      </Page>
    );
  }
}


function mapStateToProps(state){  
  return {
    context: state.context,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(SendPage);