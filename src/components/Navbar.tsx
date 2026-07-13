'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, Menu, X, ShoppingBag, User, Phone, HelpCircle, MapPin, ChevronDown } from 'lucide-react';
import SearchModal from './SearchModal';
import AnnouncementBar from './AnnouncementBar';
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
      <header className={styles.headerWrapper}>
        {/* Top Utility Bar */}
        <div className={styles.topBar}>
          <div className={`container ${styles.topBarContent}`}>
            <div className={styles.topBarLeft}>
              <span className={styles.topBarItem}>
                <Phone size={12} />
                +254 700 000 000
              </span>
              <span className={styles.topBarDivider}>|</span>
              <span className={styles.topBarItem}>
                📦 Delivered countrywide
              </span>
              <span className={styles.topBarDivider}>|</span>
              <span className={styles.topBarItem}>
                🇰🇪 Karibu Kenya
              </span>
            </div>
            <div className={styles.topBarRight}>
              <Link href="/contact" className={styles.topBarLink}>
                <HelpCircle size={12} />
                Help Centre
              </Link>
              <Link href="/shop?track=true" className={styles.topBarLink}>
                <MapPin size={12} />
                Track Order
              </Link>
              <Link href="/contact" className={styles.topBarLink}>
                <User size={12} />
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
          <div className={`container ${styles.navContent}`}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <div className={styles.logoMark}>
                <ShoppingBag size={18} />
              </div>
              <div className={styles.logoTextGroup}>
                <span className={styles.logoText}>Wajose.</span>
                <span className={styles.logoTagline}>SMART · WEAR · HOME</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search ankara, oxford, rugs..."
                className={styles.searchInput}
                onFocus={() => setIsSearchOpen(true)}
                readOnly
                id="search-input"
              />
              <button className={styles.searchBtn} onClick={() => setIsSearchOpen(true)} id="search-button">
                <Search size={16} />
                FIND
              </button>
            </div>

            {/* Actions */}
            <div className={styles.navActions}>
              <Link href="/contact" className={styles.actionBtn} aria-label="Sign in" id="signin-button">
                <User size={20} />
                <span className={styles.actionLabel}>Sign in</span>
              </Link>
              <Link href="/shop?wishlist=true" className={styles.actionBtn} aria-label="Wishlist" id="wishlist-button">
                <Heart size={20} />
                <span className={styles.actionLabel}>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className={styles.badge}>{wishlistCount}</span>
                )}
              </Link>
              <Link href="/shop" className={styles.cartBtn} aria-label="Cart" id="cart-button">
                <ShoppingBag size={20} />
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
        </nav>

        {/* Navigation Links Bar */}
        <div className={styles.navLinksBar}>
          <div className={`container ${styles.navLinksContent}`}>
            <ul className={styles.navLinks}>
              <li><Link href="/" className={`${styles.navLink} ${styles.navLinkActive}`}>HOME</Link></li>
              <li>
                <Link href="/shop" className={styles.navLink}>
                  SHOP <ChevronDown size={12} />
                </Link>
              </li>
              <li><Link href="/shop?filter=new" className={styles.navLink}>NEW IN</Link></li>
              <li>
                <Link href="/shop?view=collections" className={styles.navLink}>
                  COLLECTIONS <ChevronDown size={12} />
                </Link>
              </li>
              <li><Link href="/shop?wishlist=true" className={styles.navLink}>WISHLIST</Link></li>
            </ul>
          </div>
        </div>

        {/* Announcement Marquee */}
        <AnnouncementBar />

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <ul className={styles.mobileLinks}>
            <li><Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link></li>
            <li><Link href="/shop?filter=new" onClick={() => setIsMobileMenuOpen(false)}>New In</Link></li>
            <li><Link href="/shop?view=collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link></li>
            <li><Link href="/shop?wishlist=true" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</Link></li>
            <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      </header>

      {isSearchOpen && (
        <SearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}
