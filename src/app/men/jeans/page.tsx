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

interface Jeans {
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
  fit: string;
  isNew?: boolean;
  isSale?: boolean;
  isHot?: boolean;
}

const JeansPage = () => {
  useEffect(() => {
    console.log('=== JeansPage Component Mounted ===');
  }, []);

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  const handleAddToCart = (jean: Jeans) => {
    try {
      addToCart({
        id: jean.id,
        name: jean.name,
        price: jean.price,
        originalPrice: jean.originalPrice,
        image: jean.image,
        category: jean.category,
        subcategory: 'Jeans'
      });
      
      setAddedToCart(prev => [...prev, jean.id]);
      
      // Reset the added state after 2 seconds
      setTimeout(() => {
        setAddedToCart(prev => prev.filter(id => id !== jean.id));
      }, 2000);
    } catch (error) {
      console.error('Error adding jeans to cart:', error);
    }
  };

  const jeans: Jeans[] = [
    {
      id: 1,
      name: "Classic Straight Leg Jeans",
      price: 89.99,
      originalPrice: 119.99,
      image: "/images/mje/a.jpg",
      rating: 4.8,
      reviews: 156,
      colors: ['Blue', 'Black', 'Gray', 'Light Blue'],
      sizes: ['30', '32', '34', '36', '38'],
      category: "Classic",
      fit: "Straight",
      isSale: true
    },
    {
      id: 2,
      name: "Slim Fit Premium Denim",
      price: 129.99,
      image: "/images/mje/d.webp",
      rating: 4.9,
      reviews: 89,
      colors: ['Dark Blue', 'Black', 'Gray'],
      sizes: ['30', '32', '34', '36'],
      category: "Premium",
      fit: "Slim",
      isNew: true
    },
    {
      id: 3,
      name: "Relaxed Fit Comfort Jeans",
      price: 79.99,
      image: "/images/mje/d.webp",
      rating: 4.7,
      reviews: 203,
      colors: ['Gray', 'Blue', 'Black'],
      sizes: ['32', '34', '36', '38', '40'],
      category: "Comfort",
      fit: "Relaxed"
    },
    {
      id: 4,
      name: "Skinny Fit Stretch Denim",
      price: 99.99,
      originalPrice: 129.99,
      image: "/images/mje/f.jpg",
      rating: 4.6,
      reviews: 178,
      colors: ['Black', 'Dark Blue', 'Gray'],
      sizes: ['28', '30', '32', '34'],
      category: "Modern",
      fit: "Skinny",
      isSale: true
    },
    {
      id: 5,
      name: "Bootcut Vintage Collection",
      price: 149.99,
      image: "/images/mje/s.webp",
      rating: 4.8,
      reviews: 95,
      colors: ['Brown', 'Blue', 'Gray'],
      sizes: ['32', '34', '36', '38'],
      category: "Vintage",
      fit: "Bootcut",
      isHot: true
    },
    {
      id: 6,
      name: "Wide Leg Trendy Jeans",
      price: 119.99,
      image: "/images/mje/h.webp",
      rating: 4.9,
      reviews: 67,
      colors: ['Purple', 'Black', 'Blue'],
      sizes: ['30', '32', '34', '36'],
      category: "Trendy",
      fit: "Wide",
      isNew: true
    }
  ];

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
            Men&apos;s Jeans
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our premium collection of comfortable, stylish, and high-quality jeans for every occasion.
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
                  ? 'bg-blue-600 text-white shadow-lg' 
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
                  ? 'bg-blue-600 text-white shadow-lg' 
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
            className="px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    {['Blue', 'Black', 'Gray', 'Light Blue', 'Dark Blue', 'Brown', 'Purple'].map((color) => (
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
                    {['28', '30', '32', '34', '36', '38', '40'].map((size) => (
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

                {/* Fit Types */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Fit Types</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {['Straight', 'Slim', 'Relaxed', 'Skinny', 'Bootcut', 'Wide'].map((fit) => (
                      <label key={fit} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedFits.includes(fit)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFits([...selectedFits, fit]);
                            } else {
                              setSelectedFits(selectedFits.filter(f => f !== fit));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{fit}</span>
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
          {jeans.map((jean, index) => (
            <motion.div
              key={jean.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredProduct(jean.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Product Image */}
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/3 h-64' : 'aspect-[4/5]'}`}>
                <motion.img
                  src={jean.image}
                  alt={jean.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Overlay with quick actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProduct === jean.id ? 1 : 0 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-4"
                >
                  <AddToCartButton product={jean} variant="icon" className="w-12 h-12" />
                </motion.div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {jean.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      NEW
                    </motion.div>
                  )}
                  {jean.isSale && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      SALE
                    </motion.div>
                  )}
                  {jean.isHot && (
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
                    {jean.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {jean.rating} ({jean.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {jean.name}
                </h3>

                {/* Fit Type */}
                <div className="mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Fit: </span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {jean.fit}
                  </span>
                </div>

                {/* Colors and Sizes */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Colors:</span>
                    <div className="flex space-x-1">
                      {jean.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      ))}
                      {jean.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{jean.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Sizes:</span>
                    <div className="flex space-x-1">
                      {jean.sizes.map((size) => (
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
                      ${jean.price}
                    </span>
                    {jean.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${jean.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <AddToCartButton product={jean} />
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(jean)}
                    className={`w-full py-3 px-4 rounded cursor-pointer font-semibold ${
                      addedToCart.includes(jean.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>
                        {addedToCart.includes(jean.id) ? 'Added to Cart!' : 'Add to Cart'}
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Floating effect - TEMPORARILY DISABLED */}
              {/* <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: `${index * 0.2}s` }}
                className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
              /> */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default JeansPage; 