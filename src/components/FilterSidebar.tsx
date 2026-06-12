'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { categories } from '@/lib/data';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  priceRange,
  onPriceChange,
}: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    sort: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const FilterContent = () => (
    <>
      {/* Category Filter */}
      <div className={styles.filterGroup}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection('category')}
        >
          <span>Category</span>
          <ChevronDown size={16} className={openSections.category ? styles.rotated : ''} />
        </button>
        {openSections.category && (
          <div className={styles.filterOptions}>
            <button
              className={`${styles.option} ${selectedCategory === 'all' ? styles.active : ''}`}
              onClick={() => onCategoryChange('all')}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.option} ${selectedCategory === cat.slug ? styles.active : ''}`}
                onClick={() => onCategoryChange(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className={styles.filterGroup}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection('price')}
        >
          <span>Price Range</span>
          <ChevronDown size={16} className={openSections.price ? styles.rotated : ''} />
        </button>
        {openSections.price && (
          <div className={styles.filterOptions}>
            <button
              className={`${styles.option} ${priceRange[0] === 0 && priceRange[1] === 100000 ? styles.active : ''}`}
              onClick={() => onPriceChange([0, 100000])}
            >
              All Prices
            </button>
            <button
              className={`${styles.option} ${priceRange[0] === 0 && priceRange[1] === 10000 ? styles.active : ''}`}
              onClick={() => onPriceChange([0, 10000])}
            >
              Under KSh 10,000
            </button>
            <button
              className={`${styles.option} ${priceRange[0] === 10000 && priceRange[1] === 20000 ? styles.active : ''}`}
              onClick={() => onPriceChange([10000, 20000])}
            >
              KSh 10,000 - KSh 20,000
            </button>
            <button
              className={`${styles.option} ${priceRange[0] === 20000 && priceRange[1] === 100000 ? styles.active : ''}`}
              onClick={() => onPriceChange([20000, 100000])}
            >
              Over KSh 20,000
            </button>
          </div>
        )}
      </div>

      {/* Sort */}
      <div className={styles.filterGroup}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection('sort')}
        >
          <span>Sort By</span>
          <ChevronDown size={16} className={openSections.sort ? styles.rotated : ''} />
        </button>
        {openSections.sort && (
          <div className={styles.filterOptions}>
            {[
              { value: 'newest', label: 'Newest First' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'name', label: 'Name: A to Z' },
            ].map(option => (
              <button
                key={option.value}
                className={`${styles.option} ${selectedSort === option.value ? styles.active : ''}`}
                onClick={() => onSortChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setIsMobileOpen(true)}
        id="filter-toggle"
      >
        <SlidersHorizontal size={18} />
        Filters
      </button>

      {/* Desktop Sidebar */}
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Filters</h3>
        <FilterContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMobileOpen(false)}>
          <div className={styles.mobilePanel} onClick={e => e.stopPropagation()}>
            <div className={styles.mobilePanelHeader}>
              <h3>Filters</h3>
              <button onClick={() => setIsMobileOpen(false)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
