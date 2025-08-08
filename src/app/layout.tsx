import type { Metadata } from "next";
import { CartProvider } from "@/components/CartContext";
import { SearchProvider } from "@/components/SearchContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import ConditionalFooter from "@/components/ConditionalFooter";
import CookieConsentWrapper from "@/components/CookieConsentWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "StyleHub - Modern Fashion eCommerce",
  description: "Discover the latest trends in fashion with StyleHub. Shop men's, women's, and kids' clothing with premium quality and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-orange-50 dark:bg-stone-900 transition-all duration-300">
        <ThemeProvider>
          <SearchProvider>
            <CartProvider>
                                  {children}
                    <ConditionalFooter />
                    <CookieConsentWrapper />
                  </CartProvider>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
