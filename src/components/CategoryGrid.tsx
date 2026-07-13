'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data';
import styles from './CategoryGrid.module.css';

export default function CategoryGrid() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', name: 'All' },
    ...categories.map(c => ({ id: c.slug, name: c.name })),
  ];

  return (
    <section className={styles.section} id="categories-section">
      <div className="container">
        <div className={styles.header}>
          <div>
            <h2 className={styles.sectionTitle}>Soko Market</h2>
            <p className={styles.sectionSubtitle}>Shop by category</p>
          </div>
        </div>
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.id === 'all' ? '/shop' : `/categories/${tab.id}`}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
