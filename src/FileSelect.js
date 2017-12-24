import React, { Component } from 'react';
import {readFile} from './filereader';

class FileSelect extends Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(event) {
    const [file] = event.target.files;
    if (!file) {
      return null;
    }
    return readFile(file)
    .then(this.props.onAdd);
  }

  render() {
    return (<form>
      Select file to sign:
        <input
          type="file"
          name="fileselect"
          value=""
          onChange={this.handleFile} />
    </form>);
  }
}

export default FileSelect;
