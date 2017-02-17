import React, { Component } from 'react';
import CalcButton from './CalcButton';
import { maxNumberLength, parseInput, deleteInput, beatifyInput } from '../utils/parsers';
import { calculationParser } from '../utils/calculation';
import '../styles/Main.css';

/*
1 - 15 total digits limit
1.1 - 10 digits max after decimal dot
2 - nice display with thousand separators
3 - font size changes when the number of digits is high enough
4 - move input to a new line after 20 characters (20 chars per line)
5 - use E+19 notation for numbers longer than 15 digits

*/
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      buttons: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '()', '+/-'],
      result: '',
      message: ''
    };
  }

  handleClick = (value) => {
    if (/[\d\.]/.test(value) && maxNumberLength(this.state.input)) {
      this.setState({
        message: 'Maximum number of characters reached: 15'
      });
      window.setTimeout(() => { // hide message after a second
        this.setState({message: ''})
      }, 800);
    } else {
      this.setState({
        input: parseInput(this.state.input, value)
      });
    }
  }

  handleDelete = () => {
    this.setState(prevState => ({
      input: deleteInput(prevState.input)
    }));
  }

  render() {
    const keypad = this.state.buttons.map(button => {//=== create calculator keypad
          return <CalcButton key={button} value={button} onClick={this.handleClick}></CalcButton>;
        });

    return (
      <div>
        <div>
          <h4>Display</h4>
          <div className="Display">
            {beatifyInput(this.state.input)}
          </div>
          <div className="Result">
            {calculationParser(this.state.input)}
          </div>
          <div className="Message">
            {this.state.message}
          </div>
        </div>
        <div>
          <h4>Buttons</h4>
          <button onClick={this.handleDelete}>Delete</button>
          <div>
            {keypad}
          </div>
        </div>
      </div>
    );
  }
};
