import PropTypes from 'prop-types'
import React from 'react'

import {
  Page,
  Toolbar,
  BackButton
} from 'react-onsenui'

import { connect } from 'react-redux'

import TRANSLATIONS from '../translations'

class SecretPhrasePage extends React.Component {
  gotoComponent (c) {
    this.props.navigator.pushPage({component: c})
    this.setState({
      sliderOpen: false
    })
  }

  renderToolbar () {
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
    )
  }

  render () {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <ons-row>
          <div style={{padding: '12px 12px 0 12px', textAlign: 'center', width: '100%'}}>
            <textarea
              style={{width: '100%'}}
              className="textarea" rows="3"
              maxLength={64}
              value={ this.props.secrets.secretPhrase }
            >
            </textarea>
          </div>
        </ons-row>
      </Page>
    )
  }
}

SecretPhrasePage.propTypes = {
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(SecretPhrasePage)
