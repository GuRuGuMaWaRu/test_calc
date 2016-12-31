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
      // input: [],
      // currentInput: [],
      // newInput: [['125'],['+'],['456']],
      // newInput2: [],
      // newInput3: '',
      // firstNumber: '',
      // operator: '',
      // secondNumber: '',
      buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+']
    };
  }


  handleClick = event => {
    let value = event.target.textContent;

    if (this.state.operator === '') {
      this.setState(prevState => ({
        firstNum: prevState.firstNum + value
      }));
    }
    // let currentInput = this.state.newInput2.length > 0 ? this.state.newInput.pop() : [];
    //
    // if (this.state.newInput2.length > 0) {
    //   currentInput = this.state.newInput2.pop();
    // }
    //
    // this.setState(prevState => ({
    //   newInput3: prevState.newInput3 + value
    // }));

    // testing new ways!!! ///////////////////////////////
    // let newInput = this.state.newInput;
    // let dump = [];
    //
    // if (newInput.length !== 0) {
    //   dump = newInput.splice(-1, 1);
    //   dump += value;
    //   newInput = newInput.concat(dump);
    //   console.log(newInput);
    // }
    ///////////////////////////////////////////////////////

    // if (/\d/.test(value) || this.state.input.length > 0) {
    //   this.setState(prevState => ({
    //     input: prevState.input.concat(value)
    //   }));
    // }
  }

  handleDelete = () => {
    // let prevInput = this.state.input,
    //     len = prevInput.length - 1;
    //
    // function filter(item, index) {
    //   return index !== len;
    // }
    //
    // this.setState({
    //   input: prevInput.filter(filter)
    // });
  }

  display = () => {
    // let input = this.state.input,
    //     display = '',
    //     tmpDisplay = '';
    //
    // function addNumber(finalNum, tmpNum) {
    //   tmpNum = Number.parseInt(tmpNum, 10);
    //   return finalNum += tmpNum.toLocaleString();
    // }
    //
    // for (let i = 0, len = input.length; i < len; i++) {
    //   if (/\d/.test(input[i])) {
    //     tmpDisplay += input[i];
    //   } else {
    //     display = addNumber(display, tmpDisplay);
    //     display += input[i];
    //     tmpDisplay = '';
    //   }
    // }
    //
    // if (/\d/.test(tmpDisplay)) {
    //   display = addNumber(display, tmpDisplay);
    // }
    //
    // return display;
  }

  render() {
    let keypad = this.state.buttons.map(button => {
          return <CalcButton key={button} value={button} onClick={this.handleClick}></CalcButton>;
        });

    // let result = '';
    // let resultTmp = '';
    // let tmp = +;
    //
    // for (let i = 0, len = this.state.newInput3; i < len; i++) {
    //   if (/\d/.test(this.state.newInput3[i])) {
    //     resultTmp += this.state.newInput3[i];
    //   } else {
    //     result += (Number.parseInt(resultTmp, 10)).toLocaleString();
    //     resultTmp = '';
    //   }
    // }

    return (
      <div>
        <div>
          <h4>Display</h4>
          <div className="Display">
            {/* {this.display()} */}
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
