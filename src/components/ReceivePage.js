import React from 'react';

import {
  Page,  
  Toolbar,  
  BackButton
} from 'react-onsenui';

class ReceivePage extends React.Component {
  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          Receive ZENCash
        </div>  
      </Toolbar>
    );
  }

  render() {    
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <p>
          Receive page
        </p>
      </Page>
    );
  }
}

export default ReceivePage;