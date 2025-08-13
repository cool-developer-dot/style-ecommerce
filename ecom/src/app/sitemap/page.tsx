'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Home, Users, ShoppingBag, Baby, Settings, FileText, Shield, Cookie, Database, UserCheck } from 'lucide-react';

const SitemapPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const sitemapData = [
    {
      title: 'Main Pages',
      icon: Home,
      links: [
        { name: 'Home', href: '/' },
        { name: 'All Products', href: '/all-products' },
        { name: 'Contact', href: '/contact' },
        { name: 'Cart', href: '/cart' }
      ]
    },
    {
      title: 'Fashion Categories',
      icon: ShoppingBag,
      links: [
        { name: "Men's Fashion", href: '/men' },
        { name: "Women's Fashion", href: '/women' },
        { name: "Kids' Fashion", href: '/kids' },
        { name: 'Accessories', href: '/accessories' }
      ]
    },
    {
      title: 'Men\'s Collection',
      icon: Users,
      links: [
        { name: 'T-Shirts', href: '/men/tshirts' },
        { name: 'Jeans', href: '/men/jeans' },
        { name: 'Jackets', href: '/men/jackets' },
        { name: 'Shoes', href: '/men/shoes' }
      ]
    },
    {
      title: 'Women\'s Collection',
      icon: Users,
      links: [
        { name: 'Dresses', href: '/women/dresses' },
        { name: 'Tops', href: '/women/tops' },
        { name: 'Jewelry', href: '/women/jewelry' }
      ]
    },
    {
      title: 'Kids\' Collection',
      icon: Baby,
      links: [
        { name: 'Baby Clothes', href: '/kids/baby-clothes' },
        { name: 'Toys', href: '/kids/toys' }
      ]
    },
    {
      title: 'Accessories',
      icon: ShoppingBag,
      links: [
        { name: 'Bags', href: '/accessories/bags' },
        { name: 'Hats', href: '/accessories/hats' },
        { name: 'Sunglasses', href: '/accessories/sunglasses' },
        { name: 'Watches', href: '/accessories/watches' }
      ]
    },
    {
      title: 'Legal & Privacy',
      icon: Shield,
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
        { name: 'Data Rights', href: '/data-rights' },
        { name: 'GDPR Compliance', href: '/gdpr-info' },
        { name: 'Data Processing', href: '/data-processing' }
      ]
    },
    {
      title: 'Account',
      icon: UserCheck,
      links: [
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Sitemap
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Navigate through all pages and sections of StyleHub. Find everything you need with our comprehensive site structure.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {sitemapData.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
              </div>
              
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href={link.href}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our customer service team is here to help you navigate our website and find the perfect products.
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SitemapPage;
