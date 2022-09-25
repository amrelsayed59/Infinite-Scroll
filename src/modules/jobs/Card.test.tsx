import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import Card from './Card';

const data = {
  id: '9b92abe6-3bf3-4cc6-8744-4de0c8af0630',
  type: 'job',
  attributes: {
    title: 'Engineering Manager',
  },
  relationships: {
    skills: [
      {
        id: 'f4a6f053-2cac-44fc-a87a-5368d7ca46ed',
      },
      {
        id: '9f0a0811-4a8e-4c8a-b4ce-adc9267b1cf3',
      },
      {
        id: 'e255b986-fca7-4b1c-ba4e-b16497da4477',
      },
    ],
  },
};

let container: any;
beforeEach(async () => {
  container = document.createElement('div');
  document.body.appendChild(container);
  render(
    <Router>
      <Provider store={store}>
        <Card item={data} />
      </Provider>
    </Router>,
    container
  );
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('expect a card component to have a related skills', () => {
  const divElement = screen.getByText(/Related Skills/i);
  expect(divElement).toBeVisible();
});
