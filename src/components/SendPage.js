import React from 'react';

import {
  Page,  
  Toolbar,  
  BackButton
} from 'react-onsenui';

class SendPage extends React.Component {
  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          Send ZENCash
        </div>  
      </Toolbar>
    );
  }

  render() {    
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <p>
          Send page
        </p>
      </Page>
    );
  }
}

export default SendPage;