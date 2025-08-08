'use client';

import { ShoppingCart, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from './CartContext';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
}

interface ProductActionButtonsProps {
  product: Product;
  className?: string;
}

const ProductActionButtons = ({ product, className = "" }: ProductActionButtonsProps) => {
  const { addToCart, isInCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <div className={`flex items-center justify-center space-x-4 ${className}`}>
        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${
            isInCart(product.id)
              ? 'bg-green-500 text-white'
              : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.3 }}
          className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <Check className="w-5 h-5" />
          <span className="font-medium">Successfully added to cart!</span>
        </motion.div>
      )}
    </>
  );
};

export default ProductActionButtons; 