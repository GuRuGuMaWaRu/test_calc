import React, { Component } from 'react';
import CalcButton from './CalcButton';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNum: '',
      operator: '',
      secondNum: '',
      buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/']
    };
  }


  handleClick = event => {
    let value = event.target.textContent;

    if (/\d/.test(value) && this.state.operator === '') {
      this.setState(prevState => ({
        firstNum: prevState.firstNum + value
      }));
    } else if (!/\d/.test(value) && this.state.firstNum.length > 0) {
      this.setState({
        operator: value
      });
    } else if (/\d/.test(value)) {
      this.setState(prevState => ({
        secondNum: prevState.secondNum + value
      }));
    }
  }

  calculateResults = () => {
    if (this.state.secondNum.length > 0) {
      const firstNumber = Number.parseInt(this.state.firstNum, 10),
            secondNumber = Number.parseInt(this.state.secondNum, 10);

      switch(this.state.operator) {
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
  }

  handleDelete = () => {
    if (this.state.secondNum.length > 0) {
      this.setState(prevState => ({
        secondNum: prevState.secondNum.slice(0, -1)
      }));
    } else if (this.state.operator.length > 0) {
      this.setState({
        operator: ''
      });
    } else if (this.state.firstNum.length > 0) {
      this.setState(prevState => ({
        firstNum: prevState.firstNum.slice(0, -1)
      }));
    }
  }

  display = () => {
  }

  render() {
    let keypad = this.state.buttons.map(button => {
          return <CalcButton key={button} value={button} onClick={this.handleClick}></CalcButton>;
        });

    return (
      <div>
        <div>
          <h4>Display</h4>
          <div className="Display">
            {this.state.firstNum + this.state.operator + this.state.secondNum}
          </div>
          <div className="Results">
            {this.calculateResults()}
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

export default Calculator;
