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

interface Dress {
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

const DressesPage = () => {
  useEffect(() => {
    console.log('=== DressesPage Component Mounted ===');
  }, []);

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  // Sorting logic
  const sortProducts = (products: Dress[], sortBy: string) => {
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
          const getPriority = (item: Dress) => {
            if (item.isHot) return 4;
            if (item.isNew) return 3;
            if (item.isSale) return 2;
            return 1;
          };
          return getPriority(b) - getPriority(a);
        });
    }
  };

  const dresses: Dress[] = [
    {
      id: 1,
      name: "Elegant Evening Gown",
      price: 189.99,
      originalPrice: 249.99,
      image: "/images/wd/i.webp",
      rating: 4.9,
      reviews: 156,
      colors: ['Black', 'Navy', 'Burgundy', 'Emerald'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: "Evening",
      style: "Gown",
      isSale: true
    },
    {
      id: 2,
      name: "Summer Floral Maxi Dress",
      price: 89.99,
      image: "/images/wd/p.jpg",
      rating: 4.7,
      reviews: 234,
      colors: ['White', 'Pink', 'Yellow', 'Blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: "Casual",
      style: "Maxi",
      isNew: true
    },
    {
      id: 3,
      name: "Cocktail Party Dress",
      price: 129.99,
      image: "/images/wd/r.jpg",
      rating: 4.8,
      reviews: 189,
      colors: ['Red', 'Black', 'Gold', 'Silver'],
      sizes: ['XS', 'S', 'M', 'L'],
      category: "Party",
      style: "Cocktail",
      isHot: true
    },
    {
      id: 4,
      name: "Office Professional Dress",
      price: 79.99,
      originalPrice: 99.99,
      image: "/images/wd/t.jpg",
      rating: 4.6,
      reviews: 145,
      colors: ['Navy', 'Gray', 'Black', 'Burgundy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: "Professional",
      style: "Office",
      isSale: true
    },
    {
      id: 5,
      name: "Beach Vacation Dress",
      price: 69.99,
      image: "/images/wd/u.jpg",
      rating: 4.5,
      reviews: 98,
      colors: ['White', 'Blue', 'Yellow', 'Pink'],
      sizes: ['XS', 'S', 'M', 'L'],
      category: "Vacation",
      style: "Beach",
      isNew: true
    },
    {
      id: 6,
      name: "Wedding Guest Dress",
      price: 149.99,
      image: "/images/wd/y.webp",
      rating: 4.9,
      reviews: 267,
      colors: ['Dusty Rose', 'Sage', 'Blush', 'Lavender'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: "Wedding",
      style: "Guest",
      isHot: true
    }
  ];

  const handleAddToCart = (dress: Dress) => {
    try {
      addToCart({
        id: dress.id,
        name: dress.name,
        price: dress.price,
        originalPrice: dress.originalPrice,
        image: dress.image,
        category: dress.category,
        subcategory: 'Dresses'
      });
      
      setAddedToCart(prev => [...prev, dress.id]);
      
      // Reset the added state after 2 seconds
      setTimeout(() => {
        setAddedToCart(prev => prev.filter(id => id !== dress.id));
      }, 2000);
    } catch (error) {
      console.error('Error adding dress to cart:', error);
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = sortProducts(
    dresses.filter(dress => {
      const matchesPrice = dress.price >= priceRange[0] && dress.price <= priceRange[1];
      const matchesColor = selectedColors.length === 0 || dress.colors.some(color => selectedColors.includes(color));
      const matchesSize = selectedSizes.length === 0 || dress.sizes.some(size => selectedSizes.includes(size));
      const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(dress.style);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Women&apos;s Dresses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our stunning collection of elegant, stylish, and comfortable dresses for every occasion.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4"
        >
          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </motion.button>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-pink-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Grid className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-pink-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </motion.div>

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
                <div>
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Colors</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Black', 'White', 'Red', 'Pink', 'Blue', 'Yellow', 'Green', 'Purple', 'Navy', 'Gray'].map((color) => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sizes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
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

                {/* Dress Styles */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Dress Styles</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {['Gown', 'Maxi', 'Cocktail', 'Office', 'Beach', 'Guest', 'Mini', 'Midi'].map((style) => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedStyles.includes(style)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStyles([...selectedStyles, style]);
                            } else {
                              setSelectedStyles(selectedStyles.filter(s => s !== style));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{style}</span>
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
          {filteredAndSortedProducts.map((dress, index) => (
            <div
              key={dress.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-1/3 h-64' : 'aspect-[4/5]'}`}>
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {dress.isNew && (
                    <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  {dress.isSale && (
                    <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                  {dress.isHot && (
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
                    {dress.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {dress.rating} ({dress.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {dress.name}
                </h3>

                {/* Dress Style */}
                <div className="mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Style: </span>
                  <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                    {dress.style}
                  </span>
                </div>

                {/* Colors and Sizes */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Colors:</span>
                    <div className="flex space-x-1">
                      {dress.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      ))}
                      {dress.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{dress.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Sizes:</span>
                    <div className="flex space-x-1">
                      {dress.sizes.map((size) => (
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
                      ${dress.price}
                    </span>
                    {dress.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${dress.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(dress)}
                    className={`w-full py-3 px-4 rounded cursor-pointer font-semibold ${
                      addedToCart.includes(dress.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-pink-600 text-white hover:bg-pink-700'
                    }`}
                    style={{
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                      touchAction: 'manipulation',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none',
                      position: 'relative',
                      zIndex: 1001
                    }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>
                        {addedToCart.includes(dress.id) ? 'Added to Cart!' : 'Add to Cart'}
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

export default DressesPage; 