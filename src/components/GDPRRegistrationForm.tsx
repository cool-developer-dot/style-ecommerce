"use client";

import { useState } from "react";
import { Eye, EyeOff, Shield, CheckCircle } from "lucide-react";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  marketingConsent: boolean;
  analyticsConsent: boolean;
  termsConsent: boolean;
  privacyConsent: boolean;
}

export default function GDPRRegistrationForm() {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    marketingConsent: false,
    analyticsConsent: false,
    termsConsent: false,
    privacyConsent: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Consent validation
    if (!formData.termsConsent) newErrors.termsConsent = "You must accept the terms and conditions";
    if (!formData.privacyConsent) newErrors.privacyConsent = "You must accept the privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would typically send the data to your backend
    console.log("Registration data:", {
      ...formData,
      password: "[REDACTED]", // Never log actual passwords
      confirmPassword: "[REDACTED]",
    });

    setIsSubmitting(false);
    // Handle success (redirect, show success message, etc.)
  };

  const handleInputChange = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-stone-900 transition-all duration-300 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="text-blue-600 dark:text-blue-400" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Join StyleHub with full GDPR compliance and data protection
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-stone-800 dark:text-white ${
                      errors.firstName
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-stone-600"
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-stone-800 dark:text-white ${
                      errors.lastName
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-stone-600"
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-stone-800 dark:text-white ${
                    errors.email
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-stone-600"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-stone-800 dark:text-white"
                  placeholder="+1 (555) 123-4567"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  We&apos;ll only use this for order updates and delivery notifications
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Security
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-stone-800 dark:text-white ${
                      errors.password
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-stone-600"
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-stone-800 dark:text-white ${
                      errors.confirmPassword
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-stone-600"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Consent Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Consent
              </h2>
              
              <div className="space-y-4">
                {/* Required Consents */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
                    Required Consents
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.termsConsent}
                        onChange={(e) => handleInputChange("termsConsent", e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          I accept the Terms and Conditions *
                        </span>
                        <p className="text-xs text-blue-800 dark:text-blue-200 mt-1">
                          By checking this box, you agree to our terms of service and user agreement.
                        </p>
                      </div>
                    </label>
                    {errors.termsConsent && (
                      <p className="text-red-500 text-sm">{errors.termsConsent}</p>
                    )}

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => handleInputChange("privacyConsent", e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          I have read and agree to the Privacy Policy *
                        </span>
                        <p className="text-xs text-blue-800 dark:text-blue-200 mt-1">
                          You acknowledge that you have read our privacy policy and understand how we process your data.
                        </p>
                      </div>
                    </label>
                    {errors.privacyConsent && (
                      <p className="text-red-500 text-sm">{errors.privacyConsent}</p>
                    )}
                  </div>
                </div>

                {/* Optional Consents */}
                <div className="p-4 bg-gray-50 dark:bg-stone-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    Optional Consents
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.marketingConsent}
                        onChange={(e) => handleInputChange("marketingConsent", e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Marketing Communications
                        </span>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          Receive emails about new products, sales, and exclusive offers. You can unsubscribe at any time.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.analyticsConsent}
                        onChange={(e) => handleInputChange("analyticsConsent", e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Analytics and Personalization
                        </span>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          Allow us to analyze your browsing behavior to improve our website and provide personalized recommendations.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Protection Notice */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="text-green-600 dark:text-green-400 mr-3 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Your Data is Protected
                  </h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• We only collect data necessary for your account and orders</li>
                    <li>• Your data is encrypted and stored securely</li>
                    <li>• You can withdraw consent or delete your data at any time</li>
                    <li>• We never sell your personal information to third parties</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              By creating an account, you agree to our{" "}
              <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
