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
import { setLanguage, setCurrency } from '../actions/Settings'

import { ZENCASH_MOBILE_SAVE_PATH, readFromFile, writeToFile } from '../utils/persistentStorage'
import { phraseToSecretItems } from '../utils/wallet'

import MainPage from './MainPage'
import SetupPage from './SetupPage'

import ZENCASH_IMG from '../../assets/img/zencash.png'

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
      // If errors while we're reading the JSOn
      // then just assume its empty
      try{
        data = JSON.parse(data)
      } catch (err) {
        data = {}
      }

      // Get secret phrase
      if (data.secretPhrase !== undefined){     
        const secretPhrase = data.secretPhrase
        const secretItems = phraseToSecretItems(secretPhrase)

        this.props.setSecretItems(secretItems)
        this.props.setSecretPhrase(secretPhrase)

        this.setState({
          hasExistingWallet: true
        })
      }
      
      // Get settings
      // Future: add insight, explorer settings      
      if (data.settings !== undefined){             
        if (data.settings.language !== undefined){
          const settingsLanguage = data.settings.language            
          this.props.setLanguage(settingsLanguage)
        }

        if (data.settings.currency !== undefined && data.settings.currency !== null){
          const settingsCurrency = data.settings.currency
          this.props.setCurrency(settingsCurrency)
        }
      }

      this.props.setReadSavedFile(true)

    }.bind(this), function(err){
      // Cordova plugin might not work for
      // All api versions. in the event...
      try{
        this.props.setReadSavedFile(true)
      } catch(err) {
        alert(err)
      }   
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
            <img src={ZENCASH_IMG} style={{width: '30%'}}/><br/>
            <Icon icon='spinner' spin/>
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
      setSecretPhrase,
      setLanguage,
      setCurrency
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(App);