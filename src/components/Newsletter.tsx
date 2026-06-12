'use client';

import { useState } from 'react';
import { Send, Crown } from 'lucide-react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className={styles.section} id="newsletter-section">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.iconWrapper}>
              <Crown size={28} />
            </div>
            <h2 className={styles.title}>Join Venus Club</h2>
            <p className={styles.subtitle}>
              Get exclusive offers, early access to new arrivals, and styling tips delivered to your inbox.
            </p>
            {submitted ? (
              <div className={styles.success}>
                <span>✨ Welcome to Venus Club! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                  id="newsletter-email"
                />
                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} id="newsletter-submit">
                  Subscribe <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
