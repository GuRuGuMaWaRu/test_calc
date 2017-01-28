import React, { Component } from 'react';
import CalcButton from './CalcButton';
import parseInput from '../utils/parsers';
import '../styles/Main.css';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      buttons: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '()']
    };
  }

  handleClick = (value) => {
    this.setState({
      input: parseInput(this.state.input + value)
    });
  }

  handleDelete = () => {
    console.log('delete')
  }

  render() {
    const keypad = this.state.buttons.map(button => {//=== create calculator keypad
          return <CalcButton key={button} value={button} onClick={this.handleClick}></CalcButton>;
        });

    return (
      <div>
        <div>
          <h4>Display</h4>
          <div className="Display">
            {this.state.input}
          </div>
          <div className="Result">
            {/* {this.state.result} */}
          </div>
          <div className="Message">
            {/* {this.state.message} */}
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
};
