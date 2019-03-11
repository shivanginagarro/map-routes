import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Navigation from './Navigation';

/**
 * @description:
 * use of automatic mock function where react dom is being mocked that returns a spy that helps to test whther it has been called with correct properties.
 */
jest.mock('react-dom');

describe('Application:Navigation', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navigation />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(render).toHaveBeenCalledWith(<Navigation />,div);
    expect(render).toHaveBeenCalledTimes(1);
  })
})
