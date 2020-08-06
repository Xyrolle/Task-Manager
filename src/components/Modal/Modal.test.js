import React from 'react';
import {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import Modal from './Modal';
import { render } from '../../tests/index';

it('should not crash on mount', () => {
  render(<Modal />);
  expect(screen.getByRole('form')).toBeInTheDocument();
});

it('should have h3', () => {
  render(<Modal />);
  expect(screen.getByRole('heading')).toBeInTheDocument();
});

it('check for input', () => {
  render(<Modal />);
  expect(
    screen.getByRole('textbox', {
      name: /Start collaborating today by adding your team/i,
    })
  ).toBeInTheDocument();
});

it('check for select', () => {
  render(<Modal />);
  expect(
    screen.getByRole('combobox', { name: /Add to a project/i })
  ).toBeInTheDocument();
});

it('check for buttons', () => {
  render(<Modal />);
  expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /invite/i })).toBeInTheDocument();
});

it('has two buttons', () => {
  render(<Modal />);
  expect(screen.getAllByRole('button')).toHaveLength(2);
});
