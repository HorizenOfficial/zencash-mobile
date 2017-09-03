// Page that does the funky loading animation while reading files
// Or page that displays the MainPage. this page exists because
// of the async nature of JS

import React from 'react';

import {
  Page,
  Icon,
  Navigator
} from 'react-onsenui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setReadSavedFile } from '../actions/Context'
import { setSecretPhrase, setSecretItems } from '../actions/Secrets'

import { ZENCASH_MOBILE_SAVE_PATH, readFromFile, writeToFile } from '../utils/persistentStorage'
import { phraseToSecretItems } from '../utils/wallet'

import MainPage from './MainPage'
import SetupPage from './SetupPage'

import ZENCASH_IMG from '../assets/img/zencash.png'

const renderPage = (route, navigator) => (
  <route.component key={route.key} navigator={navigator} />
);

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hasExistingWallet: false
    }
  }

  componentDidMount(){
    readFromFile(ZENCASH_MOBILE_SAVE_PATH, function(data){
      data = JSON.parse(data)

      if (data.secretPhrase !== undefined){        
        const secretPhrase = data.secretPhrase
        const secretItems = phraseToSecretItems(secretPhrase)

        this.props.setSecretItems(secretItems)
        this.props.setSecretPhrase(secretPhrase)

        this.setState({
          hasExistingWallet: true
        })
      }

      this.props.setReadSavedFile(true)
    }.bind(this), function(err){

      this.props.setReadSavedFile(true)
    }.bind(this))
  }

  render() {
    return (      
      this.props.context.readSavedFile ?
      (
        this.state.hasExistingWallet ?
        (
          <Navigator
            renderPage={renderPage}
            initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
          />
        ) :
        (
          <SetupPage setHasExistingWallet={(v) => this.setState({ hasExistingWallet: v})}/>
        )
      ) :
      (        
        <Page>          
          <div style={{marginTop: '40%', textAlign: 'center'}}>
            <img src={ZENCASH_IMG} style={{width: '30%'}}/>
            <h2> Loading ... </h2>
          </div>
        </Page>    
      )
    )
  }
}

function mapStateToProps(state){  
  return {
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setReadSavedFile,
      setSecretItems,
      setSecretPhrase
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(App);