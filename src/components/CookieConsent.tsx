"use client";

import { useState, useEffect } from "react";
import { Check, X as XIcon } from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  onAccept: (preferences: CookiePreferences) => void;
  onDecline: () => void;
}

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allPreferences));
    onAccept(allPreferences);
    setShowBanner(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    onAccept(preferences);
    setShowBanner(false);
  };

  const handleDecline = () => {
    const minimalPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(minimalPreferences));
    onDecline();
    setShowBanner(false);
  };

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === "essential") return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-stone-800 border-t border-gray-200 dark:border-stone-700 shadow-lg z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                We use cookies to enhance your experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                We use cookies and similar technologies to provide you with the best possible experience on our website. 
                Some cookies are essential for the website to function properly, while others help us improve our services 
                and provide personalized content. You can choose which cookies to accept below.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                >
                  Cookie Settings
                </button>
                <a
                  href="/privacy-policy"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="/contact"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
                >
                  Contact Us
                </a>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <p>For privacy inquiries: Admin@tech2design.co.uk | +44 20 1234 5678</p>
                <p>Address: 1 The Street, Mayfair, London W1J 8AJ</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-stone-700 hover:bg-gray-200 dark:hover:bg-stone-600 rounded-lg transition-colors"
              >
                Decline All
              </button>
              <button
                onClick={handleAcceptSelected}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Accept Selected
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Cookie Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border border-gray-200 dark:border-stone-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Essential Cookies
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Required for the website to function properly
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                        <Check size={16} className="text-white" />
                      </div>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Always Active</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies are necessary for the website to function and cannot be switched off. 
                    They are usually only set in response to actions made by you which amount to a request 
                    for services, such as setting your privacy preferences, logging in or filling in forms.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 dark:border-stone-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Analytics Cookies
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Help us understand how visitors use our website
                      </p>
                    </div>
                    <button
                      onClick={() => handlePreferenceChange("analytics")}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        preferences.analytics
                          ? "bg-blue-500"
                          : "bg-gray-300 dark:bg-stone-600"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.analytics ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies allow us to count visits and traffic sources so we can measure and improve 
                    the performance of our site. They help us to know which pages are the most and least 
                    popular and see how visitors move around the site.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 dark:border-stone-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Marketing Cookies
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Used for personalized advertising and content
                      </p>
                    </div>
                    <button
                      onClick={() => handlePreferenceChange("marketing")}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        preferences.marketing
                          ? "bg-blue-500"
                          : "bg-gray-300 dark:bg-stone-600"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.marketing ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies may be set through our site by our advertising partners. They may be used 
                    by those companies to build a profile of your interests and show you relevant adverts on 
                    other sites.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={handleDecline}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-stone-700 hover:bg-gray-200 dark:hover:bg-stone-600 rounded-lg transition-colors"
                >
                  Decline All
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Accept All
                </button>
              </div>
              
              {/* Contact Information */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-stone-600">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Contact Information
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong>Email:</strong> Admin@tech2design.co.uk</p>
                  <p><strong>Phone:</strong> +44 20 1234 5678</p>
                  <p><strong>Address:</strong> 1 The Street, Mayfair, London W1J 8AJ</p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    For privacy inquiries or data subject rights requests, please contact us using the information above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
