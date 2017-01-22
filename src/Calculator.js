import React, { Component } from 'react';
import CalcButton from './CalcButton';
import './Calculator.css';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      display: [],
      last: '1',
      decimalDot: false,
      result: '',
      buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/', '.']
    };
  }

  handleClick = (value, event) => {
    let input = this.state.input,
        container = '';

    var updateState = (value, container, input) => {
      input.push(container);
      this.setState({
        input: input,
        last: value
      });
    }

    event.preventDefault();
    if (/\d/.test(value) || (/\./.test(value) && this.state.decimalDot === false)) { //=== add a number or a decimal dot (is there is none)
      container = input.length > 0 && /\d|\./.test(this.state.last) ? input.pop() : '';

      if (container.length === 0 && /\./.test(value)) { //=== deal with leading decimal dot issue
        container = '0.';
        this.setState({
          decimalDot: true
        });
      } else if (container.length === 1 && container === '0') { //=== deal with leading zero issue
        container = value.toString();
      } else if (/\./.test(value)) { //=== add decimal dot only if there is none
        container += value;
        this.setState({
          decimalDot: true
        });
      } else if (!/\./.test(value)) { //=== add anything except a decimal dot
        container += value;
      }
    } else if (!/\d|\./.test(value) && input.length > 0) { //=== add operator
      if (!/\d/.test(this.state.last) && this.state.last !== '.') { //=== ensure there is only one operator & take care of 'last dot' issue
        input.pop();
      }
      container = value;
      this.setState({
        decimalDot: false
      });
    }
    updateState(value, container, input);
    this.parseInput();
  }

  parseInput = () => {
    let input = this.state.input,
        firstNumber = '',
        operator = '',
        secondNumber = '',
        result = '';

    var insertThousandSeparators = number => { // helper function used to insert thousand separators
      let counter = 0;
      let tempString = '';
      for (let i = number.length - 1; i >= 0; i--) {
        if (counter === 3) {
          tempString = number[i] + ',' + tempString;
          counter = 1;
        } else {
          tempString = number[i] + tempString;
          counter += 1;
        }
      }
      return tempString;
    }

    var parseNumberForDisplay = number => { // helper function used to adjust displayed numbers
      if (number.indexOf('.') !== -1){
        let beforeDecimalDot = number.slice(0, number.indexOf('.')),
            afterDecimalDot = number.slice(number.indexOf('.'));

        return beforeDecimalDot.length > 3
          ? insertThousandSeparators(beforeDecimalDot) + afterDecimalDot
          : beforeDecimalDot + afterDecimalDot;
      } else {
        return number.length > 3
          ? insertThousandSeparators(number)
          : number;
      }
    }

    this.setState({ // display input
      display: input.map(item => {
        if (/\d/.test(item)) {
          return parseNumberForDisplay(item);
        } else {
          return item;
        }
      }),
      result: ''
    });

    for (let i = 0, len = input.length; i < len; i++) { // parse input for calculation

      if (/\d/.test(input[i]) && firstNumber.length === 0) {
        firstNumber = input[i];
      } else if (!/\d/.test(input[i])) {
        operator = input[i];
      } else if (/\d/.test(input[i]) && secondNumber.length === 0) {
        secondNumber = input[i];
      }

      if (operator === '/' && secondNumber === '0') { // deal with 'divide by zero' problem
        return false;
      }

      if (secondNumber.length > 0) { // go to calculation if conditions are right
        result = this.calculate(firstNumber, operator, secondNumber);
        firstNumber = result.toString();
        operator = '';
        secondNumber = '';
        this.setState({
          result: firstNumber.indexOf('.') !== -1
            ? result.toLocaleString('en-US', {maximumFractionDigits: 10})
            : result.toLocaleString()
        });
      }
    }
  }

  calculate = (firstNumber, operator, secondNumber) => {
    const floatingPoint = firstNumber.indexOf('.') !== -1 || secondNumber.indexOf('.') !== -1;

    if (floatingPoint) { // convert string numbers into true numbers
      firstNumber = Number.parseFloat(firstNumber, 10);
      secondNumber = Number.parseFloat(secondNumber, 10);
    } else {
      firstNumber = Number.parseInt(firstNumber, 10);
      secondNumber = Number.parseInt(secondNumber, 10);
    }

    switch(operator) { // perform a calculation depending on passed operator
      case '+':
        return firstNumber + secondNumber;
      case '-':
        return firstNumber - secondNumber;
      case '*':
        return firstNumber * secondNumber;
      case '/':
        return firstNumber / secondNumber;
      default:
        return '';
    }
  }

  handleDelete = () => {
    let input = this.state.input,
        lastInput = '',
        updatedLastInput = '';

    if (input.length > 0) {
      lastInput = input.pop();
      updatedLastInput = lastInput.slice(0, -1);
      if (updatedLastInput.length > 0) {
        input.push(updatedLastInput);
      }
      this.setState({
        input
      });
    }
    this.parseInput();
  }

  render() {
    let keypad = this.state.buttons.map(button => {//=== create keypad
          return <CalcButton key={button} value={button} onClick={this.handleClick}></CalcButton>;
        });

    return (
      <div>
        <div>
          <h4>Display</h4>
          <div className="Display">
            {this.state.display}
          </div>
          <div className="Result">
            {this.state.result}
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
}
