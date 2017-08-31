import React from 'react';

import {
  Page,  
  Toolbar,  
  BackButton,
  List,
  ListHeader,
  ListItem
} from 'react-onsenui';

class SettingsPage extends React.Component {
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
          <ListItem tappable>
            about
          </ListItem>
          <ListItem tappable>
            secret phrase
          </ListItem>
          <ListHeader></ListHeader>
          <ListItem tappable>
            change pin
          </ListItem>
          <ListItem tappable>
            import private key
          </ListItem>
          <ListItem tappable style={{color: 'red'}}>
            start/recover another wallet
          </ListItem>
        </List>
      </Page>
    );
  }
}

export default SettingsPage;