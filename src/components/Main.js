import React, { Component } from 'react';
import CalcButton from './CalcButton';
import { inputCheck, parseInput, deleteInput, beautifyInput } from '../utils/parsers';
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
4 - font size changes when the number of digits is high enough (12 digits)
5 - move input to a new line after 20 characters (20 chars per line)
6 - allow input from keyboard
7 - CLEAR ALL button

*/
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      buttons: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '()', '+/-'],
      message: ''
    };
  }

  handleClick = (value) => {
    const limit = inputCheck(value, this.state.input);

    if (limit.limit) {
      this.setState({
        message: limit.message
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

  handleClearAll = () => {
    this.setState({
      input: ''
    });
  }

  render() {
    const { input, buttons, message } = this.state;

    return (
      <div>
        <div>
          <h4>Display</h4>
          <div className="Display"> { beautifyInput(input) } </div>
          <div className="Result"> { calculationParser(input) } </div>
          <div className="Message"> { message } </div>
        </div>
        <div>
          <h4>Buttons</h4>
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.handleClearAll}>Clear all</button>
          <div>
            { buttons.map(button => <CalcButton key={button} value={button} onClick={this.handleClick} />)}
          </div>
        </div>
      </div>
    );
  }
};
