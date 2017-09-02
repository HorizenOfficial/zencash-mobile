import React from 'react';

import {
  Page,  
  Toolbar, 
  ToolbarButton, 
  BackButton,
  Button,
  Input,
  Icon
} from 'react-onsenui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SendPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      confirmSend: false,
      qrScanning: false,
      addressReceive: '',
    }

    this.handleQRScan = this.handleQRScan.bind(this)
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
                To: <br/>
                <Input
                  onChange={(e) => this.setState({ addressReceive: e.target.value })}
                  value={this.state.addressReceive}
                  placeholder="Receiver address"
                  style={{width: '100%'}}
                />
              </p>
              <p>
                Amount (Max: {this.props.context.value}): <br/>
                <Input placeholder="42.42" style={{width: '100%'}} />
              </p>
              <p>
                Fees: <br/>
                <Input style={{width: '100%'}} value='0'/>
              </p>

              <p>
                <label className="left">
                  <Input 
                    onChange={(e) => {                  
                      this.setState({
                        confirmSend: !this.state.confirmSend                    
                      })
                    }}
                    inputId='understoodCheckbox' type="checkbox"
                  />
                </label>
                <label htmlFor='understoodCheckbox' className="center">
                  &nbsp;I want to send these ZEN
                </label>
              </p>

              <p>
                <Button
                  disabled={!this.state.confirmSend}
                  style={{width: '100%'}}>Send</Button>
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
    context: state.context  
  }
}

export default connect(mapStateToProps)(SendPage);