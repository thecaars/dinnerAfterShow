import React, {Component} from 'react';
import Header from './component/Header.js';
import SavedCombos from './component/SavedCombos.js';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
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

          <SavedCombos />
        </div>
      </Router>  
    );
  }
}

export default App;