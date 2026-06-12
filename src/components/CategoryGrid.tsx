import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/lib/data';
import styles from './CategoryGrid.module.css';

export default function CategoryGrid() {
  return (
    <section className={`section ${styles.section}`} id="categories-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you&apos;re looking for</p>
          </div>
          <Link href="/shop" className="view-all-link">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className={`${styles.grid} stagger-children`}>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.slug}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={cat.image_url}
                  alt={cat.name}
                  width={120}
                  height={120}
                  className={styles.image}
                />
              </div>
              <span className={styles.name}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
