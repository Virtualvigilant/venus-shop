'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Flame } from 'lucide-react';
import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  return (
    <section className="section" id="promo-section">
      <div className="container">
        {/* Flash Deal Header */}
        <div className={styles.dealHeader}>
          <div className={styles.dealTitleGroup}>
            <div className={styles.liveBadge}>
              <Zap size={12} />
              <span>Limited Drop · Live now</span>
            </div>
            <h2 className={styles.dealTitle}>Special Collections</h2>
          </div>
        </div>

        {/* Promo Cards Grid */}
        <div className={styles.grid}>
          <Link href="/shop?filter=sale" className={`${styles.card} ${styles.cardSale}`}>
            <Image
              src="/images/promo-flash-sale.png"
              alt="Special Offers"
              fill
              className={styles.cardBg}
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <div className={styles.cardBadge}>
                <Flame size={14} />
                FEATURED
              </div>
              <h3 className={styles.cardTitle}>Special Offers</h3>
              <p className={styles.cardText}>Explore discounted favorites</p>
              <span className={styles.cardLink}>
                Shop Now <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          <Link href="/shop?filter=new" className={`${styles.card} ${styles.cardNew}`}>
            <Image
              src="/images/promo-new-arrivals.png"
              alt="New Arrivals"
              fill
              className={styles.cardBg}
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <div className={styles.cardBadge}>
                ✨ FRESH DROP
              </div>
              <h3 className={styles.cardTitle}>New Arrivals</h3>
              <p className={styles.cardText}>Just landed this week</p>
              <span className={styles.cardLink}>
                Explore <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          <Link href="/shop?filter=bestseller" className={`${styles.card} ${styles.cardTrend}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardBadge}>
                🔥 TRENDING
              </div>
              <h3 className={styles.cardTitle}>Best Sellers</h3>
              <p className={styles.cardText}>Most loved by our customers</p>
              <span className={styles.cardLink}>
                See What&apos;s Hot <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
