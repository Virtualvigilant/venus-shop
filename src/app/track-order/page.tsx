'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Package, Clock, Truck, Home, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Order } from '@/types';
import { formatPrice } from '@/lib/data';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('orderId') || '';

  const [query, setQuery] = useState(initialId);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (searchKey: string) => {
    if (!searchKey.trim()) return;
    setSearched(true);
    try {
      const orders: Order[] = JSON.parse(localStorage.getItem('wajose_orders') || '[]');
      const found = orders.find(
        (o) =>
          o.id.toLowerCase() === searchKey.trim().toLowerCase() ||
          o.customerPhone.includes(searchKey.trim())
      );
      setSearchedOrder(found || null);
    } catch (e) {
      console.error(e);
      setSearchedOrder(null);
    }
  };

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', marginBottom: '0.5rem' }}>
          Track Your Wajose Package
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          Enter your Order ID (e.g. WJS-98741) or phone number to view live delivery status across Kenya.
        </p>
      </div>

      {/* Search Input Box */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          marginBottom: '2.5rem',
          display: 'flex',
          gap: '0.75rem',
        }}
      >
        <input
          type="text"
          placeholder="Enter Order ID (e.g. WJS-98741) or Phone Number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '0.85rem 1.25rem',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '1rem',
            outline: 'none',
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
        />
        <button
          onClick={() => handleSearch(query)}
          style={{
            background: '#c29b38',
            color: '#ffffff',
            border: 'none',
            padding: '0.85rem 1.75rem',
            borderRadius: '8px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem',
          }}
        >
          <Search size={18} /> Track
        </button>
      </div>

      {/* Results Section */}
      {searched && (
        <>
          {searchedOrder ? (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2rem',
                  borderBottom: '1px solid #f3f4f6',
                  paddingBottom: '1.25rem',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#111827' }}>
                    Order #{searchedOrder.id}
                  </h2>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-KE', { dateStyle: 'full' })}
                  </p>
                </div>
                <span
                  style={{
                    background: '#dcfce7',
                    color: '#16a34a',
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                  }}
                >
                  {searchedOrder.orderStatus.toUpperCase()}
                </span>
              </div>

              {/* Progress Timeline */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  marginBottom: '2.5rem',
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                {[
                  { step: 1, label: 'Order Placed', icon: Clock, active: true },
                  { step: 2, label: 'Processing', icon: Package, active: true },
                  { step: 3, label: 'Dispatched', icon: Truck, active: searchedOrder.orderStatus !== 'Processing' },
                  { step: 4, label: 'Delivered', icon: Home, active: searchedOrder.orderStatus === 'Delivered' },
                ].map((st, i) => {
                  const Icon = st.icon;
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: st.active ? '#c29b38' : '#f3f4f6',
                          color: st.active ? '#ffffff' : '#9ca3af',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: st.active ? 700 : 500,
                          color: st.active ? '#111827' : '#9ca3af',
                        }}
                      >
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Package Details */}
              <div
                style={{
                  background: '#fdfbf7',
                  border: '1px solid #f3f4f6',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
                  Delivery Destination
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5' }}>
                  <strong>{searchedOrder.customerName}</strong> ({searchedOrder.customerPhone})<br />
                  {searchedOrder.shippingAddress.addressLine}, {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.county}<br />
                  Total Paid: <strong>{formatPrice(searchedOrder.total)}</strong> ({searchedOrder.paymentMethod.toUpperCase()})
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '3rem',
                textAlign: 'center',
                border: '1px solid #e5e7eb',
                color: '#6b7280',
              }}
            >
              <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827' }}>
                Order Not Found
              </h3>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                We couldn't find an order matching "<strong>{query}</strong>". Please check your Order ID or phone number.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fdfbf7', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="container" style={{ flex: 1, paddingTop: '160px', paddingBottom: '5rem' }}>
        <Suspense fallback={<div>Loading order tracker...</div>}>
          <TrackOrderContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
