'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

const ConditionalFooter = () => {
  const pathname = usePathname();
  
  // List of routes where footer should not be shown
  const excludedRoutes = [
    '/admin',
    '/login',
    '/register'
  ];
  
  // Check if current path should exclude footer
  const shouldShowFooter = !excludedRoutes.some(route => pathname?.startsWith(route));
  
  return shouldShowFooter ? <Footer /> : null;
};

export default ConditionalFooter;
