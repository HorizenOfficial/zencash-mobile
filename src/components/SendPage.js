import React from 'react';

import {
  Page,  
  Toolbar,  
  BackButton,
  Button,
  Input
} from 'react-onsenui';


import ScannerPage from './ScannerPage'


class SendPage extends React.Component {
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
          Send ZENCash
        </div>  
      </Toolbar>
    );
  }

  render() {    
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{padding: '0 12px 0 12px'}}>
          <p>
            From: <br/>
            <Input placeholder="Your address" style={{width: '100%'}} />
          </p>
          <p>
            To: <br/>
            <Input placeholder="Receiver address" style={{width: '100%'}} />
          </p>
          <p>
            Amount (ZEN): <br/>
            <Input placeholder="42.42" style={{width: '100%'}} />
          </p>
          <p>
            Fees: <br/>
            <Input style={{width: '100%'}} value='0'/>
          </p>          
          <p>
            <Button style={{width: '100%'}}>Send</Button>
          </p>
        </div>
      </Page>
    );
  }
}

export default SendPage;