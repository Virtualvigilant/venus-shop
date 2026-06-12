import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { collections } from '@/lib/data';
import styles from './CollectionCards.module.css';

export default function CollectionCards() {
  return (
    <section className="section" id="collections-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Explore Collections</h2>
            <p className="section-subtitle">Handpicked styles for every vibe</p>
          </div>
          <Link href="/shop" className="view-all-link">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className={styles.grid}>
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/shop?collection=${collection.slug}`}
              className={styles.card}
            >
              <Image
                src={collection.image_url}
                alt={collection.name}
                fill
                className={styles.image}
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3 className={styles.name}>{collection.name}</h3>
                <p className={styles.description}>{collection.description}</p>
                <span className={styles.link}>
                  Shop Now <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
