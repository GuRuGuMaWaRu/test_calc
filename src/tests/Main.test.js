import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

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

  it('always renders 17 keys', () => {
    expect(main().find(CalcButton).length).toBe(17);
  });
});
