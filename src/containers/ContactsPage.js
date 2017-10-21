import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Page,
  Toolbar,
  BackButton
} from 'react-onsenui'

import TRANSLATIONS from '../translations'

class ContactsPage extends React.Component {
  render () {
    return (
      <div>
        <h1>hi</h1>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ContactsPage)
