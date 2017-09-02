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


class RecoverWalletPage extends React.Component {
  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          About
        </div>
      </Toolbar>
    );
  }

  render() {    
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{padding: '12px 12px 0 12px', textAlign: 'center'}}>
          <p>ZENCash Wallet v{VERSION}</p>
          <br/>
          <p>Author: Kendrick Tan</p>
          <p>Made for zensystem.io</p>
          <p>Found a bug? File it here <a href="https://github.com/zencashofficial/zencash-mobile/issues">here</a></p>
        </div>
      </Page>
    );
  }
}

export default RecoverWalletPage;