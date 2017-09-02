import React from 'react'

import { Page, Toolbar, ToolbarButton, BackButton, Button, Input, Icon} from 'react-onsenui'

import QRCode from 'qrcode.react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { ZENCASH_MOBILE_SAVE_PATH, readFromFile, writeToFile } from '../utils/persistentStorage'
import { phraseToSecretItems } from '../utils/wallet'

class ShowPrivateKeyPage extends React.Component {
  gotoComponent (c) {
    this.props.navigator.pushPage({component: c})
    this.setState({
      sliderOpen: false
    })
  }

  renderToolbar () {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>
            Back
          </BackButton>
        </div>
        <div className='center'>
          Private Keys
        </div>
      </Toolbar>
    )
  }

  render () {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <hr/>
        {
          this.props.secrets.items.map(function(i){
            return (
              <div>
                <ons-row style={{textAlign: 'center'}}>
                  <ons-col>
                    <p>
                      Private Key<br/>
                      <QRCode value={i.privateKey} />
                    </p>
                    <p style={{fontSize: '12px'}}>                      
                      <textarea disabled value={i.privateKey}></textarea>
                    </p>
                  </ons-col>
                  <ons-col>
                    <p>
                      Address<br/>
                      <QRCode value={i.address} />
                    </p> 
                    <p style={{fontSize: '12px'}}>                    
                      <textarea disabled value={i.address}></textarea>                    
                    </p>                         
                  </ons-col>                
                </ons-row>
                <hr/>
              </div>            
            )
          })
        }        
      </Page>
    )
  }
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets
  }
}

export default connect(mapStateToProps)(ShowPrivateKeyPage)
