import React, { Component } from 'react';


export default class KeySelect extends Component {
  handleFile(event) {
    console.log('select file', event.target.files);
  }

  render() {
    return (<div>
      Select private key:
      <input
        type="file"
        name="keyselect"
        value=""
        onChange={this.handleFile} />
    </div>);
  }
}
