'use client';

import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Hero = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  // E-commerce store images
  const storeImages = [
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      alt: "Modern Fashion Store Interior"
    },
    {
      url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop",
      alt: "Luxury Shopping Experience"
    },
    {
      url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop",
      alt: "Contemporary Retail Space"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % storeImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [storeImages.length]);

  // Counting animation components
  const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
      const controls = animate(count, end, { duration });
      return controls.stop;
    }, [count, end, duration]);

    return <motion.span>{rounded}</motion.span>;
  };



  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-orange-50 to-purple-50 dark:from-black dark:via-orange-900/20 dark:to-black transition-all duration-300">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.05) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="absolute inset-0 overflow-hidden bg-orange-50 dark:bg-orange-900/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={storeImages[currentImageIndex].url}
              alt={storeImages[currentImageIndex].alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {storeImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-orange-500/50 hover:bg-orange-500/75'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>


      </div>

      {/* Floating elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 blur-xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 blur-xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-orange-500/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              New Collection Available
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white dark:text-green-400 leading-tight drop-shadow-lg"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Discover Your
            </span>
            <br />
            <span className="text-white dark:text-green-400">
              Perfect Style
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/90 dark:text-green-400/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
            Explore our curated collection of premium fashion items. 
            From casual wear to elegant pieces, find your unique style with StyleHub.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/all-products')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>

          {/* Stats with Counting Animation */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center space-x-8 pt-8"
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-white dark:text-green-400 drop-shadow-lg">
                <CountUp end={50} />K+
              </div>
              <div className="text-sm text-white/80 dark:text-green-400/80">Happy Customers</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-white dark:text-green-400 drop-shadow-lg">
                <CountUp end={1000} />+
              </div>
              <div className="text-sm text-white/80 dark:text-green-400/80">Products</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-white dark:text-green-400 drop-shadow-lg">
                <CountUp end={24} />/7
              </div>
              <div className="text-sm text-white/80 dark:text-green-400/80">Support</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 