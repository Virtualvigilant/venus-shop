import Link from 'next/link';
import { ShoppingBag, MessageCircle, Heart, Truck, Phone, Mail, MapPin } from 'lucide-react';
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

const TikTok = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
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
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);


export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brand}>
              <div className={styles.logo}>
                <div className={styles.logoMark}>
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <span className={styles.logoText}>Wajose.</span>
                  <span className={styles.logoTagline}>SMART · WEAR · HOME</span>
                </div>
              </div>
              <p className={styles.brandText}>
                Where style meets the warmth of home. Curated fashion for the whole family, plus statement carpets and doormats — delivered across Kenya.
              </p>
              <div className={styles.socials}>
                <a href="https://instagram.com/wajose" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://facebook.com/wajose" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://twitter.com/wajose" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="https://tiktok.com/@wajose" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="TikTok">
                  <TikTok size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Shop</h4>
              <ul className={styles.links}>
                <li><Link href="/categories/women">Women</Link></li>
                <li><Link href="/categories/men">Men</Link></li>
                <li><Link href="/categories/kids">Kids</Link></li>
                <li><Link href="/categories/accessories">Accessories</Link></li>
                <li><Link href="/categories/home">Home & Living</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Help</h4>
              <ul className={styles.links}>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/contact">FAQs</Link></li>
                <li><Link href="/contact">Sizing Guide</Link></li>
                <li><Link href="/contact">Returns & Exchanges</Link></li>
                <li><Link href="/contact">Track Your Order</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Get in Touch</h4>
              <ul className={styles.contactList}>
                <li>
                  <Phone size={14} />
                  <a href="tel:+254700000000">+254 700 000 000</a>
                </li>
                <li>
                  <MessageCircle size={14} />
                  <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </li>
                <li>
                  <Mail size={14} />
                  <a href="mailto:hello@wajose.co.ke">hello@wajose.co.ke</a>
                </li>
                <li>
                  <MapPin size={14} />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
              <div className={styles.paymentMethods}>
                <span className={styles.paymentTitle}>We Accept</span>
                <div className={styles.paymentIcons}>
                  <span className={styles.paymentBadge}>M-Pesa</span>
                  <span className={styles.paymentBadge}>Visa</span>
                  <span className={styles.paymentBadge}>COD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomContent}>
            <p>&copy; {new Date().getFullYear()} Wajose. All rights reserved.</p>
            <p className={styles.madeWith}>
              Made with <Heart size={12} fill="currentColor" className={styles.heartIcon} /> in Kenya 🇰🇪
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
