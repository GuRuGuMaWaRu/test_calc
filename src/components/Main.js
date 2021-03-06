import React, { Component } from 'react';
import CalcButton from './CalcButton';
import { handleKeyboardInput, inputCheck, parseInput, deleteInput, beautifyInput } from '../utils/parsers';
import { calculationParser } from '../utils/calculation';
import '../styles/Main.css';

/*
// 0 - does not display decimal dot!!!
// 1 - 15 total digits limit
// 1.1 - 10 digits max after decimal dot
// 1.2 - 100 chars max
// 1.3 - 20 operations max
// 2 - nice display with thousand separators
// 3 - use E+19 notation for numbers longer than 15 digits (16 digit numbers)
// 4 - CLEAR ALL button
// 5 - font size changes when the number of digits is high enough (12 digits = 115px)
// 6 - allow input from keyboard

- different color for operators
- displayed number must be right-aligned
- move input to a new line after 20 characters (20 chars per line)
- allow touch control
- add history
- result from history is added to current input when clicked
- implement '=' input

ERRORS:
'6/5/3/76/656/4' gives stack overflow

*/
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      buttons: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '()', '+/-', '='],
      message: ''
    };
  }

  // change font size depending on input length
  componentDidUpdate() {
    const length = this.state.input.length;

    if (length > 11 && length <= 15) {
      document.querySelector('.display').style.fontSize = '16px';
    } else if (this.state.input.length > 15) {
      document.querySelector('.display').style.fontSize = '14px';
    } else {
      document.querySelector('.display').style.fontSize = '20px';
    }

  }

  handleClick = (value) => {
    const limit = inputCheck(value, this.state.input);

    // handle '=' sign
    if (value === '=') {
      this.setState(prevState => ({
        input: calculationParser(prevState.input)
      }));
    }
    // check various limits and either show a message or parse input
    if (limit.limit) {
      this.setState({
        message: limit.message
      });
      window.setTimeout(() => {
        this.setState({ message: '' })
      }, 800);
    } else {
      this.setState({
        input: parseInput(this.state.input, value)
      });
    }
  }

  handleDelete = (event) => {
    this.setState(prevState => ({
      input: deleteInput(prevState.input)
    }));
  }

  handleClearAll = () => {
    this.setState({ input: '' });
  }

  render() {
    const { input, buttons, message } = this.state;

    addEventListener('keyup', this.handleClick(handleKeyboardInput));

    return (
      <div>
        <div>
          <h4>Display</h4>
          <span className="display"> { beautifyInput(input) } </span>
          <div className="tesult"> { calculationParser(input) } </div>
          <div className="message"> { message } </div>
        </div>
        <div>
          <h4>Buttons</h4>
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.handleClearAll}>Clear all</button>
          <div>
            { buttons.map(button => <CalcButton key={button} value={button} onClick={this.handleClick} />) }
          </div>
        </div>
      </div>
    );
  }
};
