'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Clock, Flame } from 'lucide-react';
import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 13, minutes: 6, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

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
            <h2 className={styles.dealTitle}>Flash Deals</h2>
          </div>
          <div className={styles.countdown}>
            <Clock size={14} />
            <span>Ends in</span>
            <div className={styles.timerGroup}>
              <span className={styles.timerBlock}>{pad(timeLeft.hours)}h</span>
              <span className={styles.timerSep}>:</span>
              <span className={styles.timerBlock}>{pad(timeLeft.minutes)}m</span>
              <span className={styles.timerSep}>:</span>
              <span className={styles.timerBlock}>{pad(timeLeft.seconds)}s</span>
            </div>
          </div>
        </div>

        {/* Promo Cards Grid */}
        <div className={styles.grid}>
          <Link href="/shop?filter=sale" className={`${styles.card} ${styles.cardSale}`}>
            <Image
              src="/images/promo-flash-sale.png"
              alt="Flash Sale"
              fill
              className={styles.cardBg}
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <div className={styles.cardBadge}>
                <Flame size={14} />
                HOT DEAL
              </div>
              <h3 className={styles.cardTitle}>Up to 60% Off</h3>
              <p className={styles.cardText}>Don&apos;t miss these deals</p>
              <span className={styles.cardLink}>
                Shop Sale <ArrowRight size={14} />
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
