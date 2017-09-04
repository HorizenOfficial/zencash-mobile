import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LANGUAGES, setLanguage } from '../actions/Settings'

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
import SecretPhrasePage from './SecretPhrasePage'
import RecoverWalletPage from './RecoverWalletPage'
import ShowPrivateKeyPage from './ShowPrivateKeyPage'

import TRANSLATIONS from '../translations'

class SettingsPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      languageDialogOpen: false
    }
  }

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
            onClick={() => this.setState({ languageDialogOpen: true })}
            tappable>
            { languageLang }
          </ListItem>
          <ListHeader></ListHeader>
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

        <Dialog
          isOpen={this.state.languageDialogOpen}
          onCancel={() => this.setState({ languageDialogOpen: false })}
          cancelable>
          <List>
            <ListHeader>{currentLang}: {this.props.settings.language}</ListHeader>
            {
              LANGUAGES.map(function(l){
                return (
                  <ListItem                    
                    onClick={function(){
                      this.props.setLanguage(l)                      
                      this.setState({                     
                        languageDialogOpen: false
                      })
                    }.bind(this)}
                    tappable
                  >
                  { l }
                  </ListItem>
                )
              }.bind(this))
            }            
          </List>
        </Dialog>
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
      setLanguage
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SettingsPage);