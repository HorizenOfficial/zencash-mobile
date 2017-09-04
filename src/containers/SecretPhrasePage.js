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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TRANSLATIONS from '../translations'

class SecretPhrasePage extends React.Component {
  gotoComponent(c) {    
    this.props.navigator.pushPage({component: c});
    this.setState({
      sliderOpen: false
    })
  }

  renderToolbar() {
    const CUR_LANG = this.props.settings.language

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          { TRANSLATIONS[CUR_LANG].SecretPhrasePage.title }
        </div>        
      </Toolbar>
    );
  }

  render() {    
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{padding: '12px 12px 0 12px', textAlign: 'center'}}>          
          <textarea            
            className="textarea" rows="3"
            maxLength={64}
            value={ this.props.secrets.secretPhrase }
            >            
          </textarea>
        </div>
      </Page>
    );
  }
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(SecretPhrasePage)