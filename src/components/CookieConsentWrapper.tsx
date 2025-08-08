"use client";

import CookieConsent from "./CookieConsent";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsentWrapper() {
  const handleAccept = (preferences: CookiePreferences) => {
    console.log("Cookie preferences accepted:", preferences);
    // Here you would typically initialize analytics, marketing tools, etc.
    // based on the user's consent preferences
  };

  const handleDecline = () => {
    console.log("Cookies declined");
    // Here you would ensure no non-essential cookies are set
  };

  return (
    <CookieConsent 
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  );
}
