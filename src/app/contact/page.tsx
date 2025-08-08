'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import Header from '../../components/Header';

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const floatingLabelVariants = {
    focused: { 
      y: -25, 
      scale: 0.85,
      color: '#3b82f6'
    },
    unfocused: { 
      y: 0, 
      scale: 1,
      color: '#6b7280'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Header />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We&apos;d love to hear from you! Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Send us a Message
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.label
                    variants={floatingLabelVariants}
                    animate={focusedField === 'fullName' || formData.fullName ? 'focused' : 'unfocused'}
                    className="absolute left-4 top-4 text-sm font-medium transition-all duration-200 pointer-events-none"
                  >
                    Full Name *
                  </motion.label>
                  <motion.input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
                    }}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)"
                    }}
                    className={`w-full px-4 py-4 pt-6 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                    }`}
                    placeholder=""
                  />
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.label
                    variants={floatingLabelVariants}
                    animate={focusedField === 'email' || formData.email ? 'focused' : 'unfocused'}
                    className="absolute left-4 top-4 text-sm font-medium transition-all duration-200 pointer-events-none"
                  >
                    Email Address *
                  </motion.label>
                  <motion.input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
                    }}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)"
                    }}
                    className={`w-full px-4 py-4 pt-6 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                    }`}
                    placeholder=""
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Subject */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.label
                    variants={floatingLabelVariants}
                    animate={focusedField === 'subject' || formData.subject ? 'focused' : 'unfocused'}
                    className="absolute left-4 top-4 text-sm font-medium transition-all duration-200 pointer-events-none"
                  >
                    Subject *
                  </motion.label>
                  <motion.input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
                    }}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)"
                    }}
                    className={`w-full px-4 py-4 pt-6 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.subject 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                    }`}
                    placeholder=""
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.label
                    variants={floatingLabelVariants}
                    animate={focusedField === 'message' || formData.message ? 'focused' : 'unfocused'}
                    className="absolute left-4 top-4 text-sm font-medium transition-all duration-200 pointer-events-none"
                  >
                    Message *
                  </motion.label>
                  <motion.textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
                    }}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)"
                    }}
                    className={`w-full px-4 py-4 pt-6 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      errors.message 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                    }`}
                    placeholder=""
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Details & Map */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                                 {/* Address */}
                 <motion.div 
                   className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300"
                   whileHover={{ 
                     scale: 1.02,
                     x: 5,
                     boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)"
                   }}
                 >
                   <motion.div 
                     className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
                     whileHover={{ 
                       scale: 1.1,
                       rotate: 5,
                       boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
                     }}
                   >
                     <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                   </motion.div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                       Our Office
                     </h3>
                     <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                       1 The Street<br />
                       Mayfair<br />
                       London<br />
                       W1J 8AJ
                     </p>
                   </div>
                 </motion.div>

                                 {/* Phone */}
                 <motion.div 
                   className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300"
                   whileHover={{ 
                     scale: 1.02,
                     x: 5,
                     boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.1)"
                   }}
                 >
                   <motion.div 
                     className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
                     whileHover={{ 
                       scale: 1.1,
                       rotate: 5,
                       boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)"
                     }}
                   >
                     <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                   </motion.div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                       Phone Number
                     </h3>
                     <p className="text-gray-600 dark:text-gray-400">
                        0330043770
                     </p>
                   </div>
                 </motion.div>

                                 {/* Email */}
                 <motion.div 
                   className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300"
                   whileHover={{ 
                     scale: 1.02,
                     x: 5,
                     boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.1)"
                   }}
                 >
                   <motion.div 
                     className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"
                     whileHover={{ 
                       scale: 1.1,
                       rotate: 5,
                       boxShadow: "0 8px 25px rgba(147, 51, 234, 0.3)"
                     }}
                   >
                     <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                   </motion.div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                       Email Address
                     </h3>
                     <p className="text-gray-600 dark:text-gray-400">
                       Admin@tech2design.co.uk
                     </p>
                   </div>
                 </motion.div>

                                 {/* Business Hours */}
                 <motion.div 
                   className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300"
                   whileHover={{ 
                     scale: 1.02,
                     x: 5,
                     boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.1)"
                   }}
                 >
                   <motion.div 
                     className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center"
                     whileHover={{ 
                       scale: 1.1,
                       rotate: 5,
                       boxShadow: "0 8px 25px rgba(249, 115, 22, 0.3)"
                     }}
                   >
                     <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                   </motion.div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                       Business Hours
                     </h3>
                     <p className="text-gray-600 dark:text-gray-400">
                       Monday - Friday: 9:00 AM - 6:00 PM<br />
                       Saturday: 10:00 AM - 4:00 PM<br />
                       Sunday: Closed
                     </p>
                   </div>
                 </motion.div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Us
                </h3>
                                 <div className="flex space-x-4">
                   {[
                     { icon: Facebook, href: '#', color: 'text-blue-600 hover:text-blue-700' },
                     { icon: Twitter, href: '#', color: 'text-sky-500 hover:text-sky-600' },
                     { icon: Instagram, href: '#', color: 'text-pink-600 hover:text-pink-700' },
                     { icon: Linkedin, href: '#', color: 'text-blue-700 hover:text-blue-800' }
                   ].map((social, index) => (
                     <motion.a
                       key={index}
                       href={social.href}
                       whileHover={{ 
                         scale: 1.15, 
                         y: -5,
                         rotate: 5,
                         boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                       }}
                       whileTap={{ scale: 0.9 }}
                       className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg ${social.color}`}
                     >
                       <social.icon className="w-6 h-6" />
                     </motion.a>
                   ))}
                 </div>
              </div>
            </div>

                         {/* Google Map */}
             <motion.div 
               className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
               whileHover={{ 
                 scale: 1.02,
                 boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
               }}
               transition={{ duration: 0.3 }}
             >
               <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                   Find Us
                 </h3>
               </div>
               <motion.div 
                 className="relative h-64 md:h-80"
                 whileHover={{ scale: 1.01 }}
                 transition={{ duration: 0.2 }}
               >
                                   <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.901481432!2d-0.1521274!3d51.5091267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d4b4c2b1b1b%3A0x1b1b1b1b1b1b1b1b!2s1%20The%20Street%2C%20Mayfair%2C%20London%20W1J%208AJ%2C%20UK!5e0!3m2!1sen!2s!4v1640995200000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-b-2xl"
                  />
               </motion.div>
             </motion.div>
          </motion.div>
        </div>

                 {/* Additional Info Section */}
         <motion.div
           variants={itemVariants}
           className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
         >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                           <motion.div 
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700/30 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-300"
                whileHover={{ 
                  scale: 1.08,
                  y: -8,
                  boxShadow: "0 25px 35px -5px rgba(59, 130, 246, 0.25), 0 10px 15px -5px rgba(59, 130, 246, 0.15)"
                }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 10,
                    boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)"
                  }}
                >
                  <Mail className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Email Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Get help via email within 24 hours
                </p>
              </motion.div>
             
                           <motion.div 
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700/30 hover:border-green-300 dark:hover:border-green-600/50 transition-all duration-300"
                whileHover={{ 
                  scale: 1.08,
                  y: -8,
                  boxShadow: "0 25px 35px -5px rgba(34, 197, 94, 0.25), 0 10px 15px -5px rgba(34, 197, 94, 0.15)"
                }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 10,
                    boxShadow: "0 15px 35px rgba(34, 197, 94, 0.4)"
                  }}
                >
                  <Phone className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Phone Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Call us during business hours
                </p>
              </motion.div>
             
                           <motion.div 
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700/30 hover:border-purple-300 dark:hover:border-purple-600/50 transition-all duration-300"
                whileHover={{ 
                  scale: 1.08,
                  y: -8,
                  boxShadow: "0 25px 35px -5px rgba(147, 51, 234, 0.25), 0 10px 15px -5px rgba(147, 51, 234, 0.15)"
                }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 10,
                    boxShadow: "0 15px 35px rgba(147, 51, 234, 0.4)"
                  }}
                >
                  <Clock className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Live Chat
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Chat with us in real-time
                </p>
              </motion.div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage; 