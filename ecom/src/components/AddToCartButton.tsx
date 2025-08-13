'use client';

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
}

interface AddToCartButtonProps {
  product: Product;
  variant?: 'icon' | 'button';
  className?: string;
}

const AddToCartButton = ({ product, variant = 'button', className = '' }: AddToCartButtonProps) => {
  const { addToCart, isInCart } = useCart();
  const [isInCartState, setIsInCartState] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check cart status safely
  const checkCartStatus = useCallback(() => {
    if (!isMounted) return;
    
    try {
      const inCart = isInCart(product.id);
      setIsInCartState(inCart);
    } catch (error) {
      console.error('Error checking cart status:', error);
      setIsInCartState(false);
    } finally {
      setIsLoading(false);
    }
  }, [isMounted, isInCart, product.id]);

  // Check cart status when component mounts or dependencies change
  useEffect(() => {
    checkCartStatus();
  }, [checkCartStatus]);

  const handleAddToCart = () => {
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        subcategory: product.subcategory
      });
      setIsInCartState(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Show loading state while checking cart status
  if (!isMounted || isLoading) {
    return (
      <div className={`${variant === 'icon' ? 'w-12 h-12' : 'px-4 py-2'} bg-gray-300 rounded-lg animate-pulse`}>
        <div className="w-5 h-5 bg-gray-400 rounded"></div>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddToCart}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${
          isInCartState ? 'bg-green-600' : 'bg-blue-600'
        } ${className}`}
        disabled={isLoading}
      >
        <ShoppingCart className="w-5 h-5 text-white" />
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
      className={`px-4 py-2 text-white rounded-lg transition-colors ${
        isInCartState 
          ? 'bg-green-600 hover:bg-green-700' 
          : 'bg-blue-600 hover:bg-blue-700'
      } ${className}`}
      disabled={isLoading}
    >
      <ShoppingCart className="w-5 h-5" />
    </motion.button>
  );
};

export default AddToCartButton; 