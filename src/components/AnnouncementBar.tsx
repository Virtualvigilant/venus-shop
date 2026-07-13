import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          <span>📦 Delivered countrywide · Karibu Kenya 🇰🇪</span>
          <span className={styles.dot}>•</span>
          <span>💳 We accept M-Pesa & Paybill payments.</span>
          <span className={styles.dot}>•</span>
          <span>🔥 Fresh drops every Friday at 12 PM EAT</span>
          <span className={styles.dot}>•</span>
          <span>🔄 Enjoy easy 7-day returns on all eligible orders.</span>
          <span className={styles.dot}>•</span>
          <span>💬 WhatsApp us anytime</span>
          <span className={styles.dot}>•</span>
          <span>📦 Delivered countrywide · Karibu Kenya 🇰🇪</span>
          <span className={styles.dot}>•</span>
          <span>💳 We accept M-Pesa & Paybill payments.</span>
          <span className={styles.dot}>•</span>
          <span>🔥 Fresh drops every Friday at 12 PM EAT</span>
          <span className={styles.dot}>•</span>
          <span>🔄 Enjoy easy 7-day returns on all eligible orders.</span>
          <span className={styles.dot}>•</span>
          <span>💬 WhatsApp us anytime</span>
          <span className={styles.dot}>•</span>
        </div>
      </div>
    </div>
  );
}
