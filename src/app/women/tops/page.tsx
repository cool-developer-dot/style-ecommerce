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

interface Top {
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

const TopsPage = () => {
  useEffect(() => {
  }, []);

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  // Sorting logic
  const sortProducts = (products: Top[], sortBy: string) => {
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
          const getPriority = (item: Top) => {
            if (item.isHot) return 4;
            if (item.isNew) return 3;
            if (item.isSale) return 2;
            return 1;
          };
          return getPriority(b) - getPriority(a);
        });
    }
  };

  const tops: Top[] = [
    {
      id: 1,
      name: "Silk Blouse",
      price: 89.99,
      originalPrice: 119.99,
      image: "/images/wt/f.webp",
      rating: 4.8,
      reviews: 156,
      colors: ['White', 'Black', 'Pink', 'Blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: "Blouse",
      style: "Silk",
      isSale: true
    },
    {
      id: 2,
      name: "Crop Top",
      price: 39.99,
      image: "/images/wt/g.jpg",
      rating: 4.6,
      reviews: 234,
      colors: ['White', 'Black', 'Yellow', 'Pink'],
      sizes: ['XS', 'S', 'M', 'L'],
      category: "Crop",
      style: "Casual",
      isNew: true
    },
    {
      id: 3,
      name: "Tank Top",
      price: 29.99,
      image: "/images/wt/h.webp",
      rating: 4.7,
      reviews: 189,
      colors: ['White', 'Black', 'Gray', 'Navy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: "Tank",
      style: "Basic",
      isHot: true
    },
    {
      id: 4,
      name: "Off-Shoulder Top",
      price: 59.99,
      originalPrice: 79.99,
      image: "/images/wt/j.webp",
      rating: 4.5,
      reviews: 123,
      colors: ['White', 'Black', 'Red', 'Blue'],
      sizes: ['XS', 'S', 'M', 'L'],
      category: "Off-Shoulder",
      style: "Fashion",
      isSale: true
    },
    {
      id: 5,
      name: "T-Shirt",
      price: 24.99,
      image: "/images/wt/k.webp",
      rating: 4.4,
      reviews: 98,
      colors: ['White', 'Black', 'Gray', 'Navy', 'Pink'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: "T-Shirt",
      style: "Basic",
      isNew: true
    },
    {
      id: 6,
      name: "Peplum Top",
      price: 69.99,
      image: "/images/wt/l.jpg",
      rating: 4.9,
      reviews: 267,
      colors: ['Black', 'White', 'Red', 'Blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: "Peplum",
      style: "Fashion",
      isHot: true
    }
  ];

  const handleAddToCart = (top: Top) => {
    try {
      addToCart({
        id: top.id,
        name: top.name,
        price: top.price,
        originalPrice: top.originalPrice,
        image: top.image,
        category: top.category,
        subcategory: 'Tops'
      });
      
      setAddedToCart(prev => [...prev, top.id]);
      
      // Reset the added state after 2 seconds
      setTimeout(() => {
        setAddedToCart(prev => prev.filter(id => id !== top.id));
      }, 2000);
    } catch (error) {
      console.error('Error adding top to cart:', error);
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = sortProducts(
    tops.filter(top => {
      const matchesPrice = top.price >= priceRange[0] && top.price <= priceRange[1];
      const matchesColor = selectedColors.length === 0 || top.colors.some(color => selectedColors.includes(color));
      const matchesSize = selectedSizes.length === 0 || top.sizes.some(size => selectedSizes.includes(size));
      const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(top.style);

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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Women&apos;s Tops
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our stylish collection of comfortable, trendy, and versatile tops for every occasion.
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
                  ? 'bg-rose-600 text-white shadow-lg' 
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
                  ? 'bg-rose-600 text-white shadow-lg' 
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
            className="px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                      max="150"
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
                    {['White', 'Black', 'Pink', 'Blue', 'Red', 'Gray', 'Navy', 'Yellow', 'Green', 'Purple'].map((color) => (
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

                {/* Top Styles */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Top Styles</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {['Blouse', 'Crop', 'Tank', 'Off-Shoulder', 'T-Shirt', 'Peplum', 'Tunic', 'Camisole'].map((style) => (
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
          {filteredAndSortedProducts.map((top, index) => (
            <div
              key={top.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-1/3 h-64' : 'aspect-[4/5]'}`}>
                <motion.img
                  src={top.image}
                  alt={top.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Overlay with quick actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProduct === top.id ? 1 : 0 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </motion.div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {top.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      NEW
                    </motion.div>
                  )}
                  {top.isSale && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      SALE
                    </motion.div>
                  )}
                  {top.isHot && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      HOT
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {top.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {top.rating} ({top.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {top.name}
                </h3>

                {/* Top Style */}
                <div className="mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Style: </span>
                  <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                    {top.style}
                  </span>
                </div>

                {/* Colors and Sizes */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Colors:</span>
                    <div className="flex space-x-1">
                      {top.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      ))}
                      {top.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{top.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Sizes:</span>
                    <div className="flex space-x-1">
                      {top.sizes.map((size) => (
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
                      ${top.price}
                    </span>
                    {top.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${top.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <AddToCartButton product={top} />
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4 relative z-50">
                  <button
                    onClick={() => handleAddToCart(top)}
                    className={`w-full py-3 px-4 rounded cursor-pointer font-semibold ${
                      addedToCart.includes(top.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-rose-600 text-white hover:bg-rose-700'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>
                        {addedToCart.includes(top.id) ? 'Added to Cart!' : 'Add to Cart'}
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Floating effect - disabled to prevent interference */}
              {/* <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: `${index * 0.2}s`, zIndex: -1 }}
                className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
              /> */}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopsPage; 