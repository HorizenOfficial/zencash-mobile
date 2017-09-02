import React from 'react';

import {
  Page,  
  Toolbar,  
  BackButton,
  Button,
  List,
  ListHeader,
  ListItem,
  Input
} from 'react-onsenui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setSecretPhrase, setSecretItems } from '../actions/Secrets'
import { phraseToSecretItems } from '../utils/wallet'

class SettingsPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      tempSecretPhrase: ''
    }
  }

  handleLoadWallet(phrase) {

  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>
          ZENCash Wallet Setup
        </div>  
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{padding: '12px 12px 0 12px'}}>                            
          <p>
            <textarea
              onChange={(e) => this.setState({ tempSecretPhrase: e.target.value })}
              className="textarea" rows="3" placeholder="secret phrase"
              maxLength={64}
              >
            </textarea>
          </p>

          <Button
            disabled={this.state.tempSecretPhrase.length < 16}
            style={{width: '100%'}}
            >Recover Wallet
          </Button>

          <Button
            style={{width: '100%', marginTop: '100%'}}
            >New Wallet
          </Button>  
        </div>  
      </Page>
    );
  }
}

export default SettingsPage;