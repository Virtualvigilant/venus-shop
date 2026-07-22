'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Heart, ChevronRight, Check, Share2, ShoppingBag, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import WishlistButton from '@/components/WishlistButton';
import { formatPrice, getDiscountPercentage } from '@/lib/data';
import { getStoredProducts } from '@/lib/catalog';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import styles from './product.module.css';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    setAllProducts(getStoredProducts());
  }, []);

  const product = allProducts.find(p => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
      if (product.colors.length > 0) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className={styles.main} style={{ paddingTop: '160px' }}>
          <div className="container">
            <div className={styles.notFound}>
              <h1>Product Not Found</h1>
              <p>The product you&apos;re looking for doesn&apos;t exist or has been updated.</p>
              <Link href="/shop" className="btn btn-primary">Back to Shop</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const hasDiscount = product.original_price && product.original_price > product.price;
  const discount = hasDiscount ? getDiscountPercentage(product.price, product.original_price!) : 0;
  const relatedProducts = allProducts.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    router.push('/checkout');
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Wajose! I'm interested in ordering the "${product.name}" (${formatPrice(product.price)})${selectedSize ? ` in size ${selectedSize}` : ''}${selectedColor ? `, color: ${selectedColor}` : ''}. Is it available?`
  );
  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254701163108'}?text=${whatsappMessage}`;

  return (
    <>
      <Navbar />

      <main className={styles.main} style={{ paddingTop: '160px' }}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop">Shop</Link>
            <ChevronRight size={14} />
            <span>{product.name}</span>
          </nav>

          {/* Product Detail */}
          <div className={styles.productLayout}>
            {/* Image Gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImage}>
                {hasDiscount && (
                  <span className="badge badge-sale" style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                    -{discount}%
                  </span>
                )}
                {product.is_new_arrival && (
                  <span className="badge badge-new" style={{ position: 'absolute', top: hasDiscount ? 48 : 16, left: 16, zIndex: 2 }}>
                    New
                  </span>
                )}
                <Image
                  src={product.images[0] || '/images/product-top.png'}
                  alt={product.name}
                  width={600}
                  height={700}
                  className={styles.image}
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className={styles.info}>
              <span className={styles.category}>
                {product.category_id === '1' ? 'Women' :
                 product.category_id === '2' ? 'Men' :
                 product.category_id === '3' ? 'Kids' :
                 product.category_id === '4' ? 'Accessories' :
                 product.category_id === '5' ? 'Home' : 'General'}
              </span>
              <h1 className={styles.productName}>{product.name}</h1>

              <div className={styles.priceSection}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                {hasDiscount && (
                  <>
                    <span className={styles.originalPrice}>{formatPrice(product.original_price!)}</span>
                    <span className={styles.saveBadge}>Save {discount}%</span>
                  </>
                )}
              </div>

              <p className={styles.description}>{product.description}</p>

              {/* Size Selector */}
              {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                <div className={styles.optionGroup}>
                  <label className={styles.optionLabel}>
                    Size {selectedSize && <span className={styles.selected}>— {selectedSize}</span>}
                  </label>
                  <div className={styles.sizes}>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeActive : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className={styles.optionGroup}>
                  <label className={styles.optionLabel}>
                    Color {selectedColor && <span className={styles.selected}>— {selectedColor}</span>}
                  </label>
                  <div className={styles.colors}>
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`${styles.colorBtn} ${selectedColor === color ? styles.colorActive : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {selectedColor === color && <Check size={12} />}
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Functional Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.in_stock}
                    style={{
                      flex: 1,
                      background: '#111827',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.9rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: product.in_stock ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <ShoppingBag size={20} />
                    Add to Bag
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={!product.in_stock}
                    style={{
                      flex: 1,
                      background: '#c29b38',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.9rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: product.in_stock ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Zap size={20} />
                    Buy Now
                  </button>
                </div>

                <div className={styles.actions}>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                    id="whatsapp-order-button"
                    style={{ flex: 1 }}
                  >
                    <MessageCircle size={20} />
                    Order via WhatsApp
                  </a>
                  <WishlistButton productId={product.id} />
                  <button className={styles.shareBtn} aria-label="Share">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className={styles.stockInfo}>
                {product.in_stock ? (
                  <span className={styles.inStock}>
                    <Check size={14} /> In Stock (Delivered Countrywide)
                  </span>
                ) : (
                  <span className={styles.outOfStock}>Out of Stock</span>
                )}
              </div>

              {/* Tabs */}
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === 'description' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  Details
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'sizing' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('sizing')}
                >
                  Sizing
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'care' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('care')}
                >
                  Care
                </button>
              </div>
              <div className={styles.tabContent}>
                {activeTab === 'description' && (
                  <p>{product.description}</p>
                )}
                {activeTab === 'sizing' && (
                  <p>Please refer to our sizing guide or contact us on WhatsApp for measurements. We&apos;re happy to help you find the perfect fit!</p>
                )}
                {activeTab === 'care' && (
                  <p>Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on low heat if needed. See garment label for specific care instructions.</p>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="section" id="related-products">
              <div className="section-header">
                <div>
                  <h2 className="section-title">You May Also Like</h2>
                  <p className="section-subtitle">Similar styles from this collection</p>
                </div>
              </div>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
