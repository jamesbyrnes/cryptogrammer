import React, { Component } from 'react';
import './App.css';
import LetterSet from 'components/LetterSet.js';
import NavBar from 'components/NavBar';

const quotes = require('quotes.json');

function getQuote() {
  const rando = Math.floor(Math.random() * Math.floor(quotes.length));
  return quotes[rando]['quoteText'];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: getQuote()
    };
  }

  checkAnswerSolved() {
    return this.game.checkAnswerSolved();
  }

  render() {
    // For future use; TODO make a histogram to determine the most
    // effective way to show a 'hint' letter (
    //console.log(this.state.phrase.split('').reduce((acc, x) => {
    //    x = x.toUpperCase();
    //    if (!acc[x]) {
    //      acc[x] = 1;
    //    } else {
    //      acc[x]++;
    //    }
    //    return acc;
    //  }, {}));
    return (
      <div className="App">
        <NavBar checkAnswerSolved={this.checkAnswerSolved.bind(this)}/>
        <div id="game-container">
          <LetterSet phrase={this.state.phrase} ref={instance => { this.game = instance; }}/>
        </div>
      </div>
    );
  }
}

export default App;
