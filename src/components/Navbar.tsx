'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, Menu, X, ShoppingBag } from 'lucide-react';
import SearchModal from './SearchModal';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('venus-wishlist') || '[]');
    setWishlistCount(wishlist.length);

    const handleWishlistUpdate = () => {
      const updated = JSON.parse(localStorage.getItem('venus-wishlist') || '[]');
      setWishlistCount(updated.length);
    };
    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlist-updated', handleWishlistUpdate);
  }, []);

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContent}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <ShoppingBag className={styles.logoIcon} size={28} />
            <span className={styles.logoText}>Venus</span>
            <span className={styles.logoAccent}>Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className={styles.navLinks}>
            <li><Link href="/" className={styles.navLink}>Home</Link></li>
            <li><Link href="/shop" className={styles.navLink}>Shop</Link></li>
            <li><Link href="/categories/dresses" className={styles.navLink}>Dresses</Link></li>
            <li><Link href="/categories/tops" className={styles.navLink}>Tops</Link></li>
            <li><Link href="/categories/shoes" className={styles.navLink}>Shoes</Link></li>
            <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
          </ul>

          {/* Actions */}
          <div className={styles.navActions}>
            <button
              className={styles.actionBtn}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              id="search-button"
            >
              <Search size={20} />
            </button>
            <Link href="/shop?wishlist=true" className={styles.actionBtn} aria-label="Wishlist" id="wishlist-button">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className={styles.badge}>{wishlistCount}</span>
              )}
            </Link>
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <ul className={styles.mobileLinks}>
            <li><Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link></li>
            <li><Link href="/categories/dresses" onClick={() => setIsMobileMenuOpen(false)}>Dresses</Link></li>
            <li><Link href="/categories/tops" onClick={() => setIsMobileMenuOpen(false)}>Tops</Link></li>
            <li><Link href="/categories/shoes" onClick={() => setIsMobileMenuOpen(false)}>Shoes</Link></li>
            <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      </nav>

      {isSearchOpen && (
        <SearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}
