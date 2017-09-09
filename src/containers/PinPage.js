import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

class PinPage extends React.Component {
  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>
          ZEN Wallet Setup
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
              style={{width: '100%'}}
              onChange={(e) => this.setState({ tempSecretPhrase: e.target.value })}
              className="textarea" rows="3" placeholder="secret phrase"
              maxLength={64}
              >
            </textarea>
          </p>

          <Button
            onClick={() => this.handleLoadWallet(this.state.tempSecretPhrase)}
            disabled={this.state.tempSecretPhrase.length < 16}
            style={{width: '100%'}}
            >Recover Wallet
          </Button>

          <Button
            onClick={() => this.handleNewWallet()}
            style={{width: '100%', marginTop: '100%'}}
            >New Wallet
          </Button>  
        </div>  
      </Page>
    );
  }
}

function mapStateToProps(state){  
  return {    
    settings: state.settings,
    context: state.context,
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {      
      setWalletPin
    },
    dispatch
  )
}

export default connect(mapStateToProps)(PinPage);