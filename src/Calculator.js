/*
RULES:
1 - no operator if input is empty
2 - if decimalDot is the first char, add zero before it
3 - no more than one decimalDot per number
4 -
*/
import React, { Component } from 'react';
import CalcButton from './CalcButton';
import './Calculator.css';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      last: '1',
      decimalDot: false,
      // firstNumber: '',
      // operator: '',
      // secondNumber: '',
      result: '',
      buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/', '.']
    };
  }

  updateState = (value, container, input) => {
    input.push(container);
    this.setState({
      input: input,
      last: value
    });
  }


  handleClick = (value, event) => {
    let input = this.state.input;

    event.preventDefault();
    if (/\d/.test(value) || (/\./.test(value) && this.state.decimalDot === false)) { //=== add a number or a decimal dot (is there is none)
      let container = input.length > 0 && /\d|\./.test(this.state.last) ? input.pop() : '';

      if (container.length === 0 && /\./.test(value)) { //=== deal with leading decimal dot issue
        container = '0.';
        this.setState({
          decimalDot: true
        });
        this.updateState(value, container, input);
      } else if (container.length === 1 && container === '0') { //=== deal with leading zero issue
        container = value.toString();
        this.updateState(value, container, input);
      } else if (/\./.test(value)) { //=== add decimal dot only if there is none
        container += value;
        this.setState({
          decimalDot: true
        });
        this.updateState(value, container, input);
      } else if (!/\./.test(value)) { //=== add anything except a decimal dot
        container += value;
        this.updateState(value, container, input);
      }
    } else if (!/\d|\./.test(value) && input.length > 0) { //=== add operator
      if (!/\d/.test(this.state.last)) { //=== ensure there is only one operator
        input.pop();
        input.push(value);
      } else {
        input.push(value);
      }
      this.setState({
        input: input,
        last: value,
        decimalDot: false
      });
    }
    this.parseInput();
  }

  parseInput = () => {
    let input = this.state.input,
        firstNumber = '',
        operator = '',
        secondNumber = '',
        result = '';

    for (let i = 0, len = input.length; i < len; i++) {

      if (/\d/.test(input[i]) && firstNumber.length === 0) {
        firstNumber = input[i];
      } else if (!/\d/.test(input[i])) {
        operator = input[i];
      } else if (/\d/.test(input[i]) && secondNumber.length === 0) {
        secondNumber = input[i];
      }

      if (secondNumber.length > 0) {
        result = this.calculate(firstNumber, operator, secondNumber);
        firstNumber = result;
        operator = '';
        secondNumber = '';
        this.setState({
          result: result
        });
      }
    }
  }

  calculate = (firstNumber, operator, secondNumber) => {
    const floatingPoint = firstNumber.indexOf('.') !== -1 || secondNumber.indexOf('.') !== -1;
    let symbolsAfterDot;

    function symbolsAfter(number, symbol) {
      let dotIndex = number.indexOf(symbol),
          afterDot = number.slice(dotIndex + 1);
      return afterDot.length;
    }

    if (floatingPoint) {
      symbolsAfterDot = Math.max(symbolsAfter(firstNumber, '.'), symbolsAfter(secondNumber, '.'));
      firstNumber = Number.parseFloat(firstNumber, 10);
      secondNumber = Number.parseFloat(secondNumber, 10);
    } else {
      firstNumber = Number.parseInt(firstNumber, 10);
      secondNumber = Number.parseInt(secondNumber, 10);
    }

    switch(operator) {
      case '+':
        if (floatingPoint) {
          return (firstNumber + secondNumber).toLocaleString('en-US', {maximumFractionDigits: 10});
        } else {
          return (firstNumber + secondNumber).toLocaleString();
        }
      case '-':
        if (floatingPoint) {
          return (firstNumber - secondNumber).toLocaleString('en-US', {maximumFractionDigits: 10});
        } else {
          return (firstNumber - secondNumber).toLocaleString();
        }
      case '*':
        if (floatingPoint) {
          return (firstNumber * secondNumber).toLocaleString('en-US', {maximumFractionDigits: 10});
        } else {
          return (firstNumber * secondNumber).toLocaleString();
        }
      case '/':
        if (floatingPoint) {
          return (firstNumber / secondNumber).toLocaleString('en-US', {maximumFractionDigits: 10});
        } else {
          return (firstNumber / secondNumber).toLocaleString();
        }
      default:
        return '';
    }
  }

  handleDelete = () => {
    // if (this.state.secondNum.length > 0) {
    //   this.setState(prevState => ({
    //     secondNum: prevState.secondNum.slice(0, -1)
    //   }));
    // } else if (this.state.operator.length > 0) {
    //   this.setState({
    //     operator: ''
    //   });
    // } else if (this.state.firstNum.length > 0) {
    //   this.setState(prevState => ({
    //     firstNum: prevState.firstNum.slice(0, -1)
    //   }));
    // }
  }

  display = () => {
  }

  render() {
    let keypad = this.state.buttons.map(button => {//=== create keypad
          return <CalcButton key={button} value={button} onClick={this.handleClick}></CalcButton>;
        });

    // console.log(this.state.input);

    return (
      <div>
        <div>
          <h4>Display</h4>
          <div className="Display">
            {/* {this.state.firstNum + this.state.operator + this.state.secondNum} */}
            {this.state.input}
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
