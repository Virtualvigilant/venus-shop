'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/data';
import styles from './SearchModal.module.css';

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.searchBar}>
          <Search size={22} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for dresses, shoes, accessories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
            id="search-input"
          />
          <button onClick={onClose} className={styles.closeBtn} id="search-close">
            <X size={20} />
          </button>
        </div>

        {query.length > 1 && (
          <div className={styles.results}>
            {filteredProducts.length === 0 ? (
              <div className={styles.noResults}>
                <p>No results found for &ldquo;{query}&rdquo;</p>
                <span>Try searching for something else</span>
              </div>
            ) : (
              <>
                <p className={styles.resultCount}>
                  {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
                <div className={styles.resultList}>
                  {filteredProducts.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className={styles.resultItem}
                      onClick={onClose}
                    >
                      <div className={styles.resultImage}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={60}
                          height={60}
                          style={{ objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </div>
                      <div className={styles.resultInfo}>
                        <span className={styles.resultName}>{product.name}</span>
                        <span className={styles.resultPrice}>{formatPrice(product.price)}</span>
                      </div>
                      <ArrowRight size={16} className={styles.resultArrow} />
                    </Link>
                  ))}
                </div>
                {filteredProducts.length > 6 && (
                  <Link
                    href={`/shop?search=${query}`}
                    className={styles.viewAll}
                    onClick={onClose}
                  >
                    View all {filteredProducts.length} results
                  </Link>
                )}
              </>
            )}
          </div>
        )}

        {query.length <= 1 && (
          <div className={styles.suggestions}>
            <p className={styles.suggestionsTitle}>Popular Searches</p>
            <div className={styles.suggestTags}>
              {['Dresses', 'Blazer', 'Heels', 'Bags', 'New Arrivals'].map(tag => (
                <button
                  key={tag}
                  className={styles.suggestTag}
                  onClick={() => setQuery(tag.toLowerCase())}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
