import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {TestIds} from "./tests/TestIds";

test('renders learn react link', () => {
  render(<App />);
  expect(screen.getByTestId(TestIds.TODO_PAGE)).toBeInTheDocument();
});
