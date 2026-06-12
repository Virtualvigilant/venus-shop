'use client';

import { useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import { products, categories } from '@/lib/data';
import styles from './shop.module.css';

function ShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial states from URL params
  const categoryParam = searchParams.get('category') || 'all';
  const sortParam = searchParams.get('sort') || 'newest';
  const minPriceParam = Number(searchParams.get('minPrice')) || 0;
  const maxPriceParam = Number(searchParams.get('maxPrice')) || 100000;

  // Active filters in local state (which syncs back to URL)
  const selectedCategory = categoryParam;
  const selectedSort = sortParam;
  const priceRange = useMemo<[number, number]>(() => [minPriceParam, maxPriceParam], [minPriceParam, maxPriceParam]);

  // Handle updates by pushing new search params to the router
  const updateFilters = (updates: {
    category?: string;
    sort?: string;
    price?: [number, number];
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (updates.category !== undefined) {
      if (updates.category === 'all') {
        params.delete('category');
      } else {
        params.set('category', updates.category);
      }
    }
    
    if (updates.sort !== undefined) {
      if (updates.sort === 'newest') {
        params.delete('sort');
      } else {
        params.set('sort', updates.sort);
      }
    }
    
    if (updates.price !== undefined) {
      if (updates.price[0] === 0 && updates.price[1] === 100000) {
        params.delete('minPrice');
        params.delete('maxPrice');
      } else {
        params.set('minPrice', updates.price[0].toString());
        params.set('maxPrice', updates.price[1].toString());
      }
    }

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'sale') {
        result = result.filter(p => p.is_on_sale);
      } else {
        const cat = categories.find(c => c.slug === selectedCategory);
        if (cat) {
          result = result.filter(p => p.category_id === cat.id);
        }
      }
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
  }, [selectedCategory, selectedSort, priceRange]);

  return (
    <>
      <main className={styles.main}>
        <div className="container">
          {/* Page Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Shop All</h1>
            <p className={styles.subtitle}>
              Explore our complete collection of {products.length} curated fashion pieces
            </p>
          </div>

          {/* Active Filters */}
          <div className={styles.activeFilters}>
            <span className={styles.resultCount}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </span>
            {selectedCategory !== 'all' && (
              <button
                className={styles.filterChip}
                onClick={() => updateFilters({ category: 'all' })}
              >
                {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory} ×
              </button>
            )}
            {(priceRange[0] !== 0 || priceRange[1] !== 100000) && (
              <button
                className={styles.filterChip}
                onClick={() => updateFilters({ price: [0, 100000] })}
              >
                Price Filter ×
              </button>
            )}
          </div>

          {/* Shop Layout */}
          <div className={styles.layout}>
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => updateFilters({ category: cat })}
              selectedSort={selectedSort}
              onSortChange={(sort) => updateFilters({ sort: sort })}
              priceRange={priceRange}
              onPriceChange={(range) => updateFilters({ price: range })}
            />
            <div className={styles.productsArea}>
              {filteredProducts.length === 0 ? (
                <div className={styles.empty}>
                  <p>No products found matching your filters.</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      updateFilters({ category: 'all', price: [0, 100000] });
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <ProductGrid products={filteredProducts} columns={3} />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main className={styles.main}>
          <div className="container">
            <div className={styles.empty}>
              <p>Loading shop catalog...</p>
            </div>
          </div>
        </main>
      }>
        <ShopPageContent />
      </Suspense>
      <Footer />
    </>
  );
}
