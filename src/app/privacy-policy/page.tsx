import type { Metadata } from "next";
import { Shield, Eye, Lock, Users, FileText, Mail, Phone, MapPin, Calendar, CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - StyleHub",
  description: "Learn how StyleHub protects your personal data and respects your privacy rights in accordance with GDPR and other data protection regulations.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-stone-700">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <section className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-stone-700 dark:to-stone-600 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    Introduction
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    At StyleHub, we are committed to protecting your privacy and ensuring the security of your personal data. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                    or make a purchase. We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Controller */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Data Controller
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                StyleHub is the data controller responsible for your personal data. We are committed to transparency and accountability 
                in our data processing activities.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-stone-700 rounded-lg border border-gray-200 dark:border-stone-600">
                  <div className="flex items-center mb-3">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Email</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">Admin@tech2design.co.uk</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-stone-700 rounded-lg border border-gray-200 dark:border-stone-600">
                  <div className="flex items-center mb-3">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Phone</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">+44 20 1234 5678</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-stone-700 rounded-lg border border-gray-200 dark:border-stone-600">
                  <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Address</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">1 The Street, Mayfair, London W1J 8AJ</p>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Information We Collect
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                      <li>• Name and contact details</li>
                      <li>• Billing and shipping addresses</li>
                      <li>• Payment information</li>
                      <li>• Email address and phone number</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Technical Information
                    </h3>
                    <ul className="space-y-2 text-green-800 dark:text-green-200">
                      <li>• IP address and device information</li>
                      <li>• Browser type and version</li>
                      <li>• Operating system</li>
                      <li>• Website usage data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  How We Use Your Information
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Order Processing",
                    description: "Process and fulfill your orders, send order confirmations, and provide customer support.",
                    icon: "🛒",
                    color: "blue"
                  },
                  {
                    title: "Communication",
                    description: "Send important updates about your orders, respond to inquiries, and provide customer service.",
                    icon: "📧",
                    color: "green"
                  },
                  {
                    title: "Marketing",
                    description: "Send promotional offers and newsletters (only with your explicit consent).",
                    icon: "📢",
                    color: "purple"
                  },
                  {
                    title: "Website Improvement",
                    description: "Analyze website usage to improve our services and user experience.",
                    icon: "📊",
                    color: "orange"
                  },
                  {
                    title: "Legal Compliance",
                    description: "Comply with legal obligations and protect against fraud or abuse.",
                    icon: "⚖️",
                    color: "red"
                  },
                  {
                    title: "Personalization",
                    description: "Provide personalized recommendations and shopping experiences.",
                    icon: "🎯",
                    color: "indigo"
                  }
                ].map((item, index) => (
                  <div key={index} className={`p-6 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl border border-${item.color}-200 dark:border-${item.color}-800 hover:shadow-lg transition-all duration-300`}>
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Sharing */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Data Sharing and Disclosure
                </h2>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your explicit consent, 
                  except in the following circumstances:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                    Service providers who assist in our operations (payment processors, shipping companies)
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                    Legal requirements or to protect our rights and safety
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                    Business transfers (in case of merger or acquisition)
                  </li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your Rights Under GDPR
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Right to Access",
                    description: "Request a copy of your personal data and information about how we process it.",
                    icon: "👁️"
                  },
                  {
                    title: "Right to Rectification",
                    description: "Request correction of inaccurate or incomplete personal data.",
                    icon: "✏️"
                  },
                  {
                    title: "Right to Erasure",
                    description: "Request deletion of your personal data in certain circumstances.",
                    icon: "🗑️"
                  },
                  {
                    title: "Right to Portability",
                    description: "Receive your personal data in a structured, machine-readable format.",
                    icon: "📤"
                  },
                  {
                    title: "Right to Object",
                    description: "Object to processing of your personal data for certain purposes.",
                    icon: "🚫"
                  },
                  {
                    title: "Right to Withdraw Consent",
                    description: "Withdraw consent for data processing where consent is the legal basis.",
                    icon: "↩️"
                  }
                ].map((right, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 hover:shadow-lg transition-all duration-300">
                    <div className="text-2xl mb-3">{right.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {right.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {right.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Data Security
                </h2>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, 
                  alteration, disclosure, or destruction.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">SSL encryption for data transmission</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">Secure data storage practices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">Regular security assessments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">Access controls and authentication</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Contact Us
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white dark:bg-stone-700 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Admin@tech2design.co.uk</p>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-stone-700 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">+44 20 1234 5678</p>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-stone-700 rounded-lg">
                    <MapPin className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
                    <p className="font-medium text-gray-900 dark:text-white">Address</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">1 The Street, Mayfair, London W1J 8AJ</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
