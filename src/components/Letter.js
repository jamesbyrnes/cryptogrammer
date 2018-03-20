import React, { Component } from 'react';

class Letter extends Component {
  render() {
    return (
      <div className="letter">
        <input onChange={this.props.changeFunc} name={this.props.char} value={this.props.guess} maxlength="1"/>
        <p>{this.props.char}</p>
      </div>
    )
  }
}

export default Letter;
