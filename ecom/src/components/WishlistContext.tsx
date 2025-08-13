'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
}

interface WishlistState {
  items: WishlistItem[];
  itemCount: number;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistState };

interface WishlistContextType {
  state: WishlistState;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return state; // Item already exists, don't add again
      } else {
        const updatedItems = [...state.items, action.payload];
        return { 
          items: updatedItems, 
          itemCount: updatedItems.length 
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return { 
        items: updatedItems, 
        itemCount: updatedItems.length 
      };
    }
    
    case 'CLEAR_WISHLIST':
      return { items: [], itemCount: 0 };
    
    case 'LOAD_WISHLIST':
      return action.payload;
    
    default:
      return state;
  }
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0
  });
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load wishlist from localStorage on mount (only on client)
  useEffect(() => {
    if (!isMounted) return;
    
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistData = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: wishlistData });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, [isMounted]);

  // Save wishlist to localStorage whenever it changes (only on client)
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('wishlist', JSON.stringify(state));
  }, [state, isMounted]);

  const addToWishlist = (item: WishlistItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromWishlist = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id: number) => {
    if (!isMounted || !state.items) return false;
    return state.items.some(item => item.id === id);
  };

  const value: WishlistContextType = {
    state,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 