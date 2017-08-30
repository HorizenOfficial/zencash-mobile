import React from 'react';

import {
  Page,  
  Toolbar,  
  BackButton,
  ToolbarButton
} from 'react-onsenui';

class ScannerPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }
  render(){
    console.log(QRScanner)

    const previewStyle = {
      height: 240,
      width: 320,
    }

    return(
      <Page>
      </Page>
    )
  }
}

export default ScannerPage;