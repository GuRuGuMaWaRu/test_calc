import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  render() {
    return (
      <div>
        <div>
          <h4>Display</h4>
          <div className="Display">

          </div>
        </div>
        <div>
          <h4>History</h4>
        </div>
        <div>
          <h4>Buttons</h4>
          <div>
            <button>C</button>
            <button>()</button>
            <button>%</button>
            <button>/</button>
          </div>
          <div>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>x</button>
          </div>
          <div>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>-</button>
          </div>
          <div>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>+</button>
          </div>
          <div>
            <button>.</button>
            <button>0</button>
            <button>+/-</button>
            <button>=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
