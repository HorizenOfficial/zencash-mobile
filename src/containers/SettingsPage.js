import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LANGUAGES, CURRENCIES, setLanguage, setCurrency } from '../actions/Settings'

import {
  Page,  
  Toolbar,  
  BackButton,
  List,
  ListHeader,
  ListItem,
  Dialog  
} from 'react-onsenui';

import AboutPage from './AboutPage'
import ChangePinPage from './ChangePinPage'
import SecretPhrasePage from './SecretPhrasePage'
import RecoverWalletPage from './RecoverWalletPage'
import ShowPrivateKeyPage from './ShowPrivateKeyPage'
import SelectCurrencyPage from './SelectCurrencyPage'
import SelectLanguagePage from './SelectLanguagePage'

import TRANSLATIONS from '../translations'

class SettingsPage extends React.Component {
  gotoComponent(c) {    
    this.props.navigator.pushPage({component: c})    
  }

  renderToolbar() {
    // Translation stuff
    const CUR_LANG = this.props.settings.language
    const titleLang = TRANSLATIONS[CUR_LANG].SettingsPage.title

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          { titleLang }
        </div>  
      </Toolbar>
    );
  }  

  render() {
    // Translation stuff
    const CUR_LANG = this.props.settings.language
    const aboutLang = TRANSLATIONS[CUR_LANG].SettingsPage.about
    const currentLang = TRANSLATIONS[CUR_LANG].SettingsPage.current
    const currencyLang = TRANSLATIONS[CUR_LANG].SettingsPage.currency
    const languageLang = TRANSLATIONS[CUR_LANG].SettingsPage.language
    const secretPhraseLang = TRANSLATIONS[CUR_LANG].SettingsPage.secretPhrase
    const showPrivateKeysLang = TRANSLATIONS[CUR_LANG].SettingsPage.showPrivateKeys
    const recoverExistingWalletLang = TRANSLATIONS[CUR_LANG].SettingsPage.recoverExistingWallet

    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <List>
          <ListItem 
            onClick={this.gotoComponent.bind(this, AboutPage)}
            tappable>
            { aboutLang }
          </ListItem>
          <ListItem 
            onClick={this.gotoComponent.bind(this, SelectLanguagePage)}
            tappable>
            { languageLang }
          </ListItem>
          <ListItem 
            onClick={this.gotoComponent.bind(this, SelectCurrencyPage)}
            tappable>
            { currencyLang }
          </ListItem>
          <ListHeader></ListHeader>
          <ListItem
            onClick={this.gotoComponent.bind(this, ChangePinPage)}
            tappable>
            Change Pin
          </ListItem>
          <ListItem
            onClick={this.gotoComponent.bind(this, SecretPhrasePage)}
            tappable>
            { secretPhraseLang }
          </ListItem>          
          <ListItem
            onClick={this.gotoComponent.bind(this, ShowPrivateKeyPage)}
            tappable>
            { showPrivateKeysLang }
          </ListItem>
          <ListItem
            onClick={this.gotoComponent.bind(this, RecoverWalletPage)}
            tappable style={{color: 'red'}}>
            { recoverExistingWalletLang }
          </ListItem>
        </List>  
      </Page>
    );
  }
}

function mapStateToProps(state){  
  return {    
    settings: state.settings    
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setLanguage,
      setCurrency
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SettingsPage);