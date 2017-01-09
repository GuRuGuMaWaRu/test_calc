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
      // firstNum: '',
      // operator: '',
      // secondNum: '',
      // result: '',
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
        console.log('deal with leading decimal dot issue');
        container = '0.';
        this.setState({
          decimalDot: true
        });
        this.updateState(value, container, input);
      } else if (container.length === 1 && container === '0') { //=== deal with leading zero issue
        console.log('deal with leading zero issue');
        container = value.toString();
        this.updateState(value, container, input);
      } else if (/\./.test(value)) { //=== add decimal dot only if there is none
        console.log('add decimal dot if there is none');
        container += value;
        this.setState({
          decimalDot: true
        });
        this.updateState(value, container, input);
      } else if (!/\./.test(value)) { //=== add anything except a decimal dot
        console.log('add anything except a decimal dot');
        container += value;
        this.updateState(value, container, input);
      }
      // input.push(container);
      // this.setState({
      //   input: input,
      //   last: value
      // });
    } else if (!/\d|\./.test(value) && input.length > 0) { //=== add operator
      console.log('add operator');
      if (!/\d/.test(this.state.last)) { //=== ensure there is only one operator
        console.log('ensure there is only one operator');
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
  }

  parseInput = () => {
    // for (let i = 0, len = this.state.input.length; i < len; i++) {
    //   let value = this.state.input[i];
    //
    //   if (/\d/.test(value) && this.state.operator === '') {
    //     this.setState(prevState => ({
    //       firstNum: prevState.firstNum + value
    //     }));
    //   } else if (!/\d/.test(value) && this.state.firstNum.length > 0) {
    //     this.setState({
    //       operator: value
    //     });
    //   } else if (/\d/.test(value)) {
    //     this.setState(prevState => ({
    //       secondNum: prevState.secondNum + value
    //     }));
    //     this.calculateResults();
    //   } else if (!/\d/.test(value)) {
    //     this.setState({
    //       firstNum: this.state.result
    //     });
    //   }
    // }
  }

  calculateResults = () => {
    // if (this.state.secondNum.length > 0) {
    //   const firstNumber = Number.parseInt(this.state.firstNum, 10),
    //         secondNumber = Number.parseInt(this.state.secondNum, 10);
    //
    //   switch(this.state.operator) {
    //     case '+':
    //       this.setState({
    //         result: firstNumber + secondNumber
    //       });
    //       break;
    //     case '-':
    //       this.setState({
    //         result: firstNumber - secondNumber
    //       });
    //       break;
    //     case '*':
    //       this.setState({
    //         result: firstNumber * secondNumber
    //       });
    //       break;
    //     case '/':
    //       this.setState({
    //         result: firstNumber / secondNumber
    //       });
    //       break;
    //     default:
    //       this.setState({
    //         result: ''
    //       });
    //   }
    // }
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

    console.log(this.state.input);

    return (
      <div>
        <div>
          <h4>Display</h4>
          <div className="Display">
            {/* {this.state.firstNum + this.state.operator + this.state.secondNum} */}
            {this.state.input}
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
