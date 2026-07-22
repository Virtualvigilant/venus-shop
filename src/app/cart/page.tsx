'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/data';
import styles from './cart.module.css';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    grandTotal,
    clearCart,
  } = useCart();

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={`container ${styles.mainContent}`}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Shopping Cart ({items.length} items)</h1>
        </div>

        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingBag size={56} color="#c29b38" style={{ marginBottom: '1rem' }} />
            <h2>Your cart is empty</h2>
            <p style={{ color: '#6b7280', margin: '0.5rem 0 1.5rem 0' }}>
              Explore our wide collection of Kenyan fashion, smartwear, and home décor!
            </p>
            <Link
              href="/shop"
              style={{
                background: '#111827',
                color: '#ffffff',
                padding: '0.85rem 2rem',
                borderRadius: '6px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {/* Cart Items List */}
            <div className={styles.cartList}>
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${idx}`} className={styles.cartCard}>
                  <Image
                    src={item.product.images[0] || '/images/product-top.png'}
                    alt={item.product.name}
                    width={90}
                    height={90}
                    className={styles.itemImage}
                  />

                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.product.name}</h3>
                    <div className={styles.itemMeta}>
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>

                    <div className={styles.priceGroup}>
                      <span className={styles.itemPrice}>
                        {formatPrice(item.product.price)}
                      </span>

                      <div className={styles.qtyBox}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                        >
                          <Minus size={14} />
                        </button>
                        <span className={styles.qtyNum}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    className={styles.deleteBtn}
                    onClick={() =>
                      removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                    }
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button
                  onClick={clearCart}
                  style={{
                    background: 'transparent',
                    border: '1px solid #d1d5db',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    color: '#6b7280',
                  }}
                >
                  Clear Cart
                </button>
                <Link
                  href="/shop"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#c29b38',
                    textDecoration: 'underline',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.row}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className={styles.row} style={{ color: '#16a34a', fontWeight: 600 }}>
                  <span>Promo Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className={styles.row}>
                <span>Delivery (Standard Countrywide)</span>
                <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>

              <div className={styles.totalRow}>
                <span>Total Amount</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              <Link href="/checkout" className={styles.checkoutBtn}>
                Checkout Now
                <ArrowRight size={20} />
              </Link>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#6b7280',
                }}
              >
                <ShieldCheck size={18} color="#16a34a" />
                <span>Encrypted & Instant M-Pesa / Card Checkout</span>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
