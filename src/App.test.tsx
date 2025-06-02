import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Username input and Search button', () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/username/i);
  expect(inputElement).toBeInTheDocument();

  const buttonElement = screen.getByRole('button', { name: /search/i });
  expect(buttonElement).toBeInTheDocument();
});
