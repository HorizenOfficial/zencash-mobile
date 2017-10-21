import PropTypes from 'prop-types'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { CURRENCIES, setCurrency } from '../actions/Settings'

import {
  Page,
  Toolbar,
  BackButton,
  List,
  ListItem
} from 'react-onsenui'

import TRANSLATIONS from '../translations'

class SelectCurrencyPage extends React.Component {
  renderToolbar () {
    const CUR_LANG = this.props.settings.language
    const currencyLang = TRANSLATIONS[CUR_LANG].SettingsPage.currency

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          { currencyLang } ({ this.props.settings.currency })
        </div>
      </Toolbar>
    )
  }

  render () {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <List>
          {
            CURRENCIES.map(function (l) {
              return (
                <div>
                  <ListItem
                    onClick={function () {
                      this.props.setCurrency(l)
                      this.props.navigator.popPage()
                    }.bind(this)}
                    tappable
                  >
                    { l }
                  </ListItem>
                </div>
              )
            }.bind(this))
          }
        </List>
      </Page>
    )
  }
}

SelectCurrencyPage.propTypes = {
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setCurrency: PropTypes.func.isRequired
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
      setCurrency
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SelectCurrencyPage)
