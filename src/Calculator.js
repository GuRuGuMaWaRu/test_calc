import React, { Component } from 'react';
import CalcButton from './CalcButton';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }

  handleClick = (event) => {
    let value = event.target.textContent;

    this.concatenation(value);
  }

  concatenation = (value) => {
    // let input = this.state.input;

    this.setState((prevState, props) => ({
      input: prevState.input.concat(value)
    }));

    console.log(this.state.input);

    // this.setState((prevState, props) => ({
    //   input: input.push(value)
    // }));
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
            {this.state.input}
          </div>
        </div>
        <div>
          <h4>History</h4>
        </div>
        <div>
          <h4>Buttons</h4>
          <div>
            {keypad}
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
