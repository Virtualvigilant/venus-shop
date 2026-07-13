import { Truck, ShieldCheck, Tag, Smartphone } from 'lucide-react';
import styles from './TrustBand.module.css';

export default function TrustBand() {
  return (
    <section className={styles.band} id="trust-band">
      <div className={`container ${styles.content}`}>
        <div className={styles.item}>
          <div className={styles.iconWrap}>
            <Truck size={20} />
          </div>
          <div>
            <span className={styles.title}>Fast Delivery</span>
            <span className={styles.text}>1–3 days nationwide</span>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <div className={styles.iconWrap}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className={styles.title}>Quality Promise</span>
            <span className={styles.text}>Inspected before ship</span>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <div className={styles.iconWrap}>
            <Tag size={20} />
          </div>
          <div>
            <span className={styles.title}>Daily Soko</span>
            <span className={styles.text}>Up to 60% off</span>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <div className={styles.iconWrap}>
            <Smartphone size={20} />
          </div>
          <div>
            <span className={styles.title}>M-Pesa & COD</span>
            <span className={styles.text}>Pay your way</span>
          </div>
        </div>
      </div>
    </section>
  );
}
