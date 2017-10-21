import PropTypes from 'prop-types'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  Toolbar,
  BackButton
} from 'react-onsenui'

import { setWalletPin } from '../actions/Settings'

import NewPinPage from './NewPinPage'
import VerifyPinPage from './VerifyPinPage'

import TRANSLATIONS from '../translations'

class ChangePinPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pinVerified: false
    }

    this.renderToolbar = this.renderToolbar.bind(this)
  }

  renderToolbar () {
    const CUR_LANG = this.props.settings.language
    const changePinLang = TRANSLATIONS[CUR_LANG].PinPage.changePinTitle

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          { changePinLang }
        </div>
      </Toolbar>
    )
  }

  render () {
    return (
      this.state.pinVerified
        ? (
          <NewPinPage onComplete={() => this.props.navigator.popPage()} renderToolbar={this.renderToolbar} />
        )
        : (
          <VerifyPinPage onComplete={() => this.setState({ pinVerified: true })} renderToolbar={this.renderToolbar} />
        )
    )
  }
}

ChangePinPage.propTypes = {
  setWalletPin: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setWalletPin
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChangePinPage)
