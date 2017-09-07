import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Page,  
  Toolbar, 
  ToolbarButton, 
  BackButton,
  Button,
  Input,
  Icon
} from 'react-onsenui';

import TRANSLATIONS from '../translations'

import { setHasInputPin } from '../actions/Context'
import { setWalletPin } from '../actions/Settings'

class PinPage extends React.Component {
  render() {    
    return (
      <div>
        Please create a pin / enter existing pin
      </div>
    );
  }
}

function mapStateToProps(state){  
  return {    
    settings: state.settings,
    context: state.context,
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setHasInputPin,
      setWalletPin
    },
    dispatch
  )
}

export default connect(mapStateToProps)(PinPage);