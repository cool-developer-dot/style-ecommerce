'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User, 
  Heart,
  ChevronDown
} from 'lucide-react';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import CartPreview from './CartPreview';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Men',
      href: '/men',
      submenu: [
        { name: 'T-Shirts', href: '/men/tshirts' },
        { name: 'Jeans', href: '/men/jeans' },
        { name: 'Jackets', href: '/men/jackets' },
        { name: 'Shoes', href: '/men/shoes' }
      ]
    },
    {
      name: 'Women',
      href: '/women',
      submenu: [
        { name: 'Dresses', href: '/women/dresses' },
        { name: 'Tops', href: '/women/tops' },
        { name: 'Jewelry', href: '/women/jewelry' }
      ]
    },
    {
      name: 'Kids',
      href: '/kids',
      submenu: [
        { name: 'Baby Clothes', href: '/kids/baby-clothes' },
        { name: 'Toys', href: '/kids/toys' }
      ]
    },
    {
      name: 'Accessories',
      href: '/accessories',
      submenu: [
        { name: 'Bags', href: '/accessories/bags' },
        { name: 'Hats', href: '/accessories/hats' },
        { name: 'Sunglasses', href: '/accessories/sunglasses' },
        { name: 'Watches', href: '/accessories/watches' }
      ]
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StyleHub
            </span>
          </Link>

          {/* Desktop Navigation - Added spacing */}
          <nav className="hidden lg:flex items-center space-x-8 ml-12">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                >
                  <span>{item.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
            >
              <Heart className="w-5 h-5" />
              {wishlistState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistState.items.length}
                </span>
              )}
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
            </motion.button>

            {/* User Account */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              <User className="w-5 h-5" />
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Preview */}
      <AnimatePresence>
        {isCartOpen && (
          <CartPreview onClose={() => setIsCartOpen(false)} isOpen={false} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
