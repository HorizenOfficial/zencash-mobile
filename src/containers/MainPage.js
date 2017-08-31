import React from 'react';
import QRCode from 'qrcode.react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Page,
  Splitter,
  SplitterSide,
  SplitterContent,
  Dialog,
  Toolbar,
  ToolbarButton,
  Button,
  BackButton,
  Icon,
  List,
  ListItem,
  ListHeader
} from 'react-onsenui';

import SendPage from '../components/SendPage';
import SettingsPage from '../components/SettingsPage'

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderOpen: false,
      dialogOpen: false,
      selectedAddress: ''      
    };
  }

  hide() {
    this.setState({
      sliderOpen: false
    });
  }

  show() {
    this.setState({
      sliderOpen: true
    });
  }

  toggleDialog() {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    })
  }

  gotoComponent(c) {    
    this.props.navigator.pushPage({component: c});
    this.setState({
      sliderOpen: false
    })
  }

  componentDidMount() {
    if (this.props.secrets.length > 0){
      this.setState({
        selectedAddress: this.props.secrets[0].address,
        selectedPrivateKey: this.props.secrets[0].privateKey
      })      
    }
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <ToolbarButton onClick={this.show.bind(this)}>
            <Icon icon='ion-navicon, material:md-menu' />
          </ToolbarButton>
        </div>
        <div className='center'>
          ZENCash Wallet
        </div>
        <div className='right'>
          <ToolbarButton onClick={this.toggleDialog.bind(this)}>
            <Icon icon='ion-clipboard'/>
          </ToolbarButton>
        </div>        
      </Toolbar>
    );
  }

  render() {    
    return (
      <Page>
        <Splitter>
          <SplitterSide
            side='left'
            isOpen={this.state.sliderOpen}
            onClose={this.hide.bind(this)}
            onOpen={this.show.bind(this)}
            collapse={true}
            width={240}
            isSwipeable={true}>
            <Page>
              <List
                dataSource=
                {[{
                    name: 'send',
                    component: SendPage
                  },
                  {
                    name: 'settings',
                    component: SettingsPage
                  }
                ]}                
                renderHeader={() => <ListHeader>zen</ListHeader>}
                renderRow={(i) => 
                  <ListItem
                    onClick={this.gotoComponent.bind(this, i.component)}
                    modifier='longdivider'
                    tappable>
                    {i.name}
                  </ListItem>
                }
              />
            </Page>
          </SplitterSide>

          <SplitterContent>
            <Page renderToolbar={this.renderToolbar.bind(this)}>              
              <p style={{fontSize: '15px', textAlign: 'center'}}>
                Total ZEN: 12324242.12131
              </p>              

              <hr/>

              <div style={{textAlign: 'center'}}>
                <p>
                  <QRCode value={this.state.selectedAddress}/>                
                </p>
                <p style={{fontSize: '13px'}}>
                  Value: 32323232.091234 ZEN
                </p>
                <p style={{fontSize: '12px'}}>                  
                  Address: { this.state.selectedAddress }
                </p>
                
                <Button                  
                  style={{fontSize: '12px', marginBottom: '10px', width: '90%'}}>                  
                  Copy address to clipboard
                </Button>                
              </div>

              <hr/>             

              <List>
                <ListItem tappable>
                  <ons-row>
                    <ons-col>+ Received</ons-col>
                    <ons-col style={{textAlign: 'right', paddingRight: '12px'}}>
                      10.0000000000 zen
                    </ons-col>
                  </ons-row>
                </ListItem>
                <ListItem tappable>
                  <ons-row>
                    <ons-col>+ Received</ons-col>
                    <ons-col style={{textAlign: 'right', paddingRight: '12px'}}>
                      10.0000000000 zen
                    </ons-col>
                  </ons-row>
                </ListItem>    
              </List>
            </Page>
          </SplitterContent>
        </Splitter>

        <Dialog
          isOpen={this.state.dialogOpen}
          onCancel={this.toggleDialog.bind(this)}
          cancelable>
          <List>
            <ListHeader>Choose Another Address</ListHeader>
            {
              this.props.secrets.map(function(e){
                return (
                  <ListItem
                    style={{fontSize: '12px'}}
                    onClick={function(){                      
                      this.setState({
                        selectedAddress: e.address,
                        dialogOpen: false
                      })                      
                    }.bind(this)}
                    tappable
                  >
                  { e.address }
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
    secrets: state.secrets    
  }
}


export default connect(mapStateToProps)(MainPage);