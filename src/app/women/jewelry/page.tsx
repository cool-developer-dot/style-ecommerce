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

interface Jewelry {
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
  material: string;
  isNew?: boolean;
  isSale?: boolean;
  isHot?: boolean;
}

const JewelryPage = () => {
  useEffect(() => {
    console.log('=== JewelryPage Component Mounted ===');
  }, []);

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  // Sorting logic
  const sortProducts = (products: Jewelry[], sortBy: string) => {
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
          const getPriority = (item: Jewelry) => {
            if (item.isHot) return 4;
            if (item.isNew) return 3;
            if (item.isSale) return 2;
            return 1;
          };
          return getPriority(b) - getPriority(a);
        });
    }
  };

  const jewelry: Jewelry[] = [
    {
      id: 1,
      name: "Diamond Stud Earrings",
      price: 299.99,
      originalPrice: 399.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fde68a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23d97706'%3E💎%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23d97706'%3EDiamond Studs%3C/text%3E%3C/svg%3E",
      rating: 4.9,
      reviews: 234,
      colors: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
      sizes: ['Small', 'Medium', 'Large'],
      category: "Earrings",
      material: "Diamond",
      isSale: true
    },
    {
      id: 2,
      name: "Pearl Necklace Set",
      price: 149.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fdf2f8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fce7f3;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23ec4899'%3E🫧%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23ec4899'%3EPearl Necklace%3C/text%3E%3C/svg%3E",
      rating: 4.7,
      reviews: 189,
      colors: ['White', 'Pink', 'Black', 'Lavender'],
      sizes: ['16"', '18"', '20"', '24"'],
      category: "Necklace",
      material: "Pearl",
      isNew: true
    },
    {
      id: 3,
      name: "Gold Bangle Bracelet",
      price: 89.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fde68a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23d97706'%3E💫%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23d97706'%3EGold Bangle%3C/text%3E%3C/svg%3E",
      rating: 4.8,
      reviews: 156,
      colors: ['Yellow Gold', 'White Gold', 'Rose Gold'],
      sizes: ['Small', 'Medium', 'Large'],
      category: "Bracelet",
      material: "Gold",
      isHot: true
    },
    {
      id: 4,
      name: "Sapphire Ring",
      price: 199.99,
      originalPrice: 249.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dbeafe;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23bfdbfe;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad4)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%230ea5e9'%3E💍%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%230ea5e9'%3ESapphire Ring%3C/text%3E%3C/svg%3E",
      rating: 4.6,
      reviews: 123,
      colors: ['Blue', 'Pink', 'Yellow', 'White'],
      sizes: ['5', '6', '7', '8', '9'],
      category: "Ring",
      material: "Sapphire",
      isSale: true
    },
    {
      id: 5,
      name: "Silver Chain Necklace",
      price: 59.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f1f5f9;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e2e8f0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad5)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%236b7280'%3E⚡%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%236b7280'%3ESilver Chain%3C/text%3E%3C/svg%3E",
      rating: 4.5,
      reviews: 98,
      colors: ['Silver', 'Gold Plated', 'Rose Gold Plated'],
      sizes: ['16"', '18"', '20"', '24"'],
      category: "Necklace",
      material: "Silver",
      isNew: true
    },
    {
      id: 6,
      name: "Emerald Pendant",
      price: 179.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f0fdf4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23dcfce7;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad6)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%2316a34a'%3E💚%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%2316a34a'%3EEmerald Pendant%3C/text%3E%3C/svg%3E",
      rating: 4.9,
      reviews: 267,
      colors: ['Green', 'Blue', 'Pink'],
      sizes: ['Small', 'Medium', 'Large'],
      category: "Pendant",
      material: "Emerald",
      isHot: true
    }
  ];

  const handleAddToCart = (jewelry: Jewelry) => {
    try {
      addToCart({
        id: jewelry.id,
        name: jewelry.name,
        price: jewelry.price,
        originalPrice: jewelry.originalPrice,
        image: jewelry.image,
        category: jewelry.category,
        subcategory: 'Jewelry'
      });
      
      setAddedToCart(prev => [...prev, jewelry.id]);
      
      // Reset the added state after 2 seconds
      setTimeout(() => {
        setAddedToCart(prev => prev.filter(id => id !== jewelry.id));
      }, 2000);
    } catch (error) {
      console.error('Error adding jewelry to cart:', error);
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = sortProducts(
    jewelry.filter(item => {
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesColor = selectedColors.length === 0 || item.colors.some(color => selectedColors.includes(color));
      const matchesSize = selectedSizes.length === 0 || item.sizes.some(size => selectedSizes.includes(size));
      const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(item.material);

      return matchesPrice && matchesColor && matchesSize && matchesMaterial;
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Women&apos;s Jewelry
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our exquisite collection of elegant, timeless, and luxurious jewelry pieces for every occasion.
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
                  ? 'bg-amber-600 text-white shadow-lg' 
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
                  ? 'bg-amber-600 text-white shadow-lg' 
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
            className="px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                      max="1000"
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
                    {['White Gold', 'Yellow Gold', 'Rose Gold', 'Silver', 'Platinum', 'Black', 'Blue', 'Green', 'Pink', 'White'].map((color) => (
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
                    {['Small', 'Medium', 'Large', '5', '6', '7', '8', '9', '16"', '18"', '20"', '24"'].map((size) => (
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

                {/* Jewelry Materials */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Materials</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {['Diamond', 'Pearl', 'Gold', 'Sapphire', 'Silver', 'Emerald', 'Ruby', 'Platinum'].map((material) => (
                      <label key={material} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMaterials([...selectedMaterials, material]);
                            } else {
                              setSelectedMaterials(selectedMaterials.filter(m => m !== material));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{material}</span>
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
            <div
              key={item.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-1/3 h-64' : 'aspect-[4/5]'}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {item.isNew && (
                    <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  {item.isSale && (
                    <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                  {item.isHot && (
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
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>

                {/* Jewelry Material */}
                <div className="mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Material: </span>
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    {item.material}
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
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`w-full py-3 px-4 rounded cursor-pointer font-semibold ${
                      addedToCart.includes(item.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
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
                        {addedToCart.includes(item.id) ? 'Added to Cart!' : 'Add to Cart'}
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

export default JewelryPage; 