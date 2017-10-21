import PropTypes from 'prop-types'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  Page,
  Toolbar
} from 'react-onsenui'

import TRANSLATIONS from '../translations'

import { setWalletPin } from '../actions/Settings'

import ZENCASH_IMG from '../../assets/img/zencash.png'

class NewPinPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstEntry: true, // Is it users' first pin entry
      similarPin: true, // Are the two pins similar
      pin: '',
      tempPin: ''
    }

    this.handlePinSetup = this.handlePinSetup.bind(this)
  }

  handlePinSetup (v) {
    if (this.state.firstEntry) {
      this.setState({
        pin: v
      })

      // Once pin is of length 4
      // resets and asks for another input
      if (v.length === 4) {
        this.setState({
          firstEntry: false,
          similarPin: true,
          tempPin: v,
          pin: ''
        })
      }
    } else {
      this.setState({
        pin: v
      })

      if (v.length === 4) {
        if (v === this.state.tempPin) {
          this.props.setWalletPin(v)
          this.props.onComplete()
        } else {
          this.setState({
            firstEntry: true,
            tempPin: '',
            pin: '',
            similarPin: false
          })
        }
      }
    }
  }

  renderToolbar () {
    return (
      <Toolbar>
        <div className='center'>
          { TRANSLATIONS[this.props.settings.language].PinPage.newPinPageTitle }
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
    const setupNewPinLang = TRANSLATIONS[CUR_LANG].PinPage.setupNewPin
    const reenterPinLang = TRANSLATIONS[CUR_LANG].PinPage.reenterPin
    const pinsNotSimilarLang = TRANSLATIONS[CUR_LANG].PinPage.pinsNotSimilar

    return (
      <Page renderToolbar={this.props.renderToolbar || this.renderToolbar.bind(this)}>
        <div style={{padding: '25px 12px 0 12px', textAlign: 'center'}}>
          <img src={ZENCASH_IMG} width='100'/>
          <h2>{ this.state.firstEntry ? setupNewPinLang : reenterPinLang }</h2>
          { this.state.similarPin ? '' : <h4 style={{color: '#e74c3c'}}>{ pinsNotSimilarLang }</h4> }
          <hr width='50%'/>
          { device.platform === 'iOS'
            ? <input
              style={pinTextBoxStyle}
              type='text' pattern='[0-9]*' onChange={(e) => this.handlePinSetup(e.target.value)} value={this.state.pin}/>
            : <input
              style={pinTextBoxStyle}
              type='number' onChange={(e) => this.handlePinSetup(e.target.value)} value={this.state.pin}/>
          }
        </div>
      </Page>
    )
  }
}

NewPinPage.propTypes = {
  secrets: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setWalletPin: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context
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

export default connect(mapStateToProps, matchDispatchToProps)(NewPinPage)
