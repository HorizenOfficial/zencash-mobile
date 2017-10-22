import 'babel-polyfill'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'

import {
  Page,
  Toolbar
} from 'react-onsenui'

import TRANSLATIONS from '../translations'

import ZENCASH_IMG from '../../assets/img/zencash.png'

class VerifyPinPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      invalidPin: false,
      pin: ''
    }

    this.handlePinVerify = this.handlePinVerify.bind(this)
    this.renderToolbar = this.renderToolbar.bind(this)
  }

  handlePinVerify (v) {
    // Once pin is of length 4
    // resets and asks for another input
    if (v.length >= 4) {
      if (v === this.props.settings.pin) {
        this.props.onComplete()
      } else {
        this.setState({
          invalidPin: true,
          pin: ''
        })
      }
    } else {
      this.setState({
        pin: v
      })
    }
  }

  renderToolbar () {
    return (
      <Toolbar>
        <div className='center'>
          { TRANSLATIONS[this.props.settings.language].PinPage.verifyPinPageTitle }
        </div>
      </Toolbar>
    )
  }

  render () {
    const CUR_LANG = this.props.settings.language
    const pinTextBoxStyle = {
      WebkitTextSecurity: 'disc',
      textAlign: 'center',
      padding: '15px',
      fontSize: '17px',
      shadowBlur: '5px',
      border: '2px solid #34495e'
    }
    const enterYourPinLang = TRANSLATIONS[CUR_LANG].PinPage.enterYourPin
    const invalidPinLang = TRANSLATIONS[CUR_LANG].PinPage.invalidPin

    return (
      <Page renderToolbar={this.props.renderToolbar || this.renderToolbar}>
        <div style={{padding: '25px 12px 0 12px', textAlign: 'center'}}>
          <img src={ZENCASH_IMG} width='100'/>
          <h2>{ enterYourPinLang }</h2>
          { this.state.invalidPin ? <h4 style={{color: '#e74c3c'}}>{ invalidPinLang }</h4> : null }
          <hr width='50%'/>
          { device.platform === 'iOS'
            ? <input
              style={pinTextBoxStyle}
              type='text' pattern='[0-9]*' onChange={(e) => this.handlePinVerify(e.target.value)} value={this.state.pin}/>
            : <input
              style={pinTextBoxStyle}
              type='number' onChange={(e) => this.handlePinVerify(e.target.value)} value={this.state.pin}/>
          }
        </div>
      </Page>
    )
  }
}

VerifyPinPage.propTypes = {
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  renderToolbar: PropTypes.func
}

function mapStateToProps (state) {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(VerifyPinPage)
