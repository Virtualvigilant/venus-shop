'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, MapPin, LogOut, ShieldAlert, ShoppingBag, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types';
import { formatPrice } from '@/lib/data';

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    try {
      const savedOrders: Order[] = JSON.parse(localStorage.getItem('wajose_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (isLoading || !user) {
    return <div style={{ minHeight: '100vh', background: '#fdfbf7', paddingTop: '160px', textAlign: 'center' }}>Loading profile...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdfbf7', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="container" style={{ flex: 1, paddingTop: '160px', paddingBottom: '5rem' }}>
        {/* Header */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e5e7eb', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '60px', height: '60px', background: '#c29b38', color: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800 }}>
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#111827' }}>
                Jambo, {user.fullName}!
              </h1>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{user.email} • {user.phone || 'No phone set'}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {user.role === 'admin' && (
              <Link href="/admin" style={{ background: '#dc2626', color: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <ShieldAlert size={16} /> Admin Portal
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              style={{ background: '#f3f4f6', color: '#374151', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>
          {/* Recent Orders */}
          <div>
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.75rem', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.75rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={20} color="#c29b38" />
                  Recent Orders ({orders.length})
                </h2>
              </div>

              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#6b7280' }}>
                  <ShoppingBag size={48} color="#9ca3af" style={{ marginBottom: '0.75rem' }} />
                  <p style={{ fontSize: '1rem', fontWeight: 600 }}>No orders placed yet</p>
                  <Link href="/shop" style={{ color: '#c29b38', fontWeight: 700, textDecoration: 'underline', marginTop: '0.5rem', display: 'inline-block' }}>
                    Browse our shop
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {orders.map((ord) => (
                    <div key={ord.id} style={{ border: '1px solid #f3f4f6', borderRadius: '10px', padding: '1.25rem', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#111827' }}>
                          Order #{ord.id}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem' }}>
                          {new Date(ord.createdAt).toLocaleDateString('en-KE', { dateStyle: 'medium' })} • {ord.items.length} item(s)
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>
                          {formatPrice(ord.total)}
                        </div>
                        <span style={{ display: 'inline-block', marginTop: '0.25rem', background: '#dcfce7', color: '#16a34a', fontSize: '0.75rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '999px' }}>
                          {ord.orderStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User Info & Address */}
          <div>
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.75rem', border: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={20} color="#c29b38" />
                Default Delivery Address
              </h2>
              <div style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.6' }}>
                <strong>{user.fullName}</strong><br />
                Kilimani, Ring Road Appt 4B<br />
                Nairobi, Kenya<br />
                Tel: {user.phone || '+254 700 000 000'}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
