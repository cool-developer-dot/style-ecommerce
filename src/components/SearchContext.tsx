'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  tags?: string[];
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Comprehensive product database - in a real app, this would come from an API
const allProducts: Product[] = [
  // Men's Products
  { id: 1, name: "Classic Cotton T-Shirt", price: 29.99, image: "/images/men/tshirts/classic-cotton.jpg", category: "Men", subcategory: "T-Shirts", rating: 4.5, reviews: 120, description: "Comfortable cotton t-shirt for everyday wear", tags: ["cotton", "casual", "basic", "comfortable"] },
  { id: 2, name: "Premium Denim Jeans", price: 89.99, originalPrice: 119.99, image: "/images/men/jeans/premium-denim.jpg", category: "Men", subcategory: "Jeans", rating: 4.8, reviews: 89, description: "High-quality denim jeans with perfect fit", tags: ["denim", "premium", "comfortable", "stylish"] },
  { id: 3, name: "Leather Jacket", price: 199.99, image: "/images/men/jackets/leather-jacket.jpg", category: "Men", subcategory: "Jackets", rating: 4.7, reviews: 156, description: "Classic leather jacket for a bold look", tags: ["leather", "classic", "bold", "stylish"] },
  { id: 4, name: "Running Shoes", price: 129.99, image: "/images/men/shoes/running-shoes.jpg", category: "Men", subcategory: "Shoes", rating: 4.6, reviews: 234, description: "Comfortable running shoes for active lifestyle", tags: ["running", "comfortable", "active", "sports"] },
  { id: 15, name: "Formal Shirt", price: 69.99, image: "/images/men/tshirts/formal-shirt.jpg", category: "Men", subcategory: "T-Shirts", rating: 4.4, reviews: 98, description: "Elegant formal shirt for professional occasions", tags: ["formal", "professional", "elegant", "business"] },
  { id: 17, name: "Sports Sneakers", price: 89.99, image: "/images/men/shoes/sports-sneakers.jpg", category: "Men", subcategory: "Shoes", rating: 4.3, reviews: 201, description: "Versatile sports sneakers for daily use", tags: ["sports", "versatile", "daily", "comfortable"] },
  { id: 21, name: "Casual Polo Shirt", price: 39.99, image: "/images/men/tshirts/casual-polo.jpg", category: "Men", subcategory: "T-Shirts", rating: 4.2, reviews: 87, description: "Comfortable polo shirt for casual occasions", tags: ["polo", "casual", "comfortable", "versatile"] },
  { id: 22, name: "Slim Fit Jeans", price: 79.99, image: "/images/men/jeans/slim-fit.jpg", category: "Men", subcategory: "Jeans", rating: 4.5, reviews: 134, description: "Modern slim fit jeans for contemporary style", tags: ["slim fit", "modern", "contemporary", "stylish"] },
  { id: 23, name: "Bomber Jacket", price: 149.99, image: "/images/men/jackets/bomber-jacket.jpg", category: "Men", subcategory: "Jackets", rating: 4.6, reviews: 112, description: "Trendy bomber jacket for street style", tags: ["bomber", "trendy", "street style", "casual"] },
  { id: 24, name: "Dress Shoes", price: 159.99, image: "/images/men/shoes/dress-shoes.jpg", category: "Men", subcategory: "Shoes", rating: 4.7, reviews: 89, description: "Elegant dress shoes for formal occasions", tags: ["dress", "formal", "elegant", "professional"] },
  
  // Women's Products
  { id: 5, name: "Summer Dress", price: 59.99, image: "/images/women/dresses/summer-dress.jpg", category: "Women", subcategory: "Dresses", rating: 4.4, reviews: 78, description: "Light and breezy summer dress", tags: ["summer", "light", "breezy", "casual"] },
  { id: 6, name: "Silk Blouse", price: 79.99, image: "/images/women/tops/silk-blouse.jpg", category: "Women", subcategory: "Tops", rating: 4.3, reviews: 92, description: "Elegant silk blouse for professional wear", tags: ["silk", "elegant", "professional", "luxury"] },
  { id: 7, name: "Diamond Necklace", price: 299.99, image: "/images/women/jewelry/diamond-necklace.jpg", category: "Women", subcategory: "Jewelry", rating: 4.9, reviews: 45, description: "Stunning diamond necklace for special occasions", tags: ["diamond", "luxury", "special", "elegant"] },
  { id: 14, name: "Casual Blouse", price: 45.99, image: "/images/women/tops/casual-blouse.jpg", category: "Women", subcategory: "Tops", rating: 4.5, reviews: 123, description: "Comfortable casual blouse for everyday wear", tags: ["casual", "comfortable", "everyday", "versatile"] },
  { id: 16, name: "Winter Coat", price: 159.99, image: "/images/women/dresses/winter-coat.jpg", category: "Women", subcategory: "Dresses", rating: 4.6, reviews: 145, description: "Warm winter coat for cold weather", tags: ["winter", "warm", "cozy", "protective"] },
  { id: 25, name: "Evening Gown", price: 199.99, image: "/images/women/dresses/evening-gown.jpg", category: "Women", subcategory: "Dresses", rating: 4.8, reviews: 67, description: "Stunning evening gown for formal events", tags: ["evening", "formal", "elegant", "luxury"] },
  { id: 26, name: "Crop Top", price: 34.99, image: "/images/women/tops/crop-top.jpg", category: "Women", subcategory: "Tops", rating: 4.2, reviews: 156, description: "Trendy crop top for summer style", tags: ["crop", "trendy", "summer", "stylish"] },
  { id: 27, name: "Gold Bangle", price: 89.99, image: "/images/women/jewelry/gold-bangle.jpg", category: "Women", subcategory: "Jewelry", rating: 4.4, reviews: 98, description: "Elegant gold bangle for everyday elegance", tags: ["gold", "elegant", "everyday", "versatile"] },
  { id: 28, name: "Maxi Dress", price: 89.99, image: "/images/women/dresses/maxi-dress.jpg", category: "Women", subcategory: "Dresses", rating: 4.5, reviews: 112, description: "Flowing maxi dress for bohemian style", tags: ["maxi", "bohemian", "flowing", "casual"] },
  { id: 29, name: "Tank Top", price: 24.99, image: "/images/women/tops/tank-top.jpg", category: "Women", subcategory: "Tops", rating: 4.1, reviews: 203, description: "Comfortable tank top for active lifestyle", tags: ["tank", "active", "comfortable", "casual"] },
  { id: 30, name: "Sapphire Ring", price: 149.99, image: "/images/women/jewelry/sapphire-ring.jpg", category: "Women", subcategory: "Jewelry", rating: 4.6, reviews: 76, description: "Beautiful sapphire ring for special moments", tags: ["sapphire", "special", "beautiful", "elegant"] },
  
  // Kids' Products
  { id: 8, name: "Educational Building Blocks", price: 29.99, originalPrice: 39.99, image: "/images/kids/toys/building-blocks.jpg", category: "Kids", subcategory: "Toys", rating: 4.8, reviews: 234, description: "Educational building blocks for learning and fun", tags: ["educational", "learning", "fun", "creative"] },
  { id: 9, name: "Organic Cotton Onesie", price: 24.99, image: "/images/kids/baby-clothes/organic-onesie.jpg", category: "Kids", subcategory: "Baby Clothes", rating: 4.9, reviews: 189, description: "Soft organic cotton onesie for babies", tags: ["organic", "cotton", "soft", "baby"] },
  { id: 18, name: "Plush Teddy Bear", price: 19.99, image: "/images/kids/toys/teddy-bear.jpg", category: "Kids", subcategory: "Toys", rating: 4.9, reviews: 189, description: "Soft and cuddly teddy bear for children", tags: ["plush", "cuddly", "soft", "comforting"] },
  { id: 19, name: "Bamboo Bodysuit Set", price: 29.99, image: "/images/kids/baby-clothes/bamboo-bodysuit.jpg", category: "Kids", subcategory: "Baby Clothes", rating: 4.7, reviews: 156, description: "Eco-friendly bamboo bodysuit set", tags: ["bamboo", "eco-friendly", "soft", "sustainable"] },
  { id: 31, name: "Remote Control Car", price: 49.99, image: "/images/kids/toys/remote-car.jpg", category: "Kids", subcategory: "Toys", rating: 4.5, reviews: 167, description: "Exciting remote control car for kids", tags: ["remote control", "exciting", "fun", "interactive"] },
  { id: 32, name: "Science Experiment Kit", price: 39.99, image: "/images/kids/toys/science-kit.jpg", category: "Kids", subcategory: "Toys", rating: 4.6, reviews: 98, description: "Educational science experiment kit", tags: ["science", "educational", "experiment", "learning"] },
  { id: 33, name: "Cozy Pajama Set", price: 34.99, image: "/images/kids/baby-clothes/cozy-pajama.jpg", category: "Kids", subcategory: "Baby Clothes", rating: 4.4, reviews: 134, description: "Comfortable pajama set for bedtime", tags: ["pajama", "comfortable", "bedtime", "cozy"] },
  { id: 34, name: "Warm Winter Hat", price: 14.99, image: "/images/kids/baby-clothes/winter-hat.jpg", category: "Kids", subcategory: "Baby Clothes", rating: 4.3, reviews: 89, description: "Warm winter hat for cold weather", tags: ["winter", "warm", "protective", "cozy"] },
  { id: 35, name: "Board Game Collection", price: 44.99, image: "/images/kids/toys/board-games.jpg", category: "Kids", subcategory: "Toys", rating: 4.7, reviews: 145, description: "Family board game collection", tags: ["board game", "family", "interactive", "fun"] },
  { id: 36, name: "Organic Socks Set", price: 19.99, image: "/images/kids/baby-clothes/organic-socks.jpg", category: "Kids", subcategory: "Baby Clothes", rating: 4.5, reviews: 112, description: "Soft organic cotton socks for babies", tags: ["organic", "socks", "soft", "comfortable"] },
  
  // Accessories
  { id: 10, name: "Leather Handbag", price: 149.99, image: "/images/accessories/bags/leather-handbag.jpg", category: "Accessories", subcategory: "Bags", rating: 4.6, reviews: 167, description: "Premium leather handbag for everyday use", tags: ["leather", "premium", "everyday", "stylish"] },
  { id: 11, name: "Designer Sunglasses", price: 199.99, image: "/images/accessories/sunglasses/designer-sunglasses.jpg", category: "Accessories", subcategory: "Sunglasses", rating: 4.7, reviews: 89, description: "Stylish designer sunglasses for sun protection", tags: ["designer", "stylish", "protection", "luxury"] },
  { id: 12, name: "Baseball Cap", price: 19.99, image: "/images/accessories/hats/baseball-cap.jpg", category: "Accessories", subcategory: "Hats", rating: 4.2, reviews: 156, description: "Classic baseball cap for casual style", tags: ["baseball", "classic", "casual", "versatile"] },
  { id: 13, name: "Luxury Watch", price: 599.99, image: "/images/accessories/watches/luxury-watch.jpg", category: "Accessories", subcategory: "Watches", rating: 4.9, reviews: 67, description: "Premium luxury watch for sophisticated style", tags: ["luxury", "premium", "sophisticated", "elegant"] },
  { id: 20, name: "Crossbody Bag", price: 79.99, image: "/images/accessories/bags/crossbody-bag.jpg", category: "Accessories", subcategory: "Bags", rating: 4.5, reviews: 134, description: "Convenient crossbody bag for hands-free style", tags: ["crossbody", "convenient", "hands-free", "practical"] },
  { id: 37, name: "Canvas Tote Bag", price: 39.99, image: "/images/accessories/bags/canvas-tote.jpg", category: "Accessories", subcategory: "Bags", rating: 4.3, reviews: 98, description: "Eco-friendly canvas tote bag", tags: ["canvas", "eco-friendly", "tote", "sustainable"] },
  { id: 38, name: "Aviator Sunglasses", price: 159.99, image: "/images/accessories/sunglasses/aviator.jpg", category: "Accessories", subcategory: "Sunglasses", rating: 4.6, reviews: 123, description: "Classic aviator sunglasses for timeless style", tags: ["aviator", "classic", "timeless", "stylish"] },
  { id: 39, name: "Beanie Hat", price: 24.99, image: "/images/accessories/hats/beanie.jpg", category: "Accessories", subcategory: "Hats", rating: 4.4, reviews: 167, description: "Warm beanie hat for winter comfort", tags: ["beanie", "warm", "winter", "comfortable"] },
  { id: 40, name: "Smart Watch", price: 299.99, image: "/images/accessories/watches/smart-watch.jpg", category: "Accessories", subcategory: "Watches", rating: 4.7, reviews: 234, description: "Advanced smart watch with health tracking", tags: ["smart", "health", "tracking", "technology"] },
  { id: 41, name: "Clutch Evening Bag", price: 89.99, image: "/images/accessories/bags/clutch-bag.jpg", category: "Accessories", subcategory: "Bags", rating: 4.5, reviews: 76, description: "Elegant clutch bag for evening events", tags: ["clutch", "elegant", "evening", "formal"] },
  { id: 42, name: "Cat Eye Sunglasses", price: 129.99, image: "/images/accessories/sunglasses/cat-eye.jpg", category: "Accessories", subcategory: "Sunglasses", rating: 4.4, reviews: 89, description: "Trendy cat eye sunglasses for retro style", tags: ["cat eye", "trendy", "retro", "stylish"] },
  { id: 43, name: "Bucket Hat", price: 29.99, image: "/images/accessories/hats/bucket-hat.jpg", category: "Accessories", subcategory: "Hats", rating: 4.2, reviews: 134, description: "Casual bucket hat for summer style", tags: ["bucket", "casual", "summer", "versatile"] },
  { id: 44, name: "Minimalistic Watch", price: 199.99, image: "/images/accessories/watches/minimalistic.jpg", category: "Accessories", subcategory: "Watches", rating: 4.6, reviews: 156, description: "Clean minimalistic watch for modern style", tags: ["minimalistic", "clean", "modern", "simple"] },
  { id: 45, name: "Designer Shoulder Bag", price: 179.99, image: "/images/accessories/bags/shoulder-bag.jpg", category: "Accessories", subcategory: "Bags", rating: 4.7, reviews: 98, description: "Stylish designer shoulder bag", tags: ["designer", "shoulder", "stylish", "luxury"] },
  { id: 46, name: "Oversized Silver Sunglasses", price: 149.99, image: "/images/accessories/sunglasses/oversized-silver.jpg", category: "Accessories", subcategory: "Sunglasses", rating: 4.5, reviews: 112, description: "Bold oversized silver sunglasses", tags: ["oversized", "silver", "bold", "statement"] },
  { id: 47, name: "Straw Panama Hat", price: 34.99, image: "/images/accessories/hats/panama-hat.jpg", category: "Accessories", subcategory: "Hats", rating: 4.3, reviews: 87, description: "Classic straw panama hat for summer", tags: ["panama", "straw", "classic", "summer"] },
  { id: 48, name: "Sport's Watch", price: 249.99, image: "/images/accessories/watches/sports-watch.jpg", category: "Accessories", subcategory: "Watches", rating: 4.8, reviews: 189, description: "Durable sports watch for active lifestyle", tags: ["sports", "durable", "active", "performance"] },
  { id: 49, name: "Mini Backpack", price: 59.99, image: "/images/accessories/bags/mini-backpack.jpg", category: "Accessories", subcategory: "Bags", rating: 4.4, reviews: 145, description: "Compact mini backpack for daily essentials", tags: ["mini", "backpack", "compact", "daily"] },
  { id: 50, name: "Round Vintage Sunglasses", price: 119.99, image: "/images/accessories/sunglasses/round-vintage.jpg", category: "Accessories", subcategory: "Sunglasses", rating: 4.3, reviews: 78, description: "Vintage round sunglasses for retro style", tags: ["round", "vintage", "retro", "classic"] },
  { id: 51, name: "Trucker Hat", price: 22.99, image: "/images/accessories/hats/trucker-hat.jpg", category: "Accessories", subcategory: "Hats", rating: 4.1, reviews: 156, description: "Classic trucker hat for casual style", tags: ["trucker", "classic", "casual", "versatile"] },
  { id: 52, name: "Classic Chronograph Watch", price: 399.99, image: "/images/accessories/watches/chronograph.jpg", category: "Accessories", subcategory: "Watches", rating: 4.9, reviews: 134, description: "Precision classic chronograph watch", tags: ["chronograph", "precision", "classic", "luxury"] },
  { id: 53, name: "Travel Duffel Bag", price: 99.99, image: "/images/accessories/bags/travel-duffel.jpg", category: "Accessories", subcategory: "Bags", rating: 4.6, reviews: 98, description: "Spacious travel duffel bag for adventures", tags: ["travel", "duffel", "spacious", "adventure"] },
  { id: 54, name: "Sport Performance Sunglasses", price: 179.99, image: "/images/accessories/sunglasses/sport-performance.jpg", category: "Accessories", subcategory: "Sunglasses", rating: 4.7, reviews: 89, description: "High-performance sports sunglasses", tags: ["sport", "performance", "durable", "protective"] },
  { id: 55, name: "Fedora Hat", price: 44.99, image: "/images/accessories/hats/fedora.jpg", category: "Accessories", subcategory: "Hats", rating: 4.5, reviews: 112, description: "Elegant fedora hat for sophisticated style", tags: ["fedora", "elegant", "sophisticated", "formal"] },
  { id: 56, name: "Diver Watch", price: 499.99, image: "/images/accessories/watches/diver-watch.jpg", category: "Accessories", subcategory: "Watches", rating: 4.8, reviews: 167, description: "Professional diver watch for underwater adventures", tags: ["diver", "professional", "underwater", "adventure"] },
];

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();
    
    const results = allProducts.filter(product => {
      const searchableText = [
        product.name.toLowerCase(),
        product.category.toLowerCase(),
        product.subcategory?.toLowerCase() || '',
        product.price.toString(),
        product.originalPrice?.toString() || '',
        product.description?.toLowerCase() || '',
        ...(product.tags?.map(tag => tag.toLowerCase()) || [])
      ].join(' ');

      return searchableText.includes(normalizedQuery);
    });

    // Sort results by relevance (exact matches first, then partial matches)
    const sortedResults = results.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      const aExactMatch = aName === normalizedQuery;
      const bExactMatch = bName === normalizedQuery;
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      const aStartsWith = aName.startsWith(normalizedQuery);
      const bStartsWith = bName.startsWith(normalizedQuery);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      // Sort by rating if relevance is equal
      if (a.rating && b.rating && a.rating !== b.rating) {
        return b.rating - a.rating;
      }
      
      return 0;
    });

    setSearchResults(sortedResults);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  // Perform search when query changes
  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchOpen,
    setIsSearchOpen,
    performSearch,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}; 