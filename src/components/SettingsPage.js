import React from 'react';

import {
  Page,  
  Toolbar,  
  BackButton
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
        <p>
          Settings page
        </p>
      </Page>
    );
  }
}

export default SettingsPage;