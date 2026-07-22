'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, CheckCircle, Truck, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Order } from '@/types';
import { formatPrice } from '@/lib/data';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const savedOrders: Order[] = JSON.parse(localStorage.getItem('wajose_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateStatus = (orderId: string, status: Order['orderStatus']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o));
    setOrders(updated);
    localStorage.setItem('wajose_orders', JSON.stringify(updated));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fdfbf7', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="container" style={{ flex: 1, paddingTop: '160px', paddingBottom: '5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#6b7280', fontSize: '0.9rem', textDecoration: 'none', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827' }}>Customer Orders Registry</h1>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e5e7eb' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
              <Package size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
              <h3>No Customer Orders Found</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                When customers complete checkouts, their orders will appear here automatically.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {orders.map((ord) => (
                <div key={ord.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', background: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#111827' }}>Order #{ord.id}</span>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.2rem' }}>
                        Customer: <strong>{ord.customerName}</strong> ({ord.customerEmail} | {ord.customerPhone})
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#111827' }}>
                        {formatPrice(ord.total)}
                      </div>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateStatus(ord.id, e.target.value as Order['orderStatus'])}
                        style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontWeight: 700, fontSize: '0.85rem' }}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.88rem', color: '#4b5563' }}>
                    <strong>Delivery Destination:</strong> {ord.shippingAddress.addressLine}, {ord.shippingAddress.city}, {ord.shippingAddress.county}
                  </div>

                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed #e5e7eb', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {ord.items.map((it, i) => (
                      <span key={i} style={{ background: '#ffffff', border: '1px solid #e5e7eb', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                        {it.product.name} x{it.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
