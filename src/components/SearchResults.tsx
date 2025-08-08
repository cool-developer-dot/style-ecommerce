'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, Tag } from 'lucide-react';
import { useSearch } from './SearchContext';
import AddToCartButton from './AddToCartButton';
import { useEffect } from 'react';

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchResults = ({ isOpen, onClose }: SearchResultsProps) => {
  const { searchQuery, setSearchQuery, searchResults, clearSearch } = useSearch();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.search-results-container')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleResultClick = (product: { category: string; subcategory?: string }) => {
    // Navigate to the appropriate product page based on category and subcategory
    const category = product.category.toLowerCase();
    const subcategory = product.subcategory?.toLowerCase().replace(/\s+/g, '-') || '';
    
    let url = '#';
    if (category === 'men') {
      if (subcategory === 't-shirts') url = '/men/tshirts';
      else if (subcategory === 'jeans') url = '/men/jeans';
      else if (subcategory === 'jackets') url = '/men/jackets';
      else if (subcategory === 'shoes') url = '/men/shoes';
    } else if (category === 'women') {
      if (subcategory === 'dresses') url = '/women/dresses';
      else if (subcategory === 'tops') url = '/women/tops';
      else if (subcategory === 'jewelry') url = '/women/jewelry';
    } else if (category === 'kids') {
      if (subcategory === 'toys') url = '/kids/toys';
      else if (subcategory === 'baby-clothes') url = '/kids/baby-clothes';
    } else if (category === 'accessories') {
      if (subcategory === 'bags') url = '/accessories/bags';
      else if (subcategory === 'sunglasses') url = '/accessories/sunglasses';
      else if (subcategory === 'hats') url = '/accessories/hats';
      else if (subcategory === 'watches') url = '/accessories/watches';
    }
    
    window.location.href = url;
    onClose();
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'men': return 'bg-blue-200 text-blue-900 font-bold';
      case 'women': return 'bg-pink-200 text-pink-900 font-bold';
      case 'kids': return 'bg-green-200 text-green-900 font-bold';
      case 'accessories': return 'bg-purple-200 text-purple-900 font-bold';
      default: return 'bg-gray-200 text-gray-900 font-bold';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="search-results-container absolute top-full left-0 right-0 mt-2 bg-blue-900 rounded-xl shadow-2xl z-50 border border-blue-700 max-h-96 overflow-hidden w-full"
        >
            {/* Search Header */}
            <div className="flex items-center justify-between p-4 border-b border-blue-700">
              <div className="flex items-center space-x-3 flex-1">
                <Search className="w-5 h-5 text-white" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search all products..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-300"
                  autoFocus
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearSearch}
                className="p-2 hover:bg-blue-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {searchQuery.trim() === '' ? (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-white mx-auto mb-4" />
                  <p className="text-white font-bold text-lg">Start typing to search products</p>
                  <p className="text-sm text-gray-300 mt-2 font-semibold">Search by name, category, or tags</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-white mx-auto mb-4" />
                  <p className="text-white font-bold text-lg">No products found for &quot;{searchQuery}&quot;</p>
                  <p className="text-sm text-gray-300 mt-2 font-semibold">Try different keywords or browse categories</p>
                </div>
              ) : (
                <div className="p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-white font-semibold">
                      Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                    </p>
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-white" />
                      <span className="text-xs text-gray-300 font-medium">Searching all categories</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {searchResults.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-800 transition-all duration-200 cursor-pointer group"
                        onClick={() => handleResultClick(product)}
                      >
                        {/* Product Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-blue-800">
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <span className="text-2xl">
                              {product.category === 'Men' ? '👔' : 
                               product.category === 'Women' ? '👗' : 
                               product.category === 'Kids' ? '🧸' : '👜'}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getCategoryColor(product.category)}`}>
                              {product.category}
                            </span>
                            {product.subcategory && (
                              <span className="text-xs text-gray-300 font-medium">
                                {product.subcategory}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {product.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-300 font-medium">
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>
                            )}
                            <span className="text-sm font-bold text-white">
                              £{product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                £{product.originalPrice}
                              </span>
                            )}
                          </div>
                          {product.description && (
                            <p className="text-xs text-gray-300 mt-1 line-clamp-1 font-medium">
                              {product.description}
                            </p>
                          )}
                        </div>

                        {/* Cart Button */}
                        <div className="flex-shrink-0">
                          <AddToCartButton 
                            product={{
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              originalPrice: product.originalPrice,
                              image: product.image || '',
                              category: product.category,
                              subcategory: product.subcategory
                            }} 
                            variant="icon"
                            className="w-8 h-8"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchResults; 