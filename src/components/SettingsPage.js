import React from 'react';

import {
  Page,  
  Toolbar,  
  BackButton,
  List,
  ListHeader,
  ListItem
} from 'react-onsenui';

import AboutPage from './AboutPage'
import SecretPhrasePage from '../containers/SecretPhrasePage'
import RecoverWalletPage from '../containers/RecoverWalletPage'
import ShowPrivateKeyPage from '../containers/ShowPrivateKeyPage'

class SettingsPage extends React.Component {
  gotoComponent(c) {    
    this.props.navigator.pushPage({component: c});
    this.setState({
      sliderOpen: false
    })
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          Settings
        </div>  
      </Toolbar>
    );
  }

  render() {    
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <List>
          <ListItem 
            onClick={this.gotoComponent.bind(this, AboutPage)}
            tappable>
            About
          </ListItem>
          <ListItem
            onClick={this.gotoComponent.bind(this, SecretPhrasePage)}
            tappable>
            Secret Phrase
          </ListItem>
          <ListHeader></ListHeader>                    
          <ListItem
            onClick={this.gotoComponent.bind(this, ShowPrivateKeyPage)}
            tappable>
            Show Private Keys
          </ListItem>
          <ListItem
            onClick={this.gotoComponent.bind(this, RecoverWalletPage)}
            tappable style={{color: 'red'}}>
            Recover Existing Wallet
          </ListItem>
        </List>
      </Page>
    );
  }
}

export default SettingsPage;