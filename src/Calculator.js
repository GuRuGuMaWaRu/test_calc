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

  updateState = (value, container, input) => {

    function insertThousandCommas(number) {
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

    function parseNumberForDisplay(number) {
      if (number.indexOf('.') !== -1){
        let beforeDecimalDot = number.slice(0, number.indexOf('.')),
            afterDecimalDot = number.slice(number.indexOf('.'));

        return beforeDecimalDot.length > 3
          ? insertThousandCommas(beforeDecimalDot) + afterDecimalDot
          : beforeDecimalDot + afterDecimalDot;
      } else {
        return number.length > 3
          ? insertThousandCommas(number)
          : number;
      }
    }

    input.push(container);

    this.setState({
      input: input,
      display: input.map(item => {
        if (/\d/.test(item)) {
          return parseNumberForDisplay(item);
        } else {
          return item;
        }
      }),
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
      }
      this.updateState(value, value, input);
      this.setState({
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

    if (floatingPoint) {
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
