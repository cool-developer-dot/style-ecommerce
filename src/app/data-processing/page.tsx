import type { Metadata } from "next";
import { Database, Shield, Users, Mail, Phone, MapPin, Calendar, CheckCircle, AlertTriangle, Target, Info, BarChart3, Settings, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Processing - StyleHub",
  description: "Learn about how StyleHub processes your personal data in accordance with GDPR requirements.",
};

export default function DataProcessingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Data Processing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn about how we process your personal data, the purposes for processing, and your rights regarding data processing.
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
                    <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    Data Processing Overview
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We process your personal data for specific purposes and in accordance with GDPR requirements. 
                    This page provides detailed information about our data processing activities.
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
                  Data Controller Information
                </h2>
              </div>
              
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

            {/* Processing Purposes */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Processing Purposes
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Order Processing",
                    description: "Process and fulfill your orders, handle payments, and provide order tracking.",
                    icon: "🛒",
                    color: "blue",
                    legalBasis: "Contract Performance"
                  },
                  {
                    title: "Account Management",
                    description: "Create and manage your account, save preferences, and provide customer support.",
                    icon: "👤",
                    color: "green",
                    legalBasis: "Contract Performance"
                  },
                  {
                    title: "Marketing Communications",
                    description: "Send promotional emails and personalized offers (with your consent).",
                    icon: "📢",
                    color: "purple",
                    legalBasis: "Consent"
                  },
                  {
                    title: "Website Analytics",
                    description: "Analyze website usage to improve our services and user experience.",
                    icon: "📊",
                    color: "orange",
                    legalBasis: "Legitimate Interest"
                  },
                  {
                    title: "Security & Fraud Prevention",
                    description: "Protect against fraud, abuse, and ensure website security.",
                    icon: "🔒",
                    color: "red",
                    legalBasis: "Legitimate Interest"
                  },
                  {
                    title: "Legal Compliance",
                    description: "Comply with legal obligations, tax requirements, and regulatory standards.",
                    icon: "⚖️",
                    color: "indigo",
                    legalBasis: "Legal Obligation"
                  }
                ].map((purpose, index) => (
                  <div key={index} className={`p-6 bg-${purpose.color}-50 dark:bg-${purpose.color}-900/20 rounded-xl border border-${purpose.color}-200 dark:border-${purpose.color}-800 hover:shadow-lg transition-all duration-300`}>
                    <div className="text-3xl mb-3">{purpose.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {purpose.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                      {purpose.description}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <strong>Legal Basis:</strong> {purpose.legalBasis}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Categories */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <Database className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Categories of Personal Data
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Identity Data
                    </h3>
                    <ul className="space-y-2 text-orange-800 dark:text-orange-200 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Name and contact information
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Email address and phone number
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Billing and shipping addresses
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Account credentials
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Technical Data
                    </h3>
                    <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        IP address and device information
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Browser type and version
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Operating system
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Website usage data
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Data Retention Periods
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Account Data
                  </h3>
                  <p className="text-indigo-800 dark:text-indigo-200 text-sm leading-relaxed">
                    Retained for 7 years after account closure for legal and tax purposes.
                  </p>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Order Data
                  </h3>
                  <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed">
                    Retained for 7 years for warranty and legal compliance purposes.
                  </p>
                </div>
                
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Marketing Data
                  </h3>
                  <p className="text-purple-800 dark:text-purple-200 text-sm leading-relaxed">
                    Retained until consent withdrawal or 2 years of inactivity.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Processors */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Third-Party Data Processors
                </h2>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                      Our Data Processors
                    </h3>
                    <p className="text-red-800 dark:text-red-200 leading-relaxed mb-4">
                      We use carefully selected third-party processors who comply with GDPR requirements:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Payment processors (Stripe, PayPal)</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Shipping partners (DHL, FedEx)</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Analytics services (Google Analytics)</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Cloud storage providers (AWS, Azure)</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Customer support tools (Zendesk)</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Email marketing platforms (Mailchimp)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Transfers */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  International Data Transfers
                </h2>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                      Cross-Border Processing
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                      Some of our data processors are located outside the European Economic Area (EEA). 
                      We ensure adequate protection through:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-blue-800 dark:text-blue-200">Adequacy decisions</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-blue-800 dark:text-blue-200">Standard contractual clauses</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-blue-800 dark:text-blue-200">Binding corporate rules</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-blue-800 dark:text-blue-200">Certification mechanisms</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-blue-800 dark:text-blue-200">Approved codes of conduct</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-blue-800 dark:text-blue-200">Derogations for specific situations</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your Rights Regarding Data Processing
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Right to Information",
                    description: "Be informed about data processing activities and purposes.",
                    icon: "📋"
                  },
                  {
                    title: "Right to Access",
                    description: "Request a copy of your personal data and processing information.",
                    icon: "👁️"
                  },
                  {
                    title: "Right to Rectification",
                    description: "Request correction of inaccurate or incomplete data.",
                    icon: "✏️"
                  },
                  {
                    title: "Right to Erasure",
                    description: "Request deletion of your personal data in certain circumstances.",
                    icon: "🗑️"
                  },
                  {
                    title: "Right to Portability",
                    description: "Receive your data in a structured, machine-readable format.",
                    icon: "📤"
                  },
                  {
                    title: "Right to Object",
                    description: "Object to processing based on legitimate interests.",
                    icon: "🚫"
                  }
                ].map((right, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
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

            {/* Contact Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Contact Us
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  If you have any questions about our data processing activities or wish to exercise your rights, please contact us:
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
