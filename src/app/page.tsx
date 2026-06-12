import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import HeroBanner from '@/components/HeroBanner';
import CategoryGrid from '@/components/CategoryGrid';
import PromoBanner from '@/components/PromoBanner';
import ProductGrid from '@/components/ProductGrid';
import CollectionCards from '@/components/CollectionCards';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { products } from '@/lib/data';

export default function HomePage() {
  const newArrivals = products.filter(p => p.is_new_arrival);
  const bestSellers = products.filter(p => p.is_best_seller);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroBanner />

        {/* Categories */}
        <CategoryGrid />

        {/* Promo Banners */}
        <PromoBanner />

        {/* New Arrivals */}
        <section className="section" id="new-arrivals-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">New Arrivals</h2>
                <p className="section-subtitle">Fresh styles, just in</p>
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
                <p className="section-subtitle">Most loved by our customers</p>
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
    </>
  );
}
