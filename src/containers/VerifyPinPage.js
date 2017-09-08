import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PinInput from 'react-pin-input'

import {
  Page,  
  Toolbar, 
  ToolbarButton, 
  BackButton,
  Button,
  Input,
  Icon
} from 'react-onsenui';

import TRANSLATIONS from '../translations'

import { setWalletPin } from '../actions/Settings'

import ZENCASH_IMG from '../../assets/img/zencash.png'

class VerifyPinPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      invalidPin: false,
      pin: ''      
    }

    this.handlePinVerify = this.handlePinVerify.bind(this)
  }

  handlePinVerify(v){       
    this.setState({
      pin: v
    })

    // Once pin is of length 4
    // resets and asks for another input
    if (v.length === 4){
      if (v === this.props.settings.pin) {
        this.props.onComplete()
      }
      else{
        this.setState({
          invalidPin: true,
          pin: ''
        })
      }
    }    
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>
          ZEN Wallet PIN Verification
        </div>  
      </Toolbar>
    );
  }

  render() {    
    return (
      <Page renderToolbar={this.props.renderToolbar || this.renderToolbar.bind(this)}>
        <div style={{padding: '25px 12px 0 12px', textAlign: 'center'}}>
          <img src={ZENCASH_IMG} width='100'/>
          <h2>Enter your PIN</h2>
          { this.state.invalidPin ? <h4 style={{color: '#e74c3c'}}>Invalid PIN</h4> : '' }
          <hr width='50%'/>
          <input 
            style={{
              WebkitTextSecurity: 'disc',
              textAlign: 'center',
              padding: '15px',
              fontSize: '17px',
              shadowBlur: '5px',
              border: '2px solid #34495e'          
            }}
            type='number' onChange={(e) => this.handlePinVerify(e.target.value)} value={this.state.pin}/>
        </div>
      </Page>
    );
  }
}

function mapStateToProps(state){  
  return {    
    settings: state.settings    
  }
}

export default connect(mapStateToProps)(VerifyPinPage);