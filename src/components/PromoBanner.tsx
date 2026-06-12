import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Sparkles, TrendingUp } from 'lucide-react';
import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  return (
    <section className="section" id="promo-section">
      <div className="container">
        <div className={styles.grid}>
          <Link href="/shop?filter=sale" className={`${styles.card} ${styles.cardSale}`}>
            <Image
              src="/images/promo-flash-sale.png"
              alt="Flash Sale"
              fill
              className={styles.cardBg}
            />
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>
                <Zap size={20} />
              </div>
              <h3 className={styles.cardTitle}>Flash Sale</h3>
              <p className={styles.cardText}>Limited time deals up to 40% off</p>
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
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>
                <Sparkles size={20} />
              </div>
              <h3 className={styles.cardTitle}>New Arrivals</h3>
              <p className={styles.cardText}>Fresh styles just in</p>
              <span className={styles.cardLink}>
                Explore <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          <Link href="/shop?filter=bestseller" className={`${styles.card} ${styles.cardTrend}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>
                <TrendingUp size={20} />
              </div>
              <h3 className={styles.cardTitle}>Trending</h3>
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
