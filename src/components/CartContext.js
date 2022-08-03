import React from 'react';

export const CartContext = React.createContext();

export function useCartContext() {
  return React.useContext(CartContext);
};
