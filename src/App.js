import React, {Component} from 'react';
import axios from 'axios';
import Header from './component/Header.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {


    };
  }
  
  

  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;