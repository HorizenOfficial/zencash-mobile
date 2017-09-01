import React from 'react';

import {
  Page,  
  Toolbar, 
  ToolbarButton, 
  BackButton,
  Button,
  Input,
  Icon,
  Dialog
} from 'react-onsenui';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { phraseToSecretItems } from '../utils/wallet'
import { setSecretItems, setSecretPhrase } from '../actions/Secrets'
import { setAddress, setPrivateKey, setAddressValue } from '../actions/Context'

class RecoverWalletPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      confirmRecover: false,
      dialogOpen: false,
      tempSecretPhrase: ''
    }

    this.newSecrets = this.newSecrets.bind(this)
  }

  newSecrets() {
    try{
      this.setState({
        tempSecretPhrase: '',        
        dialogOpen: true
      })

      const secretPhrase = this.state.tempSecretPhrase
      const secretItems = phraseToSecretItems(secretPhrase)

      this.props.setSecretItems(secretItems)
      this.props.setSecretPhrase(secretPhrase)

      this.props.setAddress(secretItems[0].address)
      this.props.setPrivateKey(secretItems[0].privateKey)            
    } catch (err) {
      alert(err)
    }
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          Recover Existing Wallet
        </div>        
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{padding: '12px 12px 0 12px'}}>
          <p>
            Secret Phrase:<br/><br/>
            <textarea
              value={this.state.tempSecretPhrase}
              onChange={(e) => this.setState({ tempSecretPhrase: e.target.value })}
              className="textarea" rows="3" placeholder="secret phrase. min 16 characters">
            </textarea>
          </p>

          <p>
            <label className="left">
              <Input                
                onChange={(e) => {                  
                  this.setState({
                    confirmRecover: !this.state.confirmRecover
                  })
                }}
                inputId='understoodCheckbox' type="checkbox"
              />
            </label>
            <label htmlFor='understoodCheckbox' className="center">
              &nbsp;I understand that by recovering the existing wallet, my current wallet will be <strong>wiped</strong>.
            </label>
          </p>
                    
          <Button
            onClick={() => this.newSecrets()}
            disabled={!this.state.confirmRecover || this.state.tempSecretPhrase.length < 16}
            style={{width: '100%', textAlign: 'center'}}
            >
            Recover
          </Button>          
        </div>

        <Dialog
          isOpen={this.state.dialogOpen}
          onCancel={() => {
            this.setState({ dialogOpen: false })
            this.props.navigator.popPage()
          }}
          cancelable>
          <p style={{textAlign: 'center'}}>Wallet recovered!</p>
          <p style={{textAlign: 'center'}}>
            <Button 
              style={{width: '90%'}}
              disabled={!this.state.dialogOpen}
              onClick={() => {
                this.setState({ dialogOpen: false })
                this.props.navigator.popPage()
              }}
            >Cool</Button>
          </p>
        </Dialog>
      </Page>
    );
  }
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setSecretItems,
      setSecretPhrase,
      setAddress,
      setAddressValue,
      setPrivateKey    
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(RecoverWalletPage);