'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, getDiscountPercentage } from '@/lib/data';
import WishlistButton from './WishlistButton';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discount = hasDiscount ? getDiscountPercentage(product.price, product.original_price!) : 0;
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes[0], product.colors[0]);
  };

  return (
    <div className={styles.card} id={`product-card-${product.id}`}>
      <div className={styles.imageContainer}>
        <Link href={`/product/${product.id}`} className={styles.imageLink}>
          <Image
            src={product.images[0] || '/images/product-top.png'}
            alt={product.name}
            width={300}
            height={380}
            className={styles.image}
          />
          <div className={styles.overlay}>
            <span className={styles.quickView}>Quick View</span>
          </div>
        </Link>
        <div className={styles.badges}>
          {product.is_new_arrival && <span className="badge badge-new">New</span>}
          {hasDiscount && <span className="badge badge-sale">-{discount}%</span>}
          {!product.in_stock && <span className="badge badge-soldout">Sold Out</span>}
        </div>
        <div className={styles.wishlistPos}>
          <WishlistButton productId={product.id} />
        </div>
      </div>
      <div className={styles.info}>
        <Link href={`/product/${product.id}`} className={styles.infoLink}>
          <span className={styles.category}>
            {product.category_id === '1' ? 'Women' :
             product.category_id === '2' ? 'Men' :
             product.category_id === '3' ? 'Kids' :
             product.category_id === '4' ? 'Accessories' :
             product.category_id === '5' ? 'Home' : 'Sale'}
          </span>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <div className={styles.priceRow}>
          <div>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className={styles.originalPrice}>{formatPrice(product.original_price!)}</span>
            )}
          </div>
          <button
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
            title="Add to cart"
            aria-label="Add to cart"
            disabled={!product.in_stock}
            style={{
              background: product.in_stock ? '#111827' : '#9ca3af',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.45rem 0.75rem',
              cursor: product.in_stock ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              transition: 'background 0.2s ease',
            }}
          >
            <ShoppingBag size={14} />
            {product.in_stock ? 'ADD' : 'OUT'}
          </button>
        </div>
        {product.colors.length > 0 && (
          <div className={styles.colors}>
            {product.colors.slice(0, 4).map((color, i) => (
              <span key={i} className={styles.colorDot} title={color}>
                {color.charAt(0)}
              </span>
            ))}
            {product.colors.length > 4 && (
              <span className={styles.moreColors}>+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
