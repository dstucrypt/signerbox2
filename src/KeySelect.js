import React, { Component } from 'react';
import read from './reader';

export default class KeySelect extends Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(event) {
    read(event.target.files)
    .then((material)=> {
      this.props.onAdd(material);
    });
  }

  render() {
    return (<div>
      Select private key:
      <input
        type="file"
        multiple
        name="keyselect"
        value=""
        onChange={this.handleFile} />
    </div>);
  }
}
