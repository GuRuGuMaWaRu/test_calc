import React, { Component } from 'react';
import CalcButton from './CalcButton';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      firstNum: '',
      operator: '',
      secondNum: '',
      result: '',
      buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/']
    };
  }


  handleClick = value => {
    let input = this.state.input;

    //======== getting rid of a leading zero
    // if (container.length === 1 && container[0] === '0' && /\d/.test(value)) {
    //   container[0] = value;
    // } else if (!/\d/.test(value) && this.state.input.length > 0) {
    //   container = [value];
    // }
    if (/\d/.test(value)) {
      let container = input.length > 0 ? input.pop() : [];
      input.push(['12']);

      this.setState({
        input: input
      });
    } else if (!/\d/.test(value) && this.state.input.length > 0) {
      // container = container.concat(value);
    }


    // let value = event.target.textContent;

    // this.setState(prevState => ({
    //   input: prevState.input + value
    // }));

    // this.parseInput();
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
    let keypad = this.state.buttons.map(button => {
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

export default Calculator;
