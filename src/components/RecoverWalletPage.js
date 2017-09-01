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
  constructor(props){
    super(props)

    this.state = {
      confirmRecover: false,
      tempSecretPhrase: ''
    }
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          Recover Existing Wallet
        </div>        
      </Toolbar>
    );
  }

  render() {
    console.log(this.state.tempSecretPhrase.length)

    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{padding: '12px 12px 0 12px'}}>
          <p>
            Secret Phrase:<br/><br/>
            <textarea
              onChange={(e) => this.setState({ tempSecretPhrase: e.target.value })}
              className="textarea" rows="3" placeholder="secret phrase. min 16 characters">
            </textarea>
          </p>

          <p>
            <label className="left">
              <Input 
                onChange={(e) => {                  
                  this.setState({
                    confirmRecover: !this.state.confirmRecover
                  })
                }}
                inputId='understoodCheckbox' type="checkbox"
              />
            </label>
            <label htmlFor='understoodCheckbox' className="center">
              &nbsp;I understand that by recovering the existing wallet, my current wallet will be <strong>wiped</strong>.
            </label>
          </p>
                    
          <Button
            disabled={!this.state.confirmRecover || this.state.tempSecretPhrase.length < 16}
            style={{width: '100%', textAlign: 'center'}}
            >
            Recover
          </Button>          
        </div>
      </Page>
    );
  }
}

export default RecoverWalletPage;