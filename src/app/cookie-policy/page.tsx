import type { Metadata } from "next";
import { Cookie, Shield, Settings, BarChart3, Target, Mail, Phone, MapPin, Calendar, CheckCircle, AlertTriangle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy - StyleHub",
  description: "Learn about how StyleHub uses cookies and similar technologies to enhance your browsing experience.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We use cookies to enhance your browsing experience and provide personalized content. Learn more about how we use cookies.
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
                    What Are Cookies?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Cookies are small text files that are stored on your device when you visit our website. They help us provide you with 
                    a better browsing experience by remembering your preferences and analyzing how you use our site.
                  </p>
                </div>
              </div>
            </section>

            {/* Types of Cookies */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Types of Cookies We Use
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                      <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                      Essential Cookies
                    </h3>
                  </div>
                  <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed mb-4">
                    These cookies are necessary for the website to function properly. They cannot be disabled and do not store any personal information.
                  </p>
                  <ul className="space-y-2 text-green-800 dark:text-green-200 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Session management
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Shopping cart functionality
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Security features
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                      Analytics Cookies
                    </h3>
                  </div>
                  <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed mb-4">
                    These cookies help us understand how visitors use our website so we can improve our services.
                  </p>
                  <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Page visit statistics
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      User behavior analysis
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Performance monitoring
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                      Marketing Cookies
                    </h3>
                  </div>
                  <p className="text-purple-800 dark:text-purple-200 text-sm leading-relaxed mb-4">
                    These cookies are used to deliver personalized advertisements and content based on your interests.
                  </p>
                  <ul className="space-y-2 text-purple-800 dark:text-purple-200 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Personalized ads
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Social media integration
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Remarketing campaigns
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookie Management */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Managing Your Cookie Preferences
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3 flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Browser Settings
                    </h3>
                    <p className="text-orange-800 dark:text-orange-200 leading-relaxed mb-4">
                      You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
                    </p>
                    <ul className="space-y-2 text-orange-800 dark:text-orange-200 text-sm">
                      <li>• Chrome: Settings → Privacy and security → Cookies</li>
                      <li>• Firefox: Options → Privacy & Security → Cookies</li>
                      <li>• Safari: Preferences → Privacy → Cookies</li>
                      <li>• Edge: Settings → Cookies and site permissions</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                      <Cookie className="w-5 h-5 mr-2" />
                      Cookie Consent Banner
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                      Our cookie consent banner allows you to choose which types of cookies you want to accept. 
                      You can change your preferences at any time.
                    </p>
                    <div className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept all cookies
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept essential cookies only
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Customize preferences
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Third-Party Cookies
                </h2>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                      Important Information
                    </h3>
                    <p className="text-red-800 dark:text-red-200 leading-relaxed mb-4">
                      Some cookies are placed by third-party services that appear on our pages. We use these services to:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Google Analytics</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Payment processors</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Social media platforms</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Advertising networks</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Customer support tools</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-800 dark:text-red-200">Performance monitoring</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Duration */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Cookie Duration
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Session Cookies
                  </h3>
                  <p className="text-indigo-800 dark:text-indigo-200 text-sm leading-relaxed">
                    Temporary cookies that are deleted when you close your browser. Used for essential website functionality.
                  </p>
                </div>
                
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Persistent Cookies
                  </h3>
                  <p className="text-purple-800 dark:text-purple-200 text-sm leading-relaxed">
                    Cookies that remain on your device for a set period. Used for preferences and analytics.
                  </p>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Third-Party Cookies
                  </h3>
                  <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed">
                    Cookies set by external services. Duration varies by provider and can be up to 2 years.
                  </p>
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
                  Your Rights Regarding Cookies
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Right to Information",
                    description: "You have the right to be informed about what cookies we use and why.",
                    icon: "📋"
                  },
                  {
                    title: "Right to Consent",
                    description: "You can choose which cookies to accept or reject through our consent banner.",
                    icon: "✅"
                  },
                  {
                    title: "Right to Withdraw",
                    description: "You can withdraw your consent for cookies at any time through browser settings.",
                    icon: "↩️"
                  },
                  {
                    title: "Right to Object",
                    description: "You can object to the use of certain cookies, especially marketing cookies.",
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

            {/* Updates to Policy */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Updates to This Policy
                </h2>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
                  legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page.
                </p>
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
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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
