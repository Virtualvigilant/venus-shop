import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice, getDiscountPercentage } from '@/lib/data';
import WishlistButton from './WishlistButton';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discount = hasDiscount ? getDiscountPercentage(product.price, product.original_price!) : 0;

  return (
    <div className={styles.card} id={`product-card-${product.id}`}>
      <div className={styles.imageContainer}>
        <Link href={`/product/${product.id}`} className={styles.imageLink}>
          <Image
            src={product.images[0]}
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
            {product.category_id === '1' ? 'Dresses' :
             product.category_id === '2' ? 'Tops' :
             product.category_id === '3' ? 'Bottoms' :
             product.category_id === '4' ? 'Shoes' :
             product.category_id === '5' ? 'Accessories' : 'Sale'}
          </span>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className={styles.originalPrice}>{formatPrice(product.original_price!)}</span>
          )}
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
