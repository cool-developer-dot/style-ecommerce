'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Filter, 
  Grid, 
  List,
  ChevronDown,
  ChevronUp,
  ShoppingCart
} from 'lucide-react';
import Header from '../../components/Header';
import { useCart } from '../../components/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  subcategory: string;
  isNew?: boolean;
  isSale?: boolean;
  isHot?: boolean;
}

const AllProductsPage = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  // Sorting logic
  const sortProducts = (products: Product[], sortBy: string) => {
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
          const getPriority = (item: Product) => {
            if (item.isHot) return 4;
            if (item.isNew) return 3;
            if (item.isSale) return 2;
            return 1;
          };
          return getPriority(b) - getPriority(a);
        });
    }
  };

  const handleAddToCart = (item: Product) => {
    console.log('Adding to cart:', item.name);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      subcategory: item.subcategory
    });
    
    setAddedToCart(prev => [...prev, item.id]);
    
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== item.id));
    }, 2000);
  };

  const allProducts: Product[] = [
    // Men's Products
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dbeafe;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23bfdbfe;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%230ea5e9'%3E👕%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%230ea5e9'%3ET-Shirt%3C/text%3E%3C/svg%3E",
      rating: 4.8,
      reviews: 124,
      category: "Men",
      subcategory: "T-Shirts",
      isSale: true
    },
    {
      id: 2,
      name: "Premium Denim Jeans",
      price: 89.99,
      originalPrice: 119.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231e3a8a;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%231e40af;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23ffffff'%3E👖%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23ffffff'%3EJeans%3C/text%3E%3C/svg%3E",
      rating: 4.7,
      reviews: 156,
      category: "Men",
      subcategory: "Jeans",
      isSale: true
    },
    {
      id: 3,
      name: "Leather Jacket",
      price: 199.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23374153;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%234b5563;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23ffffff'%3E🧥%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23ffffff'%3EJacket%3C/text%3E%3C/svg%3E",
      rating: 4.9,
      reviews: 89,
      category: "Men",
      subcategory: "Jackets",
      isNew: true
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 129.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fde68a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad4)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23d97706'%3E👟%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23d97706'%3EShoes%3C/text%3E%3C/svg%3E",
      rating: 4.6,
      reviews: 203,
      category: "Men",
      subcategory: "Shoes",
      isHot: true
    },

    // Women's Products
    {
      id: 5,
      name: "Elegant Summer Dress",
      price: 89.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fdf2f8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fce7f3;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad5)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23ec4899'%3E👗%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23ec4899'%3EDress%3C/text%3E%3C/svg%3E",
      rating: 4.9,
      reviews: 89,
      category: "Women",
      subcategory: "Dresses",
      isNew: true
    },
    {
      id: 6,
      name: "Casual Blouse",
      price: 49.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f3f4f6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e5e7eb;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad6)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%236b7280'%3E👚%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%236b7280'%3EBlouse%3C/text%3E%3C/svg%3E",
      rating: 4.5,
      reviews: 67,
      category: "Women",
      subcategory: "Tops"
    },
    {
      id: 7,
      name: "Diamond Necklace",
      price: 299.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad7' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fdf4ff;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fae8ff;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad7)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23a855f7'%3E💎%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23a855f7'%3EJewelry%3C/text%3E%3C/svg%3E",
      rating: 4.8,
      reviews: 45,
      category: "Women",
      subcategory: "Jewelry",
      isHot: true
    },

    // Kids' Products
    {
      id: 8,
      name: "Organic Cotton Onesie",
      price: 24.99,
      originalPrice: 34.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad8' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fde68a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad8)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23d97706'%3E👶%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23d97706'%3EOnesie%3C/text%3E%3C/svg%3E",
      rating: 4.9,
      reviews: 189,
      category: "Kids",
      subcategory: "Baby Clothes",
      isSale: true
    },
    {
      id: 9,
      name: "Educational Building Blocks",
      price: 29.99,
      originalPrice: 39.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad9' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fde68a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad9)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23d97706'%3E🧱%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23d97706'%3EToys%3C/text%3E%3C/svg%3E",
      rating: 4.8,
      reviews: 234,
      category: "Kids",
      subcategory: "Toys",
      isSale: true
    },

    // Accessories Products
    {
      id: 10,
      name: "Designer Handbag",
      price: 199.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad10' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fdf2f8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fce7f3;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad10)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23ec4899'%3E👜%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23ec4899'%3EBag%3C/text%3E%3C/svg%3E",
      rating: 4.9,
      reviews: 45,
      category: "Accessories",
      subcategory: "Bags",
      isNew: true
    },
    {
      id: 11,
      name: "Premium Watch",
      price: 299.99,
      originalPrice: 399.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad11' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dbeafe;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23bfdbfe;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad11)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%230ea5e9'%3E⌚%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%230ea5e9'%3EWatch%3C/text%3E%3C/svg%3E",
      rating: 4.8,
      reviews: 112,
      category: "Accessories",
      subcategory: "Watches",
      isSale: true
    },
    {
      id: 12,
      name: "Sunglasses",
      price: 89.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='grad12' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fde68a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23grad12)'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='%23d97706'%3E🕶️%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='%23d97706'%3ESunglasses%3C/text%3E%3C/svg%3E",
      rating: 4.6,
      reviews: 78,
      category: "Accessories",
      subcategory: "Sunglasses",
      isHot: true
    }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = sortProducts(
    allProducts.filter(item => {
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(item.subcategory);

      return matchesPrice && matchesCategory && matchesSubcategory;
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

  const categories = ['Men', 'Women', 'Kids', 'Accessories'];
  const subcategories = ['T-Shirts', 'Jeans', 'Jackets', 'Shoes', 'Dresses', 'Tops', 'Jewelry', 'Baby Clothes', 'Toys', 'Bags', 'Watches', 'Sunglasses'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-red-600 bg-clip-text text-transparent mb-4">
            All Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our complete collection of fashion items across all categories - from men&apos;s and women&apos;s clothing to kids&apos; essentials and stylish accessories.
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
                  ? 'bg-orange-600 text-white shadow-lg' 
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
                  ? 'bg-orange-600 text-white shadow-lg' 
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
            className="px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      max="500"
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

                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, category]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== category));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Subcategories</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {subcategories.map((subcategory) => (
                      <label key={subcategory} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(subcategory)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSubcategories([...selectedSubcategories, subcategory]);
                            } else {
                              setSelectedSubcategories(selectedSubcategories.filter(s => s !== subcategory));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{subcategory}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Status</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {['New', 'Sale', 'Hot'].map((status) => (
                      <label key={status} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded"
                        />
                        <span className="text-sm">{status}</span>
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
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredProduct(product.id)}
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Overlay with quick actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center"
                >
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors duration-200"
                  >
                    <ShoppingCart className="w-6 h-6" />
                  </button>
                </motion.div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      NEW
                    </motion.div>
                  )}
                  {product.isSale && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      SALE
                    </motion.div>
                  )}
                  {product.isHot && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      HOT
                    </motion.div>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.subcategory}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      addedToCart.includes(product.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    {addedToCart.includes(product.id) ? (
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
                className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
              /> */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AllProductsPage; 