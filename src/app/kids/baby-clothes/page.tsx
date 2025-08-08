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

interface BabyClothing {
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
  type: string;
  isNew?: boolean;
  isSale?: boolean;
  isHot?: boolean;
}

const BabyClothesPage = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 80]);
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  // Sorting logic
  const sortProducts = (products: BabyClothing[], sortBy: string) => {
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
          const getPriority = (item: BabyClothing) => {
            if (item.isHot) return 4;
            if (item.isNew) return 3;
            if (item.isSale) return 2;
            return 1;
          };
          return getPriority(b) - getPriority(a);
        });
    }
  };

  const babyClothes: BabyClothing[] = [
    {
      id: 1,
      name: "Organic Cotton Onesie",
      price: 24.99,
      originalPrice: 34.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fde68a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23d97706'%3E👶%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23d97706'%3EOnesie%3C/text%3E%3C/svg%3E",
      rating: 4.9,
      reviews: 189,
      colors: ['White', 'Pink', 'Blue', 'Yellow', 'Mint'],
      sizes: ['0-3M', '3-6M', '6-9M', '9-12M', '12-18M'],
      category: "Onesie",
      type: "Organic",
      isSale: true
    },
    {
      id: 2,
      name: "Soft Sleep Sack",
      price: 39.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fdf2f8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fce7f3;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23ec4899'%3E🛏️%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23ec4899'%3ESleep Sack%3C/text%3E%3C/svg%3E",
      rating: 4.8,
      reviews: 234,
      colors: ['Pink', 'Blue', 'Gray', 'White', 'Lavender'],
      sizes: ['0-6M', '6-12M', '12-18M', '18-24M'],
      category: "Sleepwear",
      type: "Sleep Sack",
      isNew: true
    },
    {
      id: 3,
      name: "Bamboo Bodysuit Set",
      price: 29.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f0fdf4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23dcfce7;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%2316a34a'%3E👕%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%2316a34a'%3EBodysuit%3C/text%3E%3C/svg%3E",
      rating: 4.7,
      reviews: 156,
      colors: ['White', 'Gray', 'Pink', 'Blue', 'Mint'],
      sizes: ['0-3M', '3-6M', '6-9M', '9-12M'],
      category: "Bodysuit",
      type: "Bamboo",
      isHot: true
    },
    {
      id: 4,
      name: "Warm Winter Hat",
      price: 14.99,
      originalPrice: 19.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dbeafe;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23bfdbfe;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad4)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%230ea5e9'%3E🧢%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%230ea5e9'%3EWinter Hat%3C/text%3E%3C/svg%3E",
      rating: 4.6,
      reviews: 98,
      colors: ['Blue', 'Pink', 'Gray', 'Red', 'White'],
      sizes: ['0-6M', '6-12M', '12-18M', '18-24M'],
      category: "Accessories",
      type: "Hat",
      isSale: true
    },
    {
      id: 5,
      name: "Cozy Pajama Set",
      price: 34.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fdf4ff;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fae8ff;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad5)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23a855f7'%3E🌙%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23a855f7'%3EPajama Set%3C/text%3E%3C/svg%3E",
      rating: 4.8,
      reviews: 267,
      colors: ['Pink', 'Blue', 'Gray', 'White', 'Lavender'],
      sizes: ['0-6M', '6-12M', '12-18M', '18-24M'],
      category: "Sleepwear",
      type: "Pajama",
      isNew: true
    },
    {
      id: 6,
      name: "Organic Socks Pack",
      price: 19.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fde68a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad6)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23d97706'%3E🧦%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23d97706'%3ESocks Pack%3C/text%3E%3C/svg%3E",
      rating: 4.9,
      reviews: 145,
      colors: ['White', 'Gray', 'Pink', 'Blue', 'Yellow'],
      sizes: ['0-6M', '6-12M', '12-18M', '18-24M'],
      category: "Accessories",
      type: "Socks",
      isHot: true
    }
  ];

  const handleAddToCart = (item: BabyClothing) => {
    console.log('Adding to cart:', item.name);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: 'Baby Clothes',
      subcategory: 'Baby Clothes'
    });
    
    setAddedToCart(prev => [...prev, item.id]);
    
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== item.id));
    }, 2000);
  };

  // Filter and sort products
  const filteredAndSortedProducts = sortProducts(
    babyClothes.filter(item => {
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesColor = selectedColors.length === 0 || item.colors.some(color => selectedColors.includes(color));
      const matchesSize = selectedSizes.length === 0 || item.sizes.some(size => selectedSizes.includes(size));
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);

      return matchesPrice && matchesColor && matchesSize && matchesType;
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
            Baby Clothes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our soft, comfortable, and adorable collection of baby clothes for your little ones.
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
                      max="80"
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
                    {['White', 'Pink', 'Blue', 'Gray', 'Yellow', 'Mint', 'Lavender', 'Red', 'Green', 'Purple'].map((color) => (
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
                  <div className="grid grid-cols-1 gap-2">
                    {['0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M'].map((size) => (
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

                {/* Clothing Types */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Clothing Types</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {['Onesie', 'Bodysuit', 'Sleep Sack', 'Pajama', 'Hat', 'Socks', 'Romper', 'Dress'].map((type) => (
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
          {filteredAndSortedProducts.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredProduct(item.id)}
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
              <div className={`relative ${viewMode === 'list' ? 'w-1/3 h-64' : 'aspect-[4/5]'}`}>
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Overlay with quick actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProduct === item.id ? 1 : 0 }}
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
                  {item.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      NEW
                    </motion.div>
                  )}
                  {item.isSale && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      SALE
                    </motion.div>
                  )}
                  {item.isHot && (
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
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {item.name}
                </h3>

                {/* Clothing Type */}
                <div className="mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Type: </span>
                  <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                    {item.type}
                  </span>
                </div>

                {/* Colors and Sizes */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Colors:</span>
                    <div className="flex space-x-1">
                      {item.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      ))}
                      {item.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{item.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Sizes:</span>
                    <div className="flex space-x-1">
                      {item.sizes.map((size) => (
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
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <AddToCartButton product={item} />
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      addedToCart.includes(item.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-pink-600 hover:bg-pink-700 text-white'
                    }`}
                  >
                    {addedToCart.includes(item.id) ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Floating effect - disabled to prevent interference */}
              {/* <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: `${index * 0.2}s` }}
                className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
              /> */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BabyClothesPage; 