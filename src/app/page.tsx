import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import ContactPage from '@/app/contact/page';

export default function Home() {
  return (
    <main className="min-h-screen bg-white transition-all duration-300" style={{ backgroundColor: '#fff7ed' }} data-home-page="true">
      <Header />
      <Hero />
      <FeaturedProducts />
      <ContactPage />
    </main>
  );
}
