'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Shield,
  Truck,
  CreditCard,
  Star
} from 'lucide-react';

const Footer = () => {
  // Use static year to prevent hydration issues
  const currentYear = '2025';

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

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  StyleHub
                </h3>
              </div>
              <p className="text-gray-300 dark:text-green-400 mb-6 leading-relaxed">
                Discover the latest trends in fashion with StyleHub. We bring you premium quality clothing 
                for men, women, and kids with unmatched style and comfort.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Youtube, href: '#', label: 'YouTube' }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 text-white dark:text-green-400">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  'Men\'s Fashion',
                  'Women\'s Fashion', 
                  'Kids\' Fashion',
                  'Accessories',
                  'New Arrivals',
                  'Sale Items',
                  'Trending Now',
                  'Brand Stories'
                ].map((link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href="#" 
                      className="text-gray-300 dark:text-green-400 hover:text-white dark:hover:text-green-300 transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Service */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 text-white dark:text-green-400">Customer Service</h4>
              <ul className="space-y-3">
                {[
                  'Contact Us',
                  'Shipping Info',
                  'Returns & Exchanges',
                  'Size Guide',
                  'Care Instructions',
                  'FAQ',
                  'Track Order',
                  'Gift Cards'
                ].map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href="#" 
                      className="text-gray-300 dark:text-green-400 hover:text-white dark:hover:text-green-300 transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {service}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Privacy */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 text-white dark:text-green-400">Legal & Privacy</h4>
              <ul className="space-y-3">
                {[
                  { text: 'Privacy Policy', href: '/privacy-policy' },
                  { text: 'Terms of Service', href: '/terms' },
                  { text: 'Cookie Policy', href: '/cookie-policy' },
                  { text: 'Data Rights', href: '/data-rights' },
                  { text: 'GDPR Compliance', href: '/gdpr-info' },
                  { text: 'Data Processing', href: '/data-processing' }
                ].map((link, index) => (
                  <motion.li
                    key={link.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href={link.href} 
                      className="text-gray-300 dark:text-green-400 hover:text-white dark:hover:text-green-300 transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {link.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-6 text-white dark:text-green-400">Stay Updated</h4>
              <p className="text-gray-300 dark:text-green-400 mb-4">
                Subscribe to our newsletter for exclusive offers and fashion updates.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-lg hover:shadow-lg transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>Admin@tech2design.co.uk</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>03300437704</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>1 The Street Mayfair London W1J 8AJ</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On orders over £50' },
                { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
                { icon: CreditCard, title: 'Easy Returns', desc: '30 day return policy' },
                { icon: Star, title: 'Premium Quality', desc: 'Handpicked products' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">{feature.title}</h5>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col items-center space-y-2 text-gray-400">
                <span>© {currentYear} StyleHub. All rights reserved.</span>
                <a 
                  href="https://www.tech2design.co.uk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent hover:from-orange-400 hover:to-blue-400 transition-all duration-300 cursor-pointer"
                >
                  Designed by tech2design
                </a>
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="/sitemap" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
