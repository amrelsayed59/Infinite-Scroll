import { render, screen } from '@testing-library/react';
import Jobs from './index';

test('render a contentinfo', () => {
  render(<Jobs />);
  const divElement = screen.getByRole('contentinfo');
  expect(divElement).toHaveTextContent('All Jobs');
});
