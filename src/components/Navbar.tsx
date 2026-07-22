'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Heart, Menu, X, ShoppingBag, User, Phone, HelpCircle, MapPin, ChevronDown, CheckCircle2, ShieldAlert, LogOut } from 'lucide-react';
import SearchModal from './SearchModal';
import AnnouncementBar from './AnnouncementBar';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const { user, logout } = useAuth();
  const { cartCount, openCartDrawer, toastMessage } = useCart();
  const router = useRouter();

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

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <>
      <header className={styles.headerWrapper}>
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className={styles.toastBanner}>
            <CheckCircle2 size={16} color="#eab308" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Utility Bar */}
        <div className={styles.topBar}>
          <div className={`container ${styles.topBarContent}`}>
            <div className={styles.topBarLeft}>
              <a href="tel:+254701163108" className={styles.topBarItem} style={{ textDecoration: 'none' }}>
                <Phone size={12} />
                +254701163108
              </a>
              <span className={styles.topBarDivider}>|</span>
              <span className={styles.topBarItem}>
                📦 Delivered countrywide
              </span>
              <span className={styles.topBarDivider}>|</span>
              <span className={styles.topBarItem}>
                🇰🇪 Karibu Wajose Kenya
              </span>
            </div>
            <div className={styles.topBarRight}>
              <Link href="/contact" className={styles.topBarLink}>
                <HelpCircle size={12} />
                Help Centre
              </Link>
              <Link href="/track-order" className={styles.topBarLink}>
                <MapPin size={12} />
                Track Order
              </Link>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {user.role === 'admin' ? (
                    <Link href="/admin" className={styles.topBarLink} style={{ color: '#ef4444', fontWeight: 800 }}>
                      <ShieldAlert size={13} />
                      Admin Portal
                    </Link>
                  ) : (
                    <Link href="/account" className={styles.topBarLink}>
                      <User size={12} />
                      My Account
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className={styles.topBarLink}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                    title="Log out of account"
                  >
                    <LogOut size={12} />
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/auth/login" className={styles.topBarLink}>
                  <User size={12} />
                  Sign in
                </Link>
              )}
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
              {user ? (
                <div className={styles.userMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      style={{
                        background: '#dc2626',
                        color: '#ffffff',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 2px 6px rgba(220, 38, 38, 0.3)',
                      }}
                      id="admin-portal-header-btn"
                    >
                      <ShieldAlert size={14} />
                      ADMIN PORTAL
                    </Link>
                  )}

                  <Link
                    href={user.role === 'admin' ? '/admin' : '/account'}
                    className={styles.userChip}
                    title={user.fullName}
                  >
                    <div className={styles.userAvatar}>
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.fullName.split(' ')[0]}</span>
                    {user.role === 'admin' && <span className={styles.adminBadge}>Admin</span>}
                  </Link>

                  <button
                    onClick={handleLogout}
                    style={{
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      padding: '0.4rem 0.6rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#4b5563',
                    }}
                    title="Sign Out"
                    id="logout-btn-nav"
                  >
                    <LogOut size={14} color="#dc2626" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/auth/login" className={styles.actionBtn} aria-label="Sign in" id="signin-button">
                  <User size={20} />
                  <span className={styles.actionLabel}>Sign in</span>
                </Link>
              )}

              <Link href="/shop?wishlist=true" className={styles.actionBtn} aria-label="Wishlist" id="wishlist-button">
                <Heart size={20} />
                <span className={styles.actionLabel}>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className={styles.badge}>{wishlistCount}</span>
                )}
              </Link>

              <button
                className={styles.cartBtn}
                onClick={openCartDrawer}
                aria-label="Open cart"
                id="cart-button"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
              </button>

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
              <li><Link href="/track-order" className={styles.navLink}>TRACK ORDER</Link></li>
              {user?.role === 'admin' && (
                <li>
                  <Link
                    href="/admin"
                    className={styles.navLink}
                    style={{
                      color: '#dc2626',
                      fontWeight: 800,
                      background: '#fef2f2',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid #fecaca',
                    }}
                  >
                    <ShieldAlert size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    ADMIN PORTAL
                  </Link>
                </li>
              )}
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
            <li><Link href="/track-order" onClick={() => setIsMobileMenuOpen(false)}>Track Order</Link></li>
            <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact & Support</Link></li>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <li>
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ color: '#dc2626', fontWeight: 800 }}
                    >
                      ⚡ Admin Portal
                    </Link>
                  </li>
                )}
                <li>
                  <Link href={user.role === 'admin' ? '/admin' : '/account'} onClick={() => setIsMobileMenuOpen(false)}>
                    {user.role === 'admin' ? 'Admin Profile' : 'My Account'}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 800, padding: 0, cursor: 'pointer', fontSize: '1rem' }}
                  >
                    🚪 Sign Out ({user.fullName.split(' ')[0]})
                  </button>
                </li>
              </>
            ) : (
              <li><Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In / Register</Link></li>
            )}
          </ul>
        </div>
      </header>

      {isSearchOpen && (
        <SearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}
