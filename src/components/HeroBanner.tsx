'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 13, minutes: 6, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero} id="hero-section">
      <div className={styles.heroGrid}>
        {/* Main Hero Panel */}
        <div className={styles.mainPanel}>
          <Image
            src="/images/hero-banner.png"
            alt="Wajose Fashion Collection — The Soko Edit"
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

          {/* 60% Off Badge */}
          <div className={styles.discountBadge}>
            <span className={styles.discountNumber}>60%</span>
            <span className={styles.discountText}>OFF TODAY</span>
          </div>

          {/* Carousel Dots */}
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.dotActive}`} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>

        {/* Side Cards */}
        <div className={styles.sideCards}>
          {/* Baby Center Promo */}
          <Link href="/shop?category=kids" className={styles.sideCard}>
            <Image
              src="/images/collection-office.png"
              alt="Baby Center Promo"
              fill
              className={styles.sideCardImage}
            />
            <div className={styles.sideCardOverlay} />
            <div className={styles.sideCardContent}>
              <span className={styles.sideCardLabel}>PROMOTION</span>
              <h3 className={styles.sideCardTitle}>Baby Center Promo</h3>
              <p className={styles.sideCardText}>Up to 40% off — this week only</p>
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
              <span className={styles.sideCardPrice}>FROM KSH 499 <ChevronRight size={14} /></span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
