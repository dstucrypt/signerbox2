import React, { Component } from 'react';
import read from './reader';
import open from './opener';

function isKey(file) {
  return file && (file.format === 'IIT' || file.format === 'jks-key');
}

export default class KeySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.handleFile = this.handleFile.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleFile(event) {
    read(event.target.files)
    .then((material)=> {
      this.props.onAdd(material);
    });
  }

  handleOpen(event) {
    event.preventDefault();
    const {material} = this.props;
    const [key] = (material || []).filter(isKey);
    const {password} = this.state;
    console.log('open', open(key, password));
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  render() {
    const {password} = this.state;
    const {material} = this.props;
    const keys = (material || []).filter(isKey);
    return (<div>
      {!keys.length && (<div>
        Select private key:
        <input
          type="file"
          multiple
          name="keyselect"
          value=""
          onChange={this.handleFile} />
      </div>)}
      {(keys.length === 1) && (<form onSubmit={this.handleOpen}>
        Password:
        <input type="password" name="password" value={password} onChange={this.handlePassword} autoFocus />
      </form>)}
      <div>
        Found keys: {keys.length}
      </div>

    </div>);
  }
}
