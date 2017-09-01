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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ScannerPage from '../components/ScannerPage'


class SendPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      confirmSend: false   
    }
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
        <div className='right'>
          <ToolbarButton onClick={() => this.props.navigator.popPage()}>
            <Icon icon='ion-camera'/>
          </ToolbarButton>
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
            { this.props.context.address }
          </p>
          <p>
            To: <br/>
            <Input placeholder="Receiver address" style={{width: '100%'}} />
          </p>
          <p>
            Amount (Max: {this.props.context.value}): <br/>
            <Input placeholder="42.42" style={{width: '100%'}} />
          </p>
          <p>
            Fees: <br/>
            <Input style={{width: '100%'}} value='0'/>
          </p>

          <p>
            <label className="left">
              <Input 
                onChange={(e) => {                  
                  this.setState({
                    confirmSend: !this.state.confirmSend                    
                  })
                }}
                inputId='understoodCheckbox' type="checkbox"
              />
            </label>
            <label htmlFor='understoodCheckbox' className="center">
              &nbsp;I want to send these ZEN
            </label>
          </p>

          <p>
            <Button
              disabled={!this.state.confirmSend}
              style={{width: '100%'}}>Send</Button>
          </p>
        </div>
      </Page>
    );
  }
}


function mapStateToProps(state){  
  return {
    context: state.context  
  }
}

export default connect(mapStateToProps)(SendPage);