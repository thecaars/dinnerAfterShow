import React, {Component} from 'react';
import Header from './component/Header.js';
import './App.css';
import {
  BrowserRouter as Router
} from 'react-router-dom'

class App extends Component {
  constructor() {
    super();
    this.state = {


    };
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
        </div>
      </Router>  
    );
  }
}

export default App;