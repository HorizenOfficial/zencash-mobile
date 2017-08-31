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
import SecretPhrasePage from './SecretPhrasePage'
import RecoverWalletPage from './RecoverWalletPage'
import ShowPrivateKeyPage from './ShowPrivateKeyPage'

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
            about
          </ListItem>
          <ListItem
            onClick={this.gotoComponent.bind(this, SecretPhrasePage)}
            tappable>
            secret phrase
          </ListItem>
          <ListHeader></ListHeader>                    
          <ListItem
            onClick={this.gotoComponent.bind(this, ShowPrivateKeyPage)}
            tappable>
            show private keys
          </ListItem>
          <ListItem
            onClick={this.gotoComponent.bind(this, RecoverWalletPage)}
            tappable style={{color: 'red'}}>
            start/recover another wallet
          </ListItem>
        </List>
      </Page>
    );
  }
}

export default SettingsPage;