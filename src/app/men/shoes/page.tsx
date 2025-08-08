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

interface Shoes {
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

const ShoesPage = () => {
  useEffect(() => {
    console.log('=== ShoesPage Component Mounted ===');
  }, []);

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  // Sorting logic
  const sortProducts = (products: Shoes[], sortBy: string) => {
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
          const getPriority = (item: Shoes) => {
            if (item.isHot) return 4;
            if (item.isNew) return 3;
            if (item.isSale) return 2;
            return 1;
          };
          return getPriority(b) - getPriority(a);
        });
    }
  };

  const shoes: Shoes[] = [
    {
      id: 1,
      name: "Classic Leather Sneakers",
      price: 129.99,
      originalPrice: 159.99,
      image: "/images/files/q.webp",
      rating: 4.8,
      reviews: 234,
      colors: ['White', 'Black', 'Brown', 'Gray'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      category: "Casual",
      type: "Sneakers",
      isSale: true
    },
    {
      id: 2,
      name: "Premium Oxford Dress Shoes",
      price: 199.99,
      image: "/images/files/w.webp",
      rating: 4.9,
      reviews: 156,
      colors: ['Black', 'Brown', 'Burgundy'],
      sizes: ['8', '9', '10', '11', '12'],
      category: "Formal",
      type: "Dress Shoes",
      isNew: true
    },
    {
      id: 3,
      name: "Athletic Running Shoes",
      price: 149.99,
      image: "/images/files/e.webp",
      rating: 4.7,
      reviews: 189,
      colors: ['Blue', 'Red', 'Black', 'Gray'],
      sizes: ['7', '8', '9', '10', '11', '12', '13'],
      category: "Athletic",
      type: "Running"
    },
    {
      id: 4,
      name: "Casual Canvas Loafers",
      price: 89.99,
      originalPrice: 119.99,
      image: "/images/files/r.webp",
      rating: 4.6,
      reviews: 145,
      colors: ['Navy', 'Gray', 'Brown', 'White'],
      sizes: ['8', '9', '10', '11', '12'],
      category: "Casual",
      type: "Loafers",
      isSale: true
    },
    {
      id: 5,
      name: "Hiking Boots Premium",
      price: 249.99,
      image: "/images/files/t.webp",
      rating: 4.9,
      reviews: 67,
      colors: ['Tan', 'Black', 'Burgundy'],
      sizes: ['8', '9', '10', '11'],
      category: "Luxury",
      type: "Chelsea Boots",
      isNew: true
    },
    {
      id: 6,
      name: "TrailMaster XT Hiking Boots",
      price: 199.95,
      originalPrice: 229.95,
      image: "/images/files/y.webp", 
      rating: 4.7,
      reviews: 84,
      colors: ['Forest Green', 'Charcoal', 'Sand'],
      sizes: ['7', '8', '9', '10', '11', '12'],
      category: "Outdoor",
      type: "All-Terrain",
      isHot: true
    }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = sortProducts(
    shoes.filter(shoe => {
      const matchesPrice = shoe.price >= priceRange[0] && shoe.price <= priceRange[1];
      const matchesColor = selectedColors.length === 0 || shoe.colors.some(color => selectedColors.includes(color));
      const matchesSize = selectedSizes.length === 0 || shoe.sizes.some(size => selectedSizes.includes(size));
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(shoe.type);

      return matchesPrice && matchesColor && matchesSize && matchesType;
    }),
    sortBy
  );

  const handleAddToCart = (shoe: Shoes) => {
    try {
      addToCart({
        id: shoe.id,
        name: shoe.name,
        price: shoe.price,
        originalPrice: shoe.originalPrice,
        image: shoe.image,
        category: shoe.category,
        subcategory: 'Shoes'
      });
      
      setAddedToCart(prev => [...prev, shoe.id]);
      
      // Reset the added state after 2 seconds
      setTimeout(() => {
        setAddedToCart(prev => prev.filter(id => id !== shoe.id));
      }, 2000);
    } catch (error) {
      console.error('Error adding shoes to cart:', error);
    }
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
            Men&apos;s Shoes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our premium collection of comfortable, stylish, and high-quality footwear for every occasion.
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
                      max="400"
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
                    {['White', 'Black', 'Brown', 'Gray', 'Blue', 'Red', 'Navy', 'Tan', 'Burgundy'].map((color) => (
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
                    {['7', '8', '9', '10', '11', '12', '13'].map((size) => (
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

                {/* Shoe Types */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shoe Types</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {['Sneakers', 'Dress Shoes', 'Running', 'Loafers', 'Boots', 'Chelsea Boots'].map((type) => (
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
          {filteredAndSortedProducts.map((shoe, index) => (
            <div
              key={shoe.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-1/3 h-64' : 'aspect-[4/5]'}`}>
                <img
                  src={shoe.image || '/images/placeholder-shoe.jpg'}
                  alt={shoe.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-shoe.jpg';
                  }}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {shoe.isNew && (
                    <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  {shoe.isSale && (
                    <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                  {shoe.isHot && (
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
                    {shoe.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {shoe.rating} ({shoe.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {shoe.name}
                </h3>

                {/* Shoe Type */}
                <div className="mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Type: </span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {shoe.type}
                  </span>
                </div>

                {/* Colors and Sizes */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Colors:</span>
                    <div className="flex space-x-1">
                      {shoe.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      ))}
                      {shoe.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{shoe.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Sizes:</span>
                    <div className="flex space-x-1">
                      {shoe.sizes.map((size) => (
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
                      ${shoe.price}
                    </span>
                    {shoe.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${shoe.originalPrice}
                      </span>
                    )}
                  </div>
                  </div>
                  
                {/* Add to Cart Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(shoe)}
                    className={`w-full py-3 px-4 rounded cursor-pointer font-semibold ${
                      addedToCart.includes(shoe.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
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
                        {addedToCart.includes(shoe.id) ? 'Added to Cart!' : 'Add to Cart'}
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

export default ShoesPage; 