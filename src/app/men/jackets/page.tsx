'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Star, 
  Filter, 
  Grid, 
  List,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Header from '../../../components/Header';
import AddToCartButton from '../../../components/AddToCartButton';
import { useCart } from '../../../components/CartContext';

interface Jacket {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  category: string;
  style: string;
  isNew?: boolean;
  isSale?: boolean;
  isHot?: boolean;
}

const JacketsPage = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    console.log('=== JacketsPage Component Mounted ===');
  }, []);

  const sortProducts = (products: Jacket[], sortBy: string) => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case 'price-low':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sortedProducts.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
      case 'featured':
      default:
        return sortedProducts.sort((a, b) => {
          const getPriority = (item: Jacket) => {
            if (item.isHot) return 4;
            if (item.isNew) return 3;
            if (item.isSale) return 2;
            return 1;
          };
          return getPriority(b) - getPriority(a);
        });
    }
  };

  const jackets: Jacket[] = [
    {
      id: 1,
      name: 'Classic Denim Jacket',
      price: 89.99,
      originalPrice: 119.99,
      image: '/images/mj/x.webp', 
      rating: 4.8,
      reviews: 189,
      colors: ['Blue', 'Black', 'Gray', 'Light Blue'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      category: 'Casual',
      style: 'Denim',
      isSale: true
    },
    
    {
      id: 2,
      name: 'Premium Leather Biker Jacket',
      price: 299.99,
      image: '/images/mj/c.webp',
      rating: 4.9,
      reviews: 145,
      colors: ['Black', 'Brown', 'Tan'],
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'Premium',
      style: 'Biker',
      isNew: true
    },
    {
      id: 3,
      name: 'Urban Windbreaker Jacket',
      price: 129.99,
      originalPrice: 159.99,
      image: '/images/mj/v.webp',
      rating: 4.5,
      reviews: 77,
      colors: ['Olive', 'Navy', 'White'],
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'Urban',
      style: 'Windbreaker',
      isSale: true
    },
    {
      id: 4,
      name: 'Heavy Duty Parka Jacket',
      price: 179.99,
      originalPrice: 219.99,
      image: '/images/mj/b.webp',
      rating: 4.7,
      reviews: 112,
      colors: ['Green', 'Black', 'Gray'],
      sizes: ['M', 'L', 'XL', 'XXL'],
      category: 'Winter',
      style: 'Parka',
      isHot: true
    },
    {
      id: 5,
      name: 'Quilted Bomber Jacket',
      price: 109.99,
      originalPrice: 139.99,
      image: '/images/mj/n.webp',
      rating: 4.4,
      reviews: 63,
      colors: ['Black', 'Maroon', 'Khaki'],
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'Casual',
      style: 'Bomber',
      isSale: true
    },
    {
      id: 6,
      name: 'Tech Fleece Running Jacket',
      price: 119.99,
      originalPrice: 139.99,
      image: '/images/mj/m.webp',
      rating: 4.3,
      reviews: 54,
      colors: ['Charcoal', 'Blue', 'White'],
      sizes: ['S', 'M', 'L'],
      category: 'Sportswear',
      style: 'Fleece',
      isNew: true
    }
  ];

  const filteredAndSortedProducts = sortProducts(jackets.filter((jacket) => {
    const colorMatch = selectedColors.length === 0 || selectedColors.some(color => jacket.colors.includes(color));
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(size => jacket.sizes.includes(size));
    const styleMatch = selectedStyles.length === 0 || selectedStyles.includes(jacket.style);
    const priceMatch = jacket.price >= priceRange[0] && jacket.price <= priceRange[1];
    return colorMatch && sizeMatch && styleMatch && priceMatch;
  }), sortBy);

  const handleAddToCart = (jacket: Jacket) => {
    addToCart(jacket);
    setAddedToCart(prev => [...prev, jacket.id]);
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== jacket.id));
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Men&apos;s Jackets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Elevate your wardrobe with our collection of premium, stylish jackets for every season and occasion.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-8 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredAndSortedProducts.map((jacket) => (
            <motion.div
              key={jacket.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-1/3 h-64' : 'aspect-[4/5]'}`}>
                <img
                  src={jacket.image}
                  alt={jacket.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {jacket.isNew && (
                    <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  {jacket.isSale && (
                    <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                  {jacket.isHot && (
                    <div className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      HOT
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{jacket.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {jacket.rating} ({jacket.reviews})
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600">
                  {jacket.name}
                </h3>
                <div className="mb-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Style: </span>
                  <span className="text-blue-600 dark:text-blue-400">{jacket.style}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${jacket.price}
                    </span>
                    {jacket.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${jacket.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(jacket)}
                    className={`w-full py-3 px-4 rounded cursor-pointer font-semibold ${
                      addedToCart.includes(jacket.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>
                        {addedToCart.includes(jacket.id) ? 'Added to Cart!' : 'Add to Cart'}
                      </span>
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default JacketsPage;
