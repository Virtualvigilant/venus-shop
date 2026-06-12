import Link from 'next/link';
import { ShoppingBag, MessageCircle, Heart, Gem, Truck } from 'lucide-react';
import styles from './Footer.module.css';

const Instagram = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);


export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Values Bar */}
      <div className={styles.valuesBar}>
        <div className="container">
          <div className={styles.values}>
            <div className={styles.value}>
              <Gem size={22} className={styles.valueIcon} />
              <div>
                <span className={styles.valueTitle}>Quality Fabrics</span>
                <span className={styles.valueText}>Premium materials for lasting style</span>
              </div>
            </div>
            <div className={styles.value}>
              <Heart size={22} className={styles.valueIcon} />
              <div>
                <span className={styles.valueTitle}>Trendy Styles</span>
                <span className={styles.valueText}>Latest fashion, always in vogue</span>
              </div>
            </div>
            <div className={styles.value}>
              <Truck size={22} className={styles.valueIcon} />
              <div>
                <span className={styles.valueTitle}>Easy Ordering</span>
                <span className={styles.valueText}>Quick WhatsApp ordering</span>
              </div>
            </div>
            <div className={styles.value}>
              <MessageCircle size={22} className={styles.valueIcon} />
              <div>
                <span className={styles.valueTitle}>24/7 Support</span>
                <span className={styles.valueText}>We&apos;re always here to help</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brand}>
              <div className={styles.logo}>
                <ShoppingBag size={24} />
                <span className={styles.logoText}>Venus</span>
                <span className={styles.logoAccent}>Shop</span>
              </div>
              <p className={styles.brandText}>
                Discover your unique style with Venus Shop. We curate the finest fashion pieces 
                to help you look and feel your best.
              </p>
              <div className={styles.socials}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="WhatsApp">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Quick Links</h4>
              <ul className={styles.links}>
                <li><Link href="/shop">All Products</Link></li>
                <li><Link href="/categories/dresses">Dresses</Link></li>
                <li><Link href="/categories/tops">Tops</Link></li>
                <li><Link href="/categories/shoes">Shoes</Link></li>
                <li><Link href="/categories/accessories">Accessories</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Help</h4>
              <ul className={styles.links}>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/contact">FAQs</Link></li>
                <li><Link href="/contact">Sizing Guide</Link></li>
                <li><Link href="/contact">How to Order</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Get in Touch</h4>
              <ul className={styles.contactList}>
                <li>
                  <MessageCircle size={14} />
                  <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </li>
                <li>
                  <Instagram size={14} />
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    @venusshop
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomContent}>
            <p>&copy; {new Date().getFullYear()} Venus Shop. All rights reserved.</p>
            <p className={styles.madeWith}>
              Made with <Heart size={12} fill="currentColor" className={styles.heartIcon} /> for fashion lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
