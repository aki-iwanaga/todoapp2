import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom/extend-expect";


it('renders learn react link', () => {
  render(<App />);
  expect(screen.getByText('TodoApp チュートリアル')).toBeInTheDocument();
});
