'use client';

import { useState, useEffect } from 'react';
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
import { getStoredProducts } from '@/lib/catalog';
import { Product } from '@/types';

export default function HomePage() {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    setProductList(getStoredProducts());
    const handleUpdate = () => setProductList(getStoredProducts());
    window.addEventListener('products-updated', handleUpdate);
    return () => window.removeEventListener('products-updated', handleUpdate);
  }, []);

  const newArrivals = productList.filter(p => p.is_new_arrival);
  const bestSellers = productList.filter(p => p.is_best_seller);
  const displayProducts = productList.length > 0 ? productList : [];

  return (
    <>
      <Navbar />

      <main style={{ paddingTop: '160px' }}>
        {/* Hero Section */}
        <HeroBanner />

        {/* Trust Band */}
        <TrustBand />

        {/* Categories */}
        <CategoryGrid />

        {/* Promo Banner */}
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
            <ProductGrid products={newArrivals.length > 0 ? newArrivals : displayProducts} />
          </div>
        </section>

        {/* Collections */}
        <CollectionCards />

        {/* Best Sellers */}
        {productList.length > 0 && (
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
              <ProductGrid products={bestSellers.length > 0 ? bestSellers : displayProducts} />
            </div>
          </section>
        )}

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
