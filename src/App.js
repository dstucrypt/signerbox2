import React, { Component } from 'react';
import './App.css';
import KeySelect from './KeySelect';
import Material from './Material';

const handler = {};
const state = new Proxy({title: 'Signerbox2'}, handler);

function findMatch(key, other) {
  if (key.format === 'jks-key' && key.match) {
    return key.match;
  }
  if (key.type !== 'Priv') {
    return null;
  }
  return other.reduce((acc, file)=> {
    if (acc) {
      return acc;
    }
    if (file.format !== 'x509') {
      return acc;
    }

    if (key.pub_match(file.pubkey)) {
      return file;
    }
    return acc;
  }, null);
}

function makeMatches(material) {
  return material.map((part)=> ({...part, match: findMatch(part, material)}));
}

class App extends Component {
  constructor(props) {
    super(props);
    handler.set = (target, key, value)=> {
      target[key] = value;
      this.forceUpdate();
      return true;
    };
  }

  handleAdd(material) {
    state.material = makeMatches(material);
  }

  render() {
    return (
      <div className="App">
        {state.title}
        <KeySelect material={state.material} onAdd={this.handleAdd} />
        <Material value={state.material} />
      </div>
    );
  }
}

export default App;
