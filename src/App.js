import React, { Component } from 'react';
import './App.css';
import KeySelect from './KeySelect';
import Material from './Material';

const handler = {};
const state = new Proxy({title: 'Signerbox2'}, handler);

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
    state.material = material;
  }

  render() {
    return (
      <div className="App">
        {state.title}
        <KeySelect onAdd={this.handleAdd} />
        <Material value={state.material} />
      </div>
    );
  }
}

export default App;
