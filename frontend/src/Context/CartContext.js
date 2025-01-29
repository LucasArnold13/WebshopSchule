import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../utils/localStorageCart';


const CartContext = createContext();


const initialState = {
  cart: getCartFromLocalStorage(),
};

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

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: Math.max(1, item.quantity + action.payload.amount) }
            : item
        ),
      };

    case 'LOAD_CART':
      return {
        ...state,
        cart: action.payload,
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};



export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // vom LocalStorage in Context laden
  // wird nur ausgeführt beim ersten rendern 
  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);

  // Warenkorb im LocalStorage speichern, wenn er sich ändert
  // wird ausgeführt wenn sich bei jeder änderung des carts
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