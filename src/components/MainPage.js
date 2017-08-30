import React from 'react';

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
              <p style={{textAlign: 'center'}}>
                Swipe left to open menu! :)
              </p>
            </Page>
          </SplitterContent>
        </Splitter>
      </Page>
    );
  }
}

export default MainPage;