import React, { Component } from 'react';

class Part extends Component {
  render() {
    const {format, subject} = this.props;
    if (subject) {
      return (<li>{format} {subject.title} {subject.commonName}</li>);
    }
    if (format === 'IIT') {
      return (<li>Encrypted Key</li>);
    }
    if (format) {
      return (<li>{format} ?</li>);
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
        {value.map((part, idx)=> <Part key={idx} {...part} />)}
      </ul>
    </div>);
  }
}

export default Material;
