'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Order } from '@/types';
import { formatPrice } from '@/lib/data';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      try {
        const existing: Order[] = JSON.parse(localStorage.getItem('wajose_orders') || '[]');
        const found = existing.find((o) => o.id === orderId);
        if (found) {
          setOrder(found);
        }
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
  }, [orderId]);

  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '3rem 2rem',
        border: '1px solid #e5e7eb',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          background: '#dcfce7',
          color: '#16a34a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
        }}
      >
        <CheckCircle2 size={48} />
      </div>

      <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', marginBottom: '0.5rem' }}>
        Asante! Order Confirmed
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.05rem', marginBottom: '2rem' }}>
        Your order <strong>#{orderId || 'WJS-98741'}</strong> has been placed and is currently being processed by Wajose dispatch team.
      </p>

      {order && (
        <div
          style={{
            background: '#fdfbf7',
            border: '1px solid #f3f4f6',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'left',
            marginBottom: '2rem',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            Order Summary & Payment Receipt
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <span>Customer Name:</span>
            <strong>{order.customerName}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <span>Delivery Address:</span>
            <strong>{order.shippingAddress.addressLine}, {order.shippingAddress.city}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <span>Payment Method:</span>
            <strong>Lipa na M-Pesa (Till 3132216 - Venus)</strong>
          </div>
          {order.mpesaCode && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span>M-Pesa Reference:</span>
              <strong style={{ color: '#16a34a', letterSpacing: '0.05em' }}>{order.mpesaCode}</strong>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <span>Total Paid:</span>
            <strong style={{ color: '#16a34a', fontSize: '1.05rem' }}>{formatPrice(order.total)}</strong>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link
          href={`/track-order?orderId=${orderId || ''}`}
          style={{
            background: '#c29b38',
            color: '#ffffff',
            padding: '0.85rem 1.75rem',
            borderRadius: '8px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Package size={18} />
          Track Order Progress
        </Link>
        <Link
          href="/shop"
          style={{
            background: '#111827',
            color: '#ffffff',
            padding: '0.85rem 1.75rem',
            borderRadius: '8px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fdfbf7', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '160px', paddingBottom: '5rem' }} className="container">
        <Suspense fallback={<div>Loading confirmation...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
