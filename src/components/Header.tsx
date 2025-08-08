'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ChevronDown,
  Package
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useCart } from './CartContext';
import { useSearch } from './SearchContext';
import SearchResults from './SearchResults';

const Header = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  const { state: cartState } = useCart();
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch();
  const router = useRouter();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    {
      name: 'Men',
      items: ['T-Shirts', 'Jeans', 'Jackets', 'Shoes']
    },
    {
      name: 'Women',
      items: ['Dresses', 'Tops',  'Jewelry']
    },
    {
      name: 'Kids',
      items: ['Baby Clothes', 'Toys']
    },
    {
      name: 'Accessories',
      items: ['Bags', 'Watches', 'Sunglasses', 'Hats']
    }
  ];

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-blue-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Placeholder content */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-white">StyleHub</span>
            </div>
          </div>
        </div>
      </motion.header>
    );
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-blue-900/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-blue-900 dark:bg-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StyleHub
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <div key={category.name} className="relative dropdown-container">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setOpenDropdown(openDropdown === category.name ? null : category.name)}
                  className="flex items-center space-x-1 text-white dark:text-green-400 hover:text-blue-300 dark:hover:text-green-300 transition-colors"
                >
                  <span>{category.name}</span>
                  <motion.div
                    animate={{ rotate: openDropdown === category.name ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>
                
                {/* Mega Menu */}
                <AnimatePresence>
                  {openDropdown === category.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-2">
                          {category.items.map((item) => (
                            <motion.a
                              key={item}
                              whileHover={{ x: 5 }}
                              href={
                                category.name === 'Men' && item === 'T-Shirts' ? '/men/tshirts' :
                                category.name === 'Men' && item === 'Jeans' ? '/men/jeans' :
                                category.name === 'Men' && item === 'Shoes' ? '/men/shoes' :
                                category.name === 'Men' && item === 'Jackets' ? '/men/jackets' :
                                category.name === 'Women' && item === 'Dresses' ? '/women/dresses' :
                                category.name === 'Women' && item === 'Jewelry' ? '/women/jewelry' :
                                category.name === 'Women' && item === 'Tops' ? '/women/tops' :
                                category.name === 'Kids' && item === 'Toys' ? '/kids/toys' :
                                category.name === 'Kids' && item === 'Baby Clothes' ? '/kids/baby-clothes' :
                                category.name === 'Accessories' && item === 'Bags' ? '/accessories/bags' :
                                category.name === 'Accessories' && item === 'Sunglasses' ? '/accessories/sunglasses' :
                                category.name === 'Accessories' && item === 'Hats' ? '/accessories/hats' :
                                category.name === 'Accessories' && item === 'Watches' ? '/accessories/watches' :
                                '#'
                              }
                              className="text-sm text-purple-800 dark:text-purple-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]"
                            >
                              {item}
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
            {/* Contact Link */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              className="text-white dark:text-green-400 hover:text-blue-300 dark:hover:text-green-300 transition-colors font-medium"
            >
              Contact
            </motion.a>
          </nav>

          {/* Search Bar - Always Visible */}
          <div className="flex-1 max-w-md mx-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 dark:text-blue-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search all products..."
                className="w-full pl-10 pr-4 py-2 bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <SearchResults isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            </motion.div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white dark:text-green-400 relative group"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              ) : (
                <Moon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
              )}
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.button>

            {/* Cart */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push('/cart')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white dark:text-green-400 relative cursor-pointer"
                title={`${cartState.itemCount} items in cart`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartState.itemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {cartState.itemCount}
                  </motion.div>
                )}
              </motion.button>
            </div>

            {/* User */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/login')}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white dark:text-green-400 cursor-pointer"
            >
              <User className="w-5 h-5" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white dark:text-green-400"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/20"
            >
              <div className="py-4 space-y-4">
                {categories.map((category) => (
                  <div key={category.name}>
                    <motion.button
                      onClick={() => setOpenDropdown(openDropdown === category.name ? null : category.name)}
                      className="flex items-center justify-between w-full text-sm font-semibold text-white mb-2"
                    >
                      <span>{category.name}</span>
                      <motion.div
                        animate={{ rotate: openDropdown === category.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {openDropdown === category.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-2 gap-2"
                        >
                          {category.items.map((item) => (
                            <a
                              key={item}
                              href={
                                category.name === 'Men' && item === 'T-Shirts' ? '/men/tshirts' :
                                category.name === 'Men' && item === 'Jeans' ? '/men/jeans' :
                                category.name === 'Men' && item === 'Shoes' ? '/men/shoes' :
                                category.name === 'Men' && item === 'Jackets' ? '/men/jackets' :
                                category.name === 'Women' && item === 'Dresses' ? '/women/dresses' :
                                category.name === 'Women' && item === 'Jewelry' ? '/women/jewelry' :
                                category.name === 'Women' && item === 'Tops' ? '/women/tops' :
                                category.name === 'Kids' && item === 'Toys' ? '/kids/toys' :
                                category.name === 'Kids' && item === 'Baby Clothes' ? '/kids/baby-clothes' :
                                category.name === 'Accessories' && item === 'Bags' ? '/accessories/bags' :
                                category.name === 'Accessories' && item === 'Sunglasses' ? '/accessories/sunglasses' :
                                category.name === 'Accessories' && item === 'Hats' ? '/accessories/hats' :
                                category.name === 'Accessories' && item === 'Watches' ? '/accessories/watches' :
                                '#'
                              }
                              className="text-sm text-white/70 hover:text-blue-300 transition-colors"
                            >
                              {item}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                {/* Contact Link - Mobile */}
                <div className="pt-4 border-t border-white/20">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.02 }}
                    className="block text-sm font-semibold text-white hover:text-blue-300 transition-colors"
                  >
                    Contact
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header; 