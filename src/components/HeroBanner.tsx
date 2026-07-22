'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.hero} id="hero-section">
      <div className={styles.heroGrid}>
        {/* Main Hero Panel */}
        <div className={styles.mainPanel}>
          <Image
            src="/images/hero-banner.png"
            alt="Venus Fashion Collection — The Soko Edit"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className={styles.sokoTag}>
              <span className={styles.sokoTagIcon}>✨</span>
              <span>THE SOKO EDIT</span>
            </div>
            <h1 className={styles.title}>
              Wear your <span className={styles.underline}>story</span>,{'\n'}
              dress your <span className={styles.underlineBold}>home.</span>
            </h1>
            <p className={styles.subtitle}>
              Curated fashion for the whole family, plus statement carpets and door mats — delivered across Kenya.
            </p>
            <div className={styles.actions}>
              <Link href="/shop" className={`btn btn-primary btn-lg ${styles.ctaBtn}`}>
                SHOP THE EDIT
                <ChevronRight size={18} />
              </Link>
              <Link href="/shop?filter=new" className={`btn btn-secondary btn-lg ${styles.ctaOutline}`}>
                NEW ARRIVALS
              </Link>
            </div>
          </div>
        </div>

        {/* Side Cards */}
        <div className={styles.sideCards}>
          {/* Kids Collection Promo */}
          <Link href="/shop?category=kids" className={styles.sideCard}>
            <Image
              src="/images/collection-office.png"
              alt="Kids Collection Promo"
              fill
              className={styles.sideCardImage}
            />
            <div className={styles.sideCardOverlay} />
            <div className={styles.sideCardContent}>
              <span className={styles.sideCardLabel}>PROMOTION</span>
              <h3 className={styles.sideCardTitle}>Kids & Toddlers Collection</h3>
              <p className={styles.sideCardText}>Quality & adorable styles</p>
              <span className={styles.sideCardLink}>
                EXPLORE <ChevronRight size={14} />
              </span>
            </div>
          </Link>

          {/* Carpets & Doormats */}
          <Link href="/shop?category=home" className={styles.sideCard}>
            <Image
              src="/images/collection-weekend.png"
              alt="Carpets & Doormats"
              fill
              className={styles.sideCardImage}
            />
            <div className={styles.sideCardOverlay} />
            <div className={styles.sideCardContent}>
              <span className={styles.sideCardLabel}>FOR THE HOME</span>
              <h3 className={styles.sideCardTitle}>Carpets <span className={styles.ampersand}>&</span> doormats</h3>
              <span className={styles.sideCardPrice}>DISCOVER MORE <ChevronRight size={14} /></span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
