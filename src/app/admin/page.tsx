'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert, TrendingUp, Package, ShoppingBag, Users, Plus, CheckCircle, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types';
import { products, formatPrice } from '@/lib/data';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const savedOrders: Order[] = JSON.parse(localStorage.getItem('wajose_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#fdfbf7', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main className="container" style={{ flex: 1, paddingTop: '160px', paddingBottom: '5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto', background: '#ffffff', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <ShieldAlert size={48} color="#dc2626" style={{ marginBottom: '1rem' }} />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>Admin Access Required</h1>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '2rem' }}>
              You are currently not logged in as an Administrator. Please sign in with an administrator account to access the control panel.
            </p>
            <Link
              href="/auth/login"
              style={{ background: '#dc2626', color: '#ffffff', textDecoration: 'none', padding: '0.85rem 1.5rem', borderRadius: '8px', fontWeight: 800, display: 'inline-block', fontSize: '1rem' }}
            >
              Sign In as Admin
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

  const updateOrderStatus = (orderId: string, newStatus: Order['orderStatus']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('wajose_orders', JSON.stringify(updated));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="container" style={{ flex: 1, paddingTop: '160px', paddingBottom: '5rem' }}>
        {/* Admin Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            background: '#ffffff',
            padding: '1.5rem 2rem',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={20} color="#dc2626" />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#dc2626', letterSpacing: '0.05em' }}>
                ADMIN MANAGEMENT PORTAL
              </span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>Dashboard & Store Control</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link
              href="/admin/products"
              style={{
                background: '#0f172a',
                color: '#ffffff',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
              }}
            >
              <Plus size={16} /> Manage Products
            </Link>
            <Link
              href="/admin/orders"
              style={{
                background: '#c29b38',
                color: '#ffffff',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
              }}
            >
              <Package size={16} /> Manage Orders ({orders.length})
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Total Revenue</span>
              <TrendingUp size={20} color="#16a34a" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>{formatPrice(totalSales)}</div>
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '0.25rem' }}>
              From completed checkouts
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Total Orders</span>
              <Package size={20} color="#3b82f6" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>{orders.length}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, marginTop: '0.25rem' }}>
              Live customer orders
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Active Products</span>
              <ShoppingBag size={20} color="#c29b38" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>{products.length}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, marginTop: '0.25rem' }}>
              Catalog items
            </div>
          </div>
        </div>

        {/* Recent Orders List */}
        <div
          style={{
            background: '#ffffff',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
            Recent Orders & Status Controls
          </h2>

          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
              <Package size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p style={{ fontWeight: 600 }}>No orders recorded yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.map((o) => (
                <div
                  key={o.id}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    background: '#f8fafc',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>
                      Order #{o.id} · <span style={{ color: '#16a34a' }}>{formatPrice(o.total)}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Customer: <strong>{o.customerName}</strong> ({o.customerPhone}) · Paid via M-Pesa ({o.mpesaCode || 'Verified'})
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Status:</span>
                    <select
                      value={o.orderStatus}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        background: '#ffffff',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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
