import {h, Component} from 'preact';

import {canSign, canEnc, isCA} from './utils';
import save from './save';

class Saveable extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(event) {
    event.preventDefault();
    const {file} = this.props;
    save(file._raw || file.to_asn1(), file.name || (file.type || file.format) + '.dat');
  }

  render() {
    const {file, children} = this.props;
    return (file.to_asn1 || file._raw)
      ? (<span>{children} (<a href="" onClick={this.handleSave}>save file</a>)</span>)
      : children;
  }
}

class Part extends Component {
  render() {
    const {type, format, subject, extension, name, match} = this.props;
    if (subject) {
      return (<span>{format} {subject.title} {subject.commonName} {canSign(extension.keyUsage) && 'SIGN'} {canEnc(extension.keyUsage) && 'ENC'} {isCA(extension.keyUsage) && 'CA'}</span>);
    }
    if (format === 'jks-key' && match) {
      return (<span>Encrypted Key {name} for <Part {...match} /></span>);
    }
    if (format === 'IIT' || format === 'jks-key') {
      return (<span>Encrypted Key {name}</span>);
    }
    if (format) {
      return (<span>{format} ?</span>);
    }
    if (type === 'Priv' && match) {
      return (<span>Private key for <Part {...match} /></span>);
    }
    if (type === 'Priv') {
      return (<span>Private key without match</span>);
    }

    return null;
  }
}

class Material extends Component {
  render() {
    const {value} = this.props;
    if (!value) {
      return null;
    }
    return (<div>
      Key Material and Certificates
      <ul>
        {value.map((part, idx)=>
          <li key={idx}><Saveable file={part}><Part {...part} /></Saveable></li>
        )}
      </ul>
    </div>);
  }
}

export default Material;
