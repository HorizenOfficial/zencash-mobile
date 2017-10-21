import PropTypes from 'prop-types'
import React from 'react'

import {
  Page,
  Toolbar,
  BackButton,
  Button,
  Icon,
  Dialog,
  Checkbox
} from 'react-onsenui'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { phraseToSecretItems } from '../utils/wallet'
import { setSecretItems, setSecretPhrase } from '../actions/Secrets'
import { setAddress, setPrivateKey, setAddressValue } from '../actions/Context'

import TRANSLATIONS from '../translations'

class RecoverWalletPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      confirmRecover: false,
      dialogOpen: false,
      recovering: false,
      tempSecretPhrase: ''
    }

    this.newSecrets = this.newSecrets.bind(this)
  }

  newSecrets () {
    try {
      this.setState({
        tempSecretPhrase: '',
        recovering: true,
        dialogOpen: true
      })

      const secretPhrase = this.state.tempSecretPhrase
      const secretItems = phraseToSecretItems(secretPhrase)

      this.props.setSecretItems(secretItems)
      this.props.setSecretPhrase(secretPhrase)

      this.props.setAddress(secretItems[0].address)
      this.props.setPrivateKey(secretItems[0].privateKey)
    } catch (err) {
      this.setState({
        recovering: false
      })
      alert(err)
    }
  }

  renderToolbar () {
    const CUR_LANG = this.props.settings.language

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          { TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.title }
        </div>
      </Toolbar>
    )
  }

  render () {
    // translation
    const CUR_LANG = this.props.settings.language
    const secretPhraseLang = TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.secretPhrase
    const textareaPlaceholderLang = TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.textareaPlaceholder
    const confirmUnderstandLang = TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.confirmUnderstand
    const recoverLang = TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.recover

    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{padding: '12px 12px 0 12px'}}>
          <p>
            {secretPhraseLang}:<br/><br/>
            <textarea
              style={{width: '100%'}}
              value={this.state.tempSecretPhrase}
              onChange={(e) => {
                var str = e.target.value

                if (str.length > 64) {
                  str = str.slice(0, 64)
                }

                this.setState({ tempSecretPhrase: e.target.value })
              }}
              className="textarea" rows="3" placeholder={textareaPlaceholderLang}>
            </textarea>
          </p>

          <p>
            <label className="left">
              <Checkbox
                onChange={(e) => {
                  this.setState({
                    confirmRecover: !this.state.confirmRecover
                  })
                }}
                inputId='understoodCheckbox'
              />
            </label>
            <label htmlFor='understoodCheckbox' className="center">
              &nbsp;{ confirmUnderstandLang }
            </label>
          </p>

          {
            this.state.recovering
              ? <Icon icon='spinner' spin/>
              : (
                <Button
                  onClick={() => this.newSecrets()}
                  disabled={!this.state.confirmRecover || this.state.tempSecretPhrase.length < 16}
                  style={{width: '100%', textAlign: 'center'}}
                >
                  { recoverLang }
                </Button>
              )
          }
        </div>

        <Dialog
          isOpen={this.state.dialogOpen}
          onCancel={() => {
            this.setState({ dialogOpen: false })
            this.props.navigator.popPage()
          }}
          cancelable>
          <p style={{textAlign: 'center'}}>Wallet recovered!</p>
          <p style={{textAlign: 'center'}}>
            <Button
              style={{width: '90%'}}
              disabled={!this.state.dialogOpen}
              onClick={() => {
                this.setState({ dialogOpen: false })
                this.props.navigator.popPage()
              }}
            >Cool</Button>
          </p>
        </Dialog>
      </Page>
    )
  }
}

RecoverWalletPage.propTypes = {
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setSecretItems: PropTypes.func.isRequired,
  setSecretPhrase: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setAddressValue: PropTypes.func.isRequired,
  setPrivateKey: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets,
    settings: state.settings
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setSecretItems,
      setSecretPhrase,
      setAddress,
      setAddressValue,
      setPrivateKey
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(RecoverWalletPage)
