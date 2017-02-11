import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import Main from '../components/Main';
import CalcButton from '../components/CalcButton';

describe('Main', () => {
  let state;
  let mountedMain;
  const main = () => {
    if (!mountedMain) {
      mountedMain = mount(
        <Main {...state} />
      );
    }
    return mountedMain;
  }

  beforeEach(() => {
    state = {
      input: '',
      buttons: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '()', '+/-'],
      result: '',
      message: ''
    };
    mountedMain = undefined;
  });

  // it('shows max number of chars reached message', () => {
  //   const component = shallow(<Main />);
  //
  //   state.input = '123456789123456',
  //   main.instance().handleClick('1');
  //   expect(state.message).toBe('Maximum number of characters reached: 15');
  // });
  it('always renders 17 CalcButton components', () => {
    expect(main().find(CalcButton).length).toBe(17);
  });

  describe('CalcButton', () => {
    it('receives 2 props', () => {
      const calcButton = main().find(CalcButton).first();
      expect(Object.keys(calcButton.props()).length).toBe(2);
    });
  });
});
