import type { Metadata } from "next";
import { Shield, Download, Mail, Phone, MapPin, Calendar, CheckCircle, AlertTriangle, User, Lock, FileText, ArrowRight, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Rights - StyleHub",
  description: "Exercise your data protection rights under GDPR. Access, modify, or delete your personal data with StyleHub.",
};

export default function DataRightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Data Rights
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Under GDPR, you have several rights regarding your personal data. Learn about your rights and how to exercise them.
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
                    <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    Your Rights Under GDPR
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    The General Data Protection Regulation (GDPR) gives you several important rights regarding your personal data. 
                    We are committed to helping you exercise these rights easily and transparently.
                  </p>
                </div>
              </div>
            </section>

            {/* Rights Overview */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your Data Protection Rights
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Right to Access",
                    description: "Request a copy of your personal data and information about how we process it.",
                    icon: "👁️",
                    color: "blue",
                    action: "Request Data"
                  },
                  {
                    title: "Right to Rectification",
                    description: "Request correction of inaccurate or incomplete personal data.",
                    icon: "✏️",
                    color: "green",
                    action: "Update Data"
                  },
                  {
                    title: "Right to Erasure",
                    description: "Request deletion of your personal data in certain circumstances.",
                    icon: "🗑️",
                    color: "red",
                    action: "Delete Data"
                  },
                  {
                    title: "Right to Portability",
                    description: "Receive your personal data in a structured, machine-readable format.",
                    icon: "📤",
                    color: "purple",
                    action: "Export Data"
                  },
                  {
                    title: "Right to Object",
                    description: "Object to processing of your personal data for certain purposes.",
                    icon: "🚫",
                    color: "orange",
                    action: "Object to Processing"
                  },
                  {
                    title: "Right to Withdraw Consent",
                    description: "Withdraw consent for data processing where consent is the legal basis.",
                    icon: "↩️",
                    color: "indigo",
                    action: "Withdraw Consent"
                  }
                ].map((right, index) => (
                  <div key={index} className={`p-6 bg-${right.color}-50 dark:bg-${right.color}-900/20 rounded-xl border border-${right.color}-200 dark:border-${right.color}-800 hover:shadow-lg transition-all duration-300`}>
                    <div className="text-3xl mb-3">{right.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {right.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {right.description}
                    </p>
                    <button className={`w-full bg-${right.color}-600 hover:bg-${right.color}-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center`}>
                      {right.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Exercise Rights */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  How to Exercise Your Rights
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Us Directly
                    </h3>
                    <p className="text-purple-800 dark:text-purple-200 leading-relaxed mb-4">
                      Send us an email with your request. We&apos;ll respond within 30 days.
                    </p>
                    <div className="space-y-2 text-purple-800 dark:text-purple-200 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Email: Admin@tech2design.co.uk
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Phone: +44 20 1234 5678
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Response time: Within 30 days
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Account Settings
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                      Access and manage your data through your account settings.
                    </p>
                    <div className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Update personal information
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Manage communication preferences
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Download your data
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Response Times */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Response Times
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Standard Requests
                  </h3>
                  <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed">
                    We will respond to your request within 30 days of receipt.
                  </p>
                </div>
                
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Complex Requests
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                    Complex requests may take up to 60 days, with notification of extension.
                  </p>
                </div>
                
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                    <Download className="w-5 h-5 mr-2" />
                    Data Portability
                  </h3>
                  <p className="text-purple-800 dark:text-purple-200 text-sm leading-relaxed">
                    Data will be provided in a structured, machine-readable format.
                  </p>
                </div>
              </div>
            </section>

            {/* Verification Process */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Identity Verification
                </h2>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                      Security Measures
                    </h3>
                    <p className="text-red-800 dark:text-red-200 leading-relaxed mb-4">
                      To protect your data, we may need to verify your identity before processing your request. 
                      This helps prevent unauthorized access to personal information.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Email verification</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Account login</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Document verification</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Phone verification</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Security questions</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Two-factor authentication</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Exceptions and Limitations */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Exceptions and Limitations
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    When We May Refuse
                  </h3>
                  <ul className="space-y-2 text-yellow-800 dark:text-yellow-200 text-sm">
                    <li className="flex items-start">
                      <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                      Legal obligations require data retention
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                      Exercise or defense of legal claims
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                      Public interest or official authority
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                      Scientific or historical research purposes
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Fee Information
                  </h3>
                  <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      First request: Free of charge
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Subsequent requests: May incur reasonable fees
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Excessive requests: May be refused
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Manifestly unfounded requests: May be refused
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Contact Us
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  If you have any questions about your data rights or wish to exercise them, please contact us:
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
