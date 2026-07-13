import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import TrustBand from '@/components/TrustBand';
import CategoryGrid from '@/components/CategoryGrid';
import PromoBanner from '@/components/PromoBanner';
import ProductGrid from '@/components/ProductGrid';
import CollectionCards from '@/components/CollectionCards';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { products } from '@/lib/data';

export default function HomePage() {
  const newArrivals = products.filter(p => p.is_new_arrival);
  const bestSellers = products.filter(p => p.is_best_seller);

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section — The Soko Edit */}
        <HeroBanner />

        {/* Trust Band — Fast Delivery, Quality, M-Pesa */}
        <TrustBand />

        {/* Soko Market Categories */}
        <CategoryGrid />

        {/* Flash Deals with Countdown */}
        <PromoBanner />

        {/* Just For You — New Arrivals */}
        <section className="section" id="new-arrivals-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">Just For You</h2>
                <p className="section-subtitle">Handpicked styles based on what&apos;s trending</p>
              </div>
              <Link href="/shop?filter=new" className="view-all-link">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <ProductGrid products={newArrivals} />
          </div>
        </section>

        {/* Collections */}
        <CollectionCards />

        {/* Best Sellers */}
        <section className="section" id="best-sellers-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">Best Sellers</h2>
                <p className="section-subtitle">Most loved by our customers across Kenya</p>
              </div>
              <Link href="/shop?filter=bestseller" className="view-all-link">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <ProductGrid products={bestSellers} />
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
