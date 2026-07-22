'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/data';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shippingFee,
    grandTotal,
    cartCount,
    applyPromoCode,
    promoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoFeedback(res);
  };

  return (
    <div className={styles.overlay} onClick={closeCartDrawer}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <ShoppingBag size={20} color="#c29b38" />
            <h2 className={styles.title}>Your Cart</h2>
            <span className={styles.itemCountBadge}>{cartCount}</span>
          </div>
          <button className={styles.closeBtn} onClick={closeCartDrawer} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyIcon}>
                <ShoppingBag size={32} />
              </div>
              <h3 className={styles.emptyTitle}>Your cart is empty</h3>
              <p className={styles.emptySubtitle}>
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                href="/shop"
                className={styles.continueShoppingBtn}
                onClick={closeCartDrawer}
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.itemList}>
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className={styles.itemCard}>
                    <div className={styles.itemImage}>
                      <Image
                        src={item.product.images[0] || '/images/product-top.png'}
                        alt={item.product.name}
                        width={75}
                        height={75}
                        style={{ objectFit: 'cover', borderRadius: '6px' }}
                      />
                    </div>
                    <div className={styles.itemInfo}>
                      <div>
                        <h4 className={styles.itemName}>{item.product.name}</h4>
                        <div className={styles.itemMeta}>
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        </div>
                      </div>

                      <div className={styles.itemPriceGroup}>
                        <span className={styles.itemPrice}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <div className={styles.quantityControl}>
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
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
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
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                      }
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo Code Section */}
              <div className={styles.promoSection}>
                <form onSubmit={handleApplyPromo} className={styles.promoForm}>
                  <input
                    type="text"
                    placeholder="Promo code (e.g. WAJOSE10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className={styles.promoInput}
                  />
                  <button type="submit" className={styles.promoBtn}>
                    Apply
                  </button>
                </form>
                {promoFeedback && (
                  <p
                    className={`${styles.promoAlert} ${
                      promoFeedback.success ? styles.promoSuccess : styles.promoError
                    }`}
                  >
                    {promoFeedback.message}
                  </p>
                )}
                {promoCode && !promoFeedback && (
                  <p className={`${styles.promoAlert} ${styles.promoSuccess}`}>
                    <Tag size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Promo code `{promoCode}` active
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className={styles.summaryRow} style={{ color: '#16a34a' }}>
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className={styles.summaryRow}>
              <span>Shipping (Nairobi & Countrywide)</span>
              <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            <Link
              href="/checkout"
              className={styles.checkoutBtn}
              onClick={closeCartDrawer}
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/cart"
              className={styles.viewCartLink}
              onClick={closeCartDrawer}
            >
              View Detailed Shopping Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
