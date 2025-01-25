import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../utils/localStorageCart';

// Context erstellen
const CartContext = createContext();

// Initialer State
const initialState = {
  cart: [],
};

// Reducer-Funktion
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.cart.find((item) => item.id === action.payload.id);
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case 'LOAD_CART':
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

// Provider-Komponente
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Warenkorb beim Laden aus dem LocalStorage holen
  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);

  // Warenkorb im LocalStorage speichern, wenn er sich ändert
  useEffect(() => {
    saveCartToLocalStorage(state.cart);
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook für den einfachen Zugriff auf den Context
export const useCart = () => useContext(CartContext);