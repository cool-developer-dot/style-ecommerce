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
import ProductActionButtons from '../../../components/ProductActionButtons';
import { useCart } from '../../../components/CartContext';

interface TShirt {
  type?: string;
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
  isNew?: boolean;
  isSale?: boolean;
  isHot?: boolean;
  style?: string;
}

const TShirtsPage = () => {
  useEffect(() => {
    console.log('=== TShirtsPage Component Mounted ===');
  }, []);

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  const handleAddToCart = (tshirt: TShirt) => {
    addToCart(tshirt);
    setAddedToCart(prev => [...prev, tshirt.id]);
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== tshirt.id));
    }, 2000);
  };

  // Sorting logic
  const sortProducts = (products: TShirt[], sortBy: string) => {
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
          // Featured order: Hot items first, then New, then Sale, then regular
          const getPriority = (item: TShirt) => {
            if (item.isHot) return 4;
            if (item.isNew) return 3;
            if (item.isSale) return 2;
            return 1;
          };
          return getPriority(b) - getPriority(a);
        });
    }
  };

  const tshirts: TShirt[] = [
    {
      id: 1,
      name: "Premium Cotton Classic T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "/images/mts/a.webp",
      rating: 4.8,
      reviews: 124,
      colors: ['White', 'Black', 'Navy', 'Gray'],
      sizes: ['S', 'M', 'L', 'XL'],
      category: "Classic",
      isSale: true
    },
    {
      id: 2,
      name: "Graphic Print Street Style",
      price: 34.99,
      image: "/images/mts/q.jpg",
      rating: 4.9,
      reviews: 89,
      colors: ['Yellow', 'Black', 'White'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      category: "Graphic",
      isNew: true
    },
    {
      id: 3,
      name: "Slim Fit Premium Tee",
      price: 39.99,
      image: "/images/mts/s.webp",
      rating: 4.9,
      reviews: 89,
      colors: ['Yellow', 'Black', 'White'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      category: "Graphic",
      isNew: true
    },
    {
      id: 4,
      name: "Modern t-shirt",
      price: 39.99,
      image: "/images/mts/w.webp",
      rating: 4.9,
      reviews: 89,
      colors: ['Yellow', 'Black', 'White'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      category: "Graphic",
      isNew: true
    },
    {
      id: 5,
      name: "Asthetic t-shirt",
      price: 39.99,
      image: "/images/mts/x.webp",
      rating: 4.9,
      reviews: 89,
      colors: ['Yellow', 'Black', 'White'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      category: "Graphic",
      isNew: true
    },
    {
      id: 6,
      name: "Revolving t-shirt",
      price: 39.99,
      image: "/images/mts/z.jpg",
      rating: 4.9,
      reviews: 89,
      colors: ['Yellow', 'Black', 'White'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      category: "Graphic",
      isNew: true
    },

  ];

  // Filter and sort products
  const filteredAndSortedProducts = sortProducts(
    tshirts.filter(tshirt => {
      const matchesPrice = tshirt.price >= priceRange[0] && tshirt.price <= priceRange[1];
      const matchesColor = selectedColors.length === 0 || tshirt.colors.some(color => selectedColors.includes(color));
      const matchesSize = selectedSizes.length === 0 || tshirt.sizes.some(size => selectedSizes.includes(size));
      const matchesStyle = selectedStyles.length === 0 || (tshirt.style && selectedStyles.includes(tshirt.style));
      
      return matchesPrice && matchesColor && matchesSize && matchesStyle;
    }),
    sortBy
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };
    // All your state & logic will be same as ShoesPage but renamed variables if needed
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Men&apos;s T-Shirts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our premium collection of comfortable, stylish, and high-quality T-shirts for every occasion.
            </p>
          </motion.div>
  
          {/* Filters and Controls */}
          {/* Keep this section same except adjust sizes and types */}
  
          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Price Range */}
                  {/* Colors */}
  
                  {/* Sizes */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Sizes</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <label key={size} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSizes([...selectedSizes, size]);
                              } else {
                                setSelectedSizes(selectedSizes.filter(s => s !== size));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
  
                  {/* T-Shirt Types */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">T-Shirt Types</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {['Graphic', 'Plain', 'Polo', 'Henley', 'V-Neck'].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTypes([...selectedTypes, type]);
                              } else {
                                setSelectedTypes(selectedTypes.filter(t => t !== type));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
  
          {/* Products Grid */}
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
            {filteredAndSortedProducts.map((tshirt, index) => (
              <div
                key={tshirt.id}
                className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-1/3 h-64' : 'aspect-[4/5]'}`}>
                  <img
                    src={tshirt.image}
                    alt={tshirt.name}
                    className="w-full h-full object-cover"
                  />
  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {tshirt.isNew && (
                      <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        NEW
                      </div>
                    )}
                    {tshirt.isSale && (
                      <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        SALE
                      </div>
                    )}
                    {tshirt.isHot && (
                      <div className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        HOT
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Product Info */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {tshirt.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {tshirt.rating} ({tshirt.reviews})
                      </span>
                    </div>
                  </div>
  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tshirt.name}
                  </h3>
  
                  {/* T-Shirt Type */}
                  <div className="mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Type: </span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {tshirt.type}
                    </span>
                  </div>
  
                  {/* Colors and Sizes */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Colors:</span>
                      <div className="flex space-x-1">
                        {tshirt.colors.slice(0, 3).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                        ))}
                        {tshirt.colors.length > 3 && (
                          <span className="text-xs text-gray-500">+{tshirt.colors.length - 3}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Sizes:</span>
                      <div className="flex space-x-1">
                        {tshirt.sizes.map((size) => (
                          <span key={size} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${tshirt.price}
                      </span>
                      {tshirt.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${tshirt.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
  
                  {/* Add to Cart Button */}
                  <div className="mt-4">
                    <button
                      onClick={() => handleAddToCart(tshirt)}
                      className={`w-full py-3 px-4 rounded cursor-pointer font-semibold ${
                        addedToCart.includes(tshirt.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>
                          {addedToCart.includes(tshirt.id) ? 'Added to Cart!' : 'Add to Cart'}
                        </span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default TShirtsPage;
  
