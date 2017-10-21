import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import {
  Page,
  Toolbar,
  BackButton,
  Button,
  Toast
} from 'react-onsenui'

import QRCode from 'qrcode.react'

import TRANSLATIONS from '../translations'

class AddressInfoPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      toastShown: false
    }
  }

  renderToolbar () {
    const CUR_LANG = this.props.settings.language
    const addressLang = TRANSLATIONS[CUR_LANG].General.address

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          { addressLang }
        </div>
      </Toolbar>
    )
  }

  render () {
    const CUR_LANG = this.props.settings.language
    const copyToClipboardLang = TRANSLATIONS[CUR_LANG].AddressInfoPage.copyToClipboard

    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{padding: '12px 12px 0 12px', textAlign: 'center'}}>
          <p>
            <QRCode value={ this.props.context.address }/>
          </p>

          <p>
            { this.props.context.address }
          </p>

          <Button
            onClick={() => {
              cordova.plugins.clipboard.copy(this.props.context.address)
              this.setState({toastShown: true})
            }}
            style={{fontSize: '12px', marginBottom: '10px', width: '90%'}}>
            { copyToClipboardLang }
          </Button>
        </div>

        <Toast isOpen={this.state.toastShown}>
          <div className="message">
            Address Copied!
          </div>
          <button onClick={() => this.setState({toastShown: false})}>
            Dismiss
          </button>
        </Toast>
      </Page>
    )
  }
}

AddressInfoPage.propTypes = {
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(AddressInfoPage)
