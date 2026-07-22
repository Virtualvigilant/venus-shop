'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Truck, Smartphone, CheckCircle2, MapPin, Lock, AlertCircle, Copy, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/data';
import { Order, ShippingAddress } from '@/types';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { items, subtotal, discount, shippingFee, grandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    addressLine: 'Kilimani, Ring Road Appt 4B',
    city: 'Nairobi',
    county: 'Nairobi County',
    notes: 'Please call before delivery',
  });

  const [mpesaMessage, setMpesaMessage] = useState('');
  const [copiedTill, setCopiedTill] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [items, isProcessing, router]);

  const handleInputChange = (field: keyof ShippingAddress, val: string) => {
    setAddress((prev) => ({ ...prev, [field]: val }));
  };

  const handleCopyTill = () => {
    navigator.clipboard.writeText('3132216');
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2500);
  };

  // Extract M-Pesa transaction code (e.g. QFH382910K)
  const extractMpesaCode = (text: string): string | null => {
    if (!text.trim()) return null;
    const match = text.match(/\b([A-Z0-9]{10})\b/i);
    return match ? match[1].toUpperCase() : null;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!address.fullName || !address.phone || !address.email) {
      setValidationError('Please fill in your full name, phone number, and email address.');
      return;
    }

    if (!mpesaMessage.trim()) {
      setValidationError('Please paste your M-Pesa confirmation message below to verify payment.');
      return;
    }

    const code = extractMpesaCode(mpesaMessage);
    if (!code) {
      setValidationError('Could not locate a valid M-Pesa reference code (e.g., QFH382910K) in the pasted text. Please make sure you paste the complete SMS.');
      return;
    }

    finalizeOrder('paid', code);
  };

  const finalizeOrder = (payStatus: 'paid' | 'pending', mpesaCode?: string) => {
    setIsProcessing(true);
    const orderId = `WJS-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: orderId,
      userId: user?.id,
      customerName: address.fullName,
      customerEmail: address.email,
      customerPhone: address.phone,
      items: [...items],
      subtotal,
      shippingFee,
      discount,
      total: grandTotal,
      shippingAddress: address,
      paymentMethod: 'mpesa',
      paymentStatus: payStatus,
      orderStatus: 'Processing',
      mpesaMessage: mpesaMessage,
      mpesaCode: mpesaCode,
      createdAt: new Date().toISOString(),
    };

    // Save order to localStorage order history
    try {
      const existingOrders: Order[] = JSON.parse(localStorage.getItem('wajose_orders') || '[]');
      localStorage.setItem('wajose_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to storage', e);
    }

    clearCart();
    router.push(`/checkout/success?orderId=${orderId}`);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={`container ${styles.mainContent}`}>
        <h1 className={styles.title}>Checkout & Payment</h1>

        {validationError && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '1rem 1.25rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <AlertCircle size={20} />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className={styles.grid}>
          {/* Main Form Area */}
          <div>
            {/* Shipping Address */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <MapPin size={22} color="#c29b38" />
                1. Delivery & Contact Details
              </h2>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={address.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Phone Number (M-Pesa)</label>
                  <input
                    type="tel"
                    className={styles.input}
                    value={address.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Email Address (for Receipt)</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={address.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Street / Building / House No.</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={address.addressLine}
                    onChange={(e) => handleInputChange('addressLine', e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>City / Town</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={address.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>County</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={address.county}
                    onChange={(e) => handleInputChange('county', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Delivery Option */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Truck size={22} color="#c29b38" />
                2. Shipping Method
              </h2>
              <div className={styles.paymentOption} style={{ borderColor: '#c29b38', background: '#fdfbf7' }}>
                <div className={styles.paymentOptionLeft}>
                  <input type="radio" checked readOnly className={styles.radio} />
                  <div>
                    <div className={styles.payTitle}>Standard Countrywide Express</div>
                    <div className={styles.payDesc}>Delivered to your doorstep within 24-48 hours</div>
                  </div>
                </div>
                <span style={{ fontWeight: 700, color: '#111827' }}>
                  {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                </span>
              </div>
            </div>

            {/* Exclusive Payment Method: Lipa na M-Pesa */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Smartphone size={22} color="#16a34a" />
                3. Payment Method — Lipa na M-Pesa
              </h2>

              <div className={`${styles.paymentOption} ${styles.paymentOptionActive}`}>
                <div className={styles.paymentOptionLeft}>
                  <input
                    type="radio"
                    name="payment"
                    checked
                    readOnly
                    className={styles.radio}
                  />
                  <div>
                    <div className={styles.payTitle}>Lipa na M-Pesa (Buy Goods & Services)</div>
                    <div className={styles.payDesc}>Till Number: 3132216 (Venus)</div>
                  </div>
                </div>
                <Smartphone size={24} color="#16a34a" />
              </div>

              {/* Lipa na M-Pesa Instructions & Paste Verification Card */}
              <div className={styles.tillCard}>
                <div className={styles.tillHeader}>
                  <div className={styles.tillBadgeGroup}>
                    <span className={styles.tillLabel}>M-PESA BUY GOODS TILL NO.</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className={styles.tillNumber}>3132216</span>
                      <button
                        type="button"
                        onClick={handleCopyTill}
                        style={{
                          background: '#e5e7eb',
                          border: 'none',
                          padding: '0.35rem 0.6rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          color: '#374151',
                        }}
                      >
                        {copiedTill ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                        {copiedTill ? 'Copied!' : 'Copy Till'}
                      </button>
                    </div>
                  </div>
                  <span className={styles.storeName}>Venus</span>
                </div>

                <ol className={styles.instructionsList}>
                  <li>Go to M-Pesa menu on your phone or SIM toolkit.</li>
                  <li>Select <strong>Lipa na M-Pesa</strong> &gt; <strong>Buy Goods and Services</strong>.</li>
                  <li>Enter Till Number: <strong style={{ color: '#16a34a', fontSize: '1rem' }}>3132216</strong> (Name: <strong>Venus</strong>).</li>
                  <li>Enter Amount: <strong style={{ color: '#111827', fontSize: '1rem' }}>{formatPrice(grandTotal)}</strong>.</li>
                  <li>Enter your M-Pesa PIN and press send.</li>
                  <li>Copy and paste the M-Pesa SMS message you receive into the field below.</li>
                </ol>

                <div className={styles.msgPasteArea}>
                  <label className={styles.label} htmlFor="mpesa-msg">
                    Paste M-Pesa Confirmation Message <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <textarea
                    id="mpesa-msg"
                    className={styles.msgTextarea}
                    placeholder="e.g. QFH382910K Confirmed. Ksh 3,500.00 sent to Venus on 22/7/26 at 10:55 AM..."
                    value={mpesaMessage}
                    onChange={(e) => setMpesaMessage(e.target.value)}
                  ></textarea>

                  {mpesaMessage && extractMpesaCode(mpesaMessage) ? (
                    <div className={`${styles.verifyBadge} ${styles.verifySuccess}`}>
                      <CheckCircle2 size={16} />
                      M-Pesa Code Verified: {extractMpesaCode(mpesaMessage)}
                    </div>
                  ) : mpesaMessage.length > 5 ? (
                    <div className={`${styles.verifyBadge} ${styles.verifyError}`}>
                      <AlertCircle size={16} />
                      Please paste the complete M-Pesa SMS message.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Order Overview */}
          <div className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Order Summary</h2>

            {items.map((item, idx) => (
              <div key={idx} className={styles.itemMini}>
                <Image
                  src={item.product.images[0] || '/images/product-top.png'}
                  alt={item.product.name}
                  width={50}
                  height={50}
                  className={styles.itemMiniImg}
                />
                <div className={styles.itemMiniInfo}>
                  <div className={styles.itemMiniName}>{item.product.name}</div>
                  <div className={styles.itemMiniQty}>Qty: {item.quantity}</div>
                </div>
                <div className={styles.itemMiniPrice}>
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}

            <div className={styles.totalBox}>
              <div className={styles.itemMini} style={{ justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className={styles.itemMini} style={{ justifyContent: 'space-between', color: '#16a34a' }}>
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className={styles.itemMini} style={{ justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>
              <div
                className={styles.itemMini}
                style={{ justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}
              >
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              <button type="submit" className={styles.placeOrderBtn} disabled={isProcessing}>
                <Lock size={18} />
                {isProcessing ? 'Verifying M-Pesa Payment...' : `Complete Checkout — ${formatPrice(grandTotal)}`}
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
