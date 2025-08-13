'use client';

import React, { createContext, useContext, useReducer, useEffect, useState, useCallback, useMemo } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string;
  subcategory?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  getItemQuantity: (id: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { ...state, items: updatedItems, total, itemCount };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { ...state, items: updatedItems, total, itemCount };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: updatedItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: updatedItems, total, itemCount };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    
    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  // Memoize the safe state to prevent unnecessary re-renders
  const safeState = useMemo(() => ({
    items: Array.isArray(state.items) ? state.items : [],
    total: state.total || 0,
    itemCount: state.itemCount || 0
  }), [state.items, state.total, state.itemCount]);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load cart from localStorage on mount (only on client)
  useEffect(() => {
    if (!isMounted) return;
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        // Ensure the loaded data has the correct structure
        const safeCartData = {
          items: Array.isArray(cartData.items) ? cartData.items : [],
          total: cartData.total || 0,
          itemCount: cartData.itemCount || 0
        };
        dispatch({ type: 'LOAD_CART', payload: safeCartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, [isMounted]);

  // Save cart to localStorage whenever it changes (only on client)
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('cart', JSON.stringify(safeState));
  }, [safeState, isMounted]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback((id: number) => {
    // Multiple safety checks
    if (!isMounted) return false;
    if (!safeState || !safeState.items) return false;
    if (!Array.isArray(safeState.items)) return false;
    
    try {
      return safeState.items.some(item => item && item.id === id);
    } catch (error) {
      console.error('Error in isInCart:', error);
      return false;
    }
  }, [isMounted, safeState]);

  const getItemQuantity = useCallback((id: number) => {
    if (!safeState || !safeState.items || !Array.isArray(safeState.items)) return 0;
    
    try {
      const item = safeState.items.find(item => item && item.id === id);
      return item ? item.quantity : 0;
    } catch (error) {
      console.error('Error in getItemQuantity:', error);
      return 0;
    }
  }, [safeState]);

  const value = useMemo(() => ({
    state: safeState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  }), [safeState, addToCart, removeFromCart, updateQuantity, clearCart, isInCart, getItemQuantity]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 