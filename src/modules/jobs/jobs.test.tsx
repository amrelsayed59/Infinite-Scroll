import { render, screen } from '@testing-library/react';
import Jobs from './index';
import { Provider } from 'react-redux';
import { store } from '../../redux/index';
import { BrowserRouter as Router } from 'react-router-dom';


test('render a contentinfo', () => {
  render(
    <Router>
    <Provider store={store}>
      <Jobs />
    </Provider>
    </Router>
  );
  const divElement = screen.getByRole('contentinfo');
  expect(divElement).toHaveTextContent('All Jobs');
});
