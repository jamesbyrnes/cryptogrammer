import React, { Component } from 'react';

class NavBar extends Component {
  checkSolved = () => {
    window.alert(this.props.checkAnswerSolved());
  }

  render() {
    return (
      <nav id="nav-main">
        <div id="nav-title">CRYPTOGRAMMER</div>
        <div id="nav-controls">
          <button id="nav-controls-checksolved" onClick={this.checkSolved}>Check Answer</button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
