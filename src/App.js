import React, { Component } from 'react';
import './App.css';
import KeySelect from './KeySelect';

const handler = {};
const state = new Proxy({title: 'Signerbox2'}, handler);

class App extends Component {
  constructor(props) {
    super(props);
    handler.set = ()=> {
        this.forceUpdate();
        return true;
    };
  }

  render() {
    return (
      <div className="App">
        {state.title}
        <KeySelect />
      </div>
    );
  }
}

export default App;
