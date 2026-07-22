'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import { categories } from '@/lib/data';
import { getStoredProducts } from '@/lib/catalog';
import { Product } from '@/types';
import styles from './category.module.css';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const category = categories.find(c => c.slug === slug);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    setAllProducts(getStoredProducts());
    const handleUpdate = () => setAllProducts(getStoredProducts());
    window.addEventListener('products-updated', handleUpdate);
    return () => window.removeEventListener('products-updated', handleUpdate);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!category) return [];

    let result = [...allProducts];

    // Filter by category
    if (category.slug === 'sale') {
      result = result.filter(p => p.is_on_sale);
    } else {
      result = result.filter(p => p.category_id === category.id);
    }

    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (selectedSort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [category, allProducts, selectedSort, priceRange]);

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === 'all') {
      router.push('/shop');
    } else {
      router.push(`/categories/${newSlug}`);
    }
  };

  if (!category) {
    return (
      <>
        <Navbar />
        <main className={styles.main} style={{ paddingTop: '160px' }}>
          <div className="container">
            <div className={styles.notFound}>
              <h1>Category Not Found</h1>
              <p>The category you&apos;re looking for doesn&apos;t exist.</p>
              <Link href="/shop" className="btn btn-primary">Back to Shop</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className={styles.main} style={{ paddingTop: '160px' }}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop">Shop</Link>
            <ChevronRight size={14} />
            <span>{category.name}</span>
          </nav>

          {/* Page Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>{category.name}</h1>
            {category.description && (
              <p className={styles.subtitle}>{category.description}</p>
            )}
          </div>

          {/* Active Filters */}
          <div className={styles.activeFilters}>
            <span className={styles.resultCount}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </span>
            {(priceRange[0] !== 0 || priceRange[1] !== 100000) && (
              <button
                className={styles.filterChip}
                onClick={() => setPriceRange([0, 100000])}
              >
                Price Filter ×
              </button>
            )}
          </div>

          {/* Category Layout */}
          <div className={styles.layout}>
            <FilterSidebar
              selectedCategory={category.slug}
              onCategoryChange={handleCategoryChange}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
            <div className={styles.productsArea}>
              {filteredProducts.length === 0 ? (
                <div className={styles.empty}>
                  <p>No products found in this category matching your filters.</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setPriceRange([0, 100000]);
                    }}
                  >
                    Clear Price Filter
                  </button>
                </div>
              ) : (
                <ProductGrid products={filteredProducts} columns={3} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
