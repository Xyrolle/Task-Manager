import React from 'react';
import { screen } from '@testing-library/react';

import Header from './Header';
import { render } from '../../tests/index';

it('should not crash on mount', () => {
    render(<Header />);
    expect(screen.getByTestId('mainHeader')).toBeInTheDocument();
});

it('should have navigation', () => {
    render(<Header />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
});

it('has two buttons', () => {
    render(<Header />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
});

it('has logo', () => {
    render(<Header />);
    expect(screen.getByRole('img', { name: 'logo' })).toBeInTheDocument();
});

it('has logo', () => {
    render(<Header />);
    expect(screen.getByRole('img', { name: 'logo' })).toBeInTheDocument();
});

it('has bell img', () => {
    render(<Header />);
    expect(screen.getByAltText(/bell/i)).toBeInTheDocument();
});

