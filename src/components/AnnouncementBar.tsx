import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          <span>✨ New Collection Just Dropped</span>
          <span className={styles.dot}>•</span>
          <span>Free Consultation Available</span>
          <span className={styles.dot}>•</span>
          <span>DM us on WhatsApp to Order</span>
          <span className={styles.dot}>•</span>
          <span>Quality Fabrics, Trendy Styles</span>
          <span className={styles.dot}>•</span>
          <span>✨ New Collection Just Dropped</span>
          <span className={styles.dot}>•</span>
          <span>Free Consultation Available</span>
          <span className={styles.dot}>•</span>
          <span>DM us on WhatsApp to Order</span>
          <span className={styles.dot}>•</span>
          <span>Quality Fabrics, Trendy Styles</span>
          <span className={styles.dot}>•</span>
        </div>
      </div>
    </div>
  );
}
