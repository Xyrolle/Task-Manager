import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AppProvider } from '../context/AppContext';


const AllTheProviders = ({ children }) => {
    return (
        <AppProvider>
            {children}
        </AppProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };