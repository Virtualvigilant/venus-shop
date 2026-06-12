import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.hero} id="hero-section">
      <div className={styles.bgGradient} />
      <div className={styles.bgPattern} />
      
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.textContent}>
          <div className={styles.tagline}>
            <Sparkles size={14} />
            <span>New Collection 2026</span>
          </div>
          <h1 className={styles.title}>
            Discover Your
            <span className={styles.titleAccent}> Style</span>
          </h1>
          <p className={styles.subtitle}>
            Explore the latest trends in women&apos;s fashion. From elegant dresses to casual chic, 
            find pieces that make you feel confident and beautiful.
          </p>
          <div className={styles.actions}>
            <Link href="/shop" className="btn btn-primary btn-lg">
              Shop Now
              <ArrowRight size={18} />
            </Link>
            <Link href="/categories/dresses" className="btn btn-secondary btn-lg">
              Explore Collections
            </Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>200+</span>
              <span className={styles.statLabel}>Products</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>New Arrivals</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>1k+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContent}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/hero-banner.png"
              alt="Venus Shop Fashion Collection"
              width={550}
              height={650}
              priority
              className={styles.heroImage}
            />
            <div className={styles.floatingCard}>
              <span className={styles.floatingEmoji}>🔥</span>
              <div>
                <span className={styles.floatingTitle}>Trending Now</span>
                <span className={styles.floatingText}>Summer Collection</span>
              </div>
            </div>
            <div className={styles.floatingCardRight}>
              <span className={styles.floatingEmoji}>💜</span>
              <div>
                <span className={styles.floatingTitle}>Best Seller</span>
                <span className={styles.floatingText}>Satin Dress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
