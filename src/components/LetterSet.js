import React, { Component } from 'react';
import Letter from 'components/Letter';
import Char from 'components/Char';

function normalizeString(phrase) {
  // Strip special characters from a string and convert to all upper case.
  return phrase.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
}

function getUppercaseAlphabet() {
  return [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
}

function buildUppercaseShuffleSet() {
  let alphaShuf = getUppercaseAlphabet();
  for (var i = 0; i < alphaShuf.length; i++) {
    var rando = Math.floor(Math.random() * 26);
    var temp = alphaShuf[i];
    alphaShuf[i] = alphaShuf[rando];
    alphaShuf[rando] = temp;
  }
  let res = {};
  getUppercaseAlphabet().forEach((val, i) => {
    res[val] = alphaShuf[i];
  })
  return res;
}

function buildAnswerSet() {
  let res = {};
  getUppercaseAlphabet().forEach((val) => {
    res[val] = '';
  });
  return res;
}

function shuffleUppercaseString(phrase, shuffleSet) {
  return phrase.split('').map((val) => {
    if (val.charCodeAt() >= 65 && val.charCodeAt() <= 90) {
      return shuffleSet[val];
    }
    return val;
  }).join('');
}

class LetterSet extends Component {
  constructor(props) {
    super(props);
    let shuffleSet = buildUppercaseShuffleSet();
    this.state = {
      shuffleSet: shuffleSet,
      answerSet: buildAnswerSet(),
      phrase: normalizeString(this.props.phrase),
      shuffledPhrase: shuffleUppercaseString(normalizeString(this.props.phrase), shuffleSet),
      enteredKeys: new Array(26).fill(false)
    };
  }

  handleChange(event) {
    let answerSet = Object.assign({}, this.state.answerSet);
    let enteredKeys = this.state.enteredKeys.slice();
    let shuffledChar = event.target.name;
    let guessedChar = event.target.value.toUpperCase();
    let resChar = '';
    enteredKeys[answerSet[shuffledChar].charCodeAt() - 65] = false;
    if (guessedChar.charCodeAt() >= 65 && 
      guessedChar.charCodeAt() <= 90 &&
      !enteredKeys[guessedChar.charCodeAt() - 65]) {
      enteredKeys[guessedChar.charCodeAt() - 65] = true;
      resChar = guessedChar; 
    }
    answerSet[shuffledChar] = resChar;
    this.setState({
      answerSet: answerSet,
      enteredKeys: enteredKeys
    });
  }

  checkAnswerSolved() {
    let currentAnswer = this.state.shuffledPhrase.split('').map((val) => {
      if (val.charCodeAt() >= 65 && val.charCodeAt() <= 90) {
        return this.state.answerSet[val];
      }
      return val;
    }).join('');
    if (currentAnswer === this.state.phrase) {
      return true;
    }
    return false;
  }

  render() {
    return this.state.shuffledPhrase.split(' ').map((word) => {
      
      let shuffleWord = word.split('').map((char) => {
        if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
          return <Letter changeFunc={this.handleChange.bind(this)} char={char} guess={this.state.answerSet[char]}/>
        }
        return <Char char={char}/>
      });
      return (
        <div className="word">
          {shuffleWord}
          <Char space={true} char={' '}/>
        </div>
      );
    });
  }
}

export default LetterSet;
