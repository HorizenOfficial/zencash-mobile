import React from 'react';
import QRCode from 'qrcode.react'

import {
  Page,
  Splitter,
  SplitterSide,
  SplitterContent,
  Toolbar,
  ToolbarButton,
  BackButton,
  Icon,
  List,
  ListItem,
  ListHeader
} from 'react-onsenui';

import SendPage from './SendPage';
import ReceivePage from './ReceivePage'
import SettingsPage from './SettingsPage'

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  hide() {
    this.setState({
      isOpen: false
    });
  }

  show() {
    this.setState({
      isOpen: true
    });
  }

  gotoComponent(c) {    
    this.props.navigator.pushPage({component: c});
    this.setState({
      isOpen: false
    })
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
      </Toolbar>
    );
  }

  render() {    
    return (
      <Page>
        <Splitter>
          <SplitterSide
            side='left'
            isOpen={this.state.isOpen}
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
                    name: 'receive',
                    component: ReceivePage
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
                  <QRCode value="hello world"/>                
                </p>
                <p style={{fontSize: '13px'}}>
                  Value: 32323232.091234 ZEN
                </p>
                <p style={{fontSize: '10px', paddingBottom: '10px'}}>
                  Address: znSDvF9nA5VCdse5HbEKmsoNbjCbsEA3VAH
                </p>
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
      </Page>
    );
  }
}

export default MainPage;