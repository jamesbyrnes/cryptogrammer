import React, { Component } from 'react';

class Char extends Component {
  render() {
    return (
      <div className={"char" + (this.props.space ? " space" : "")}>
        <p>{this.props.char}</p>
      </div>
    )
  }
}

export default Char;
