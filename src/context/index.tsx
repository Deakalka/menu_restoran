import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { CartProvider } from './CartContext';
import { DishProvider } from './DishContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <DishProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </DishProvider>
    </ThemeProvider>
  );
}; 