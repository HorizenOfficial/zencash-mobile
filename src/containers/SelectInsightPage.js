import PropTypes from 'prop-types'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setInsightAPI } from '../actions/Settings'

import {
  Page,
  Toolbar,
  BackButton,
  List,
  ListItem,
  ListHeader,
  Input
} from 'react-onsenui'

import TRANSLATIONS from '../translations'

class SelectInsightPage extends React.Component {


  renderToolbar () {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          Insight API
        </div>
      </Toolbar>
    )
  }

  render () {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <List>
          <ListItem>
            <Input
              onChange={(e) => this.props.setInsightAPI(e.target.value)}
              value={this.props.settings.insightAPI}
              style={{ width: '100%' }}
              float={true}
            />
          </ListItem>
          <ListHeader>
            Preconfigured Nodes
          </ListHeader>
          <ListItem tappable onClick={() => this.props.setInsightAPI('https://explorer.horizen.global/api/')}>
            horizen.global
          </ListItem>
          <ListItem tappable onClick={() => this.props.setInsightAPI('https://explorer.zen-solutions.io/api/')}>
            explorer.zen-solutions.io
          </ListItem>
        </List>
      </Page>
    )
  }
}

SelectInsightPage.propTypes = {
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setInsightAPI: PropTypes.func.isRequired
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
      setInsightAPI
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SelectInsightPage)
