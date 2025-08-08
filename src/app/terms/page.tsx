import type { Metadata } from "next";
import { FileText, Shield, Users, ShoppingCart, Truck, CreditCard, Lock, AlertTriangle, CheckCircle, Mail, Phone, MapPin, Calendar, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - StyleHub",
  description: "Terms of Service for StyleHub e-commerce platform. Read our terms and conditions for using our services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By using StyleHub, you agree to these terms.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-stone-700">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            {/* Acceptance of Terms */}
            <section className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-stone-700 dark:to-stone-600 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    By accessing and using StyleHub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </div>
            </section>

            {/* Use License */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  2. Use License
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on StyleHub&apos;s website 
                for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Prohibited Activities
                  </h3>
                  <ul className="space-y-2 text-red-800 dark:text-red-200">
                    <li>• Modify or copy the materials</li>
                    <li>• Use for commercial purposes</li>
                    <li>• Reverse engineer software</li>
                    <li>• Remove copyright notices</li>
                    <li>• Transfer to other servers</li>
                  </ul>
                </div>
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Permitted Uses
                  </h3>
                  <ul className="space-y-2 text-green-800 dark:text-green-200">
                    <li>• Personal browsing</li>
                    <li>• Making purchases</li>
                    <li>• Reading product information</li>
                    <li>• Contacting customer service</li>
                    <li>• Creating user accounts</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Account */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  3. User Account
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                To access certain features of our website, you may be required to create an account. You are responsible for:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Maintaining the confidentiality of your account information",
                  "All activities that occur under your account",
                  "Notifying us immediately of any unauthorized use",
                  "Ensuring your account information is accurate and up-to-date"
                ].map((responsibility, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-stone-700 rounded-lg border border-gray-200 dark:border-stone-600 flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{responsibility}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Product Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <ShoppingCart className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  4. Product Information and Pricing
                </h2>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      Important Notice
                    </h3>
                    <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">
                      We strive to provide accurate product information and pricing. However, we do not warrant that product descriptions, 
                      colors, information, or other content available on the website is accurate, complete, reliable, current, or error-free.
                    </p>
                    <p className="text-yellow-800 dark:text-yellow-200 mt-3">
                      Prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Order and Payment */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  5. Order and Payment
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Order Process
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      By placing an order, you offer to purchase the product at the price listed. We reserve the right to accept or decline your order for any reason.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Terms
                    </h3>
                    <p className="text-green-800 dark:text-green-200 leading-relaxed">
                      Payment must be made at the time of order placement. We accept various payment methods as indicated during checkout.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-6 bg-gray-50 dark:bg-stone-700 rounded-xl border border-gray-200 dark:border-stone-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Order Cancellation Reasons</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Product availability",
                    "Errors in pricing or product information",
                    "Suspected fraud or unauthorized transactions",
                    "Violation of these terms"
                  ].map((reason, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-gray-700 dark:text-gray-300">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Truck className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  6. Shipping and Delivery
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                      Delivery Timeline
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      We will make reasonable efforts to ship your order within the timeframe specified. However, delivery times are estimates only 
                      and may vary due to factors beyond our control.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Risk Transfer
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Returns and Refunds */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  7. Returns and Refunds
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Return Policy
                  </h3>
                  <p className="text-purple-800 dark:text-purple-200 leading-relaxed">
                    We accept returns within 30 days of delivery for items in their original condition. Return shipping costs are the responsibility 
                    of the customer unless the item was received damaged or incorrect.
                  </p>
                </div>
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Refund Process
                  </h3>
                  <p className="text-green-800 dark:text-green-200 leading-relaxed">
                    Refunds will be processed within 5-7 business days after we receive your return. The refund will be issued to the original 
                    payment method used for the purchase.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy and Data Protection */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  8. Privacy and Data Protection
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Your Privacy Matters
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
                      to understand our practices.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      We are committed to protecting your personal data in accordance with applicable data protection laws, including GDPR.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <Scale className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  9. Intellectual Property
                </h2>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 dark:text-red-200 leading-relaxed">
                      The content on this website, including but not limited to text, graphics, images, logos, and software, 
                      is the property of StyleHub or its content suppliers and is protected by copyright laws.
                    </p>
                    <p className="text-red-800 dark:text-red-200 mt-3">
                      You may not reproduce, distribute, or create derivative works from this content without our express written consent.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Prohibited Uses */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  10. Prohibited Uses
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "For any unlawful purpose",
                  "To solicit others to perform unlawful acts",
                  "To violate any international, federal, provincial, or state regulations",
                  "To infringe upon or violate our intellectual property rights",
                  "To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate",
                  "To submit false or misleading information",
                  "To upload or transmit viruses or any other type of malicious code",
                  "To collect or track the personal information of others",
                  "To spam, phish, pharm, pretext, spider, crawl, or scrape"
                ].map((prohibition, index) => (
                  <div key={index} className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 flex items-start">
                    <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-800 dark:text-orange-200">{prohibition}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  11. Limitation of Liability
                </h2>
              </div>
              
              <div className="bg-gray-50 dark:bg-stone-700 border border-gray-200 dark:border-stone-600 rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  In no event shall StyleHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                  or other intangible losses, resulting from your use of the website.
                </p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  12. Disclaimer
                </h2>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">
                  The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, 
                  StyleHub excludes all representations, warranties, conditions and terms whether express or implied.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  13. Governing Law
                </h2>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of the United Kingdom, 
                  without regard to its conflict of law provisions.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  14. Changes to Terms
                </h2>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                <p className="text-green-800 dark:text-green-200 leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes 
                  by posting the new terms on this page.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  15. Contact Information
                </h2>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us:
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
