'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Trash2, Edit3, Upload, X, Image as ImageIcon, ShieldAlert, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatPrice, categories } from '@/lib/data';
import { getStoredProducts, saveStoredProducts } from '@/lib/catalog';
import { Product } from '@/types';
import { useAuth } from '@/context/AuthContext';

export default function AdminProductsPage() {
  const { user } = useAuth();
  const [productList, setProductList] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [categoryId, setCategoryId] = useState('1');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState('S, M, L, XL');
  const [colors, setColors] = useState('Black, White');
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);

  // Image Upload State
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setProductList(getStoredProducts());
  }, []);

  const resetForm = () => {
    setName('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setSizes('S, M, L, XL');
    setColors('Black, White');
    setIsNewArrival(true);
    setIsBestSeller(false);
    setIsOnSale(false);
    setImages([]);
    setImageUrlInput('');
    setEditingProduct(null);
    setUploadError(null);
  };

  const handleStartAdd = () => {
    resetForm();
    setShowAddForm(!showAddForm);
  };

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setPrice(prod.price.toString());
    setOriginalPrice(prod.original_price ? prod.original_price.toString() : '');
    setCategoryId(prod.category_id);
    setDescription(prod.description);
    setSizes(prod.sizes.join(', '));
    setColors(prod.colors.join(', '));
    setIsNewArrival(prod.is_new_arrival);
    setIsBestSeller(prod.is_best_seller);
    setIsOnSale(prod.is_on_sale);
    setImages(prod.images || []);
    setShowAddForm(true);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError(null);
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select valid image files (PNG, JPG, WEBP).');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Image size should be under 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const finalImages = images.length > 0 ? images : ['/images/product-top.png'];

    if (editingProduct) {
      // Update existing product
      const updatedList = productList.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name,
            slug: name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
            description: description || 'High quality Wajose lifestyle product.',
            price: parseFloat(price),
            original_price: originalPrice ? parseFloat(originalPrice) : null,
            category_id: categoryId,
            sizes: sizes.split(',').map((s) => s.trim()).filter(Boolean),
            colors: colors.split(',').map((c) => c.trim()).filter(Boolean),
            images: finalImages,
            is_new_arrival: isNewArrival,
            is_best_seller: isBestSeller,
            is_on_sale: isOnSale,
          };
        }
        return p;
      });

      setProductList(updatedList);
      saveStoredProducts(updatedList);
    } else {
      // Create new product
      const newProd: Product = {
        id: `prod_${Date.now()}`,
        name,
        slug: name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
        description: description || 'High quality Wajose lifestyle product.',
        price: parseFloat(price),
        original_price: originalPrice ? parseFloat(originalPrice) : null,
        category_id: categoryId,
        sizes: sizes.split(',').map((s) => s.trim()).filter(Boolean),
        colors: colors.split(',').map((c) => c.trim()).filter(Boolean),
        images: finalImages,
        is_new_arrival: isNewArrival,
        is_best_seller: isBestSeller,
        is_on_sale: isOnSale,
        in_stock: true,
        created_at: new Date().toISOString(),
      };

      const updatedList = [newProd, ...productList];
      setProductList(updatedList);
      saveStoredProducts(updatedList);
    }

    resetForm();
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = productList.filter((p) => p.id !== id);
    setProductList(updated);
    saveStoredProducts(updated);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#fdfbf7', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main className="container" style={{ flex: 1, paddingTop: '160px', paddingBottom: '5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto', background: '#ffffff', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <ShieldAlert size={48} color="#dc2626" style={{ marginBottom: '1rem' }} />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>Admin Access Required</h1>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Please sign in with administrator credentials to manage store inventory.
            </p>
            <Link href="/auth/login" style={{ background: '#dc2626', color: '#ffffff', padding: '0.85rem 1.5rem', borderRadius: '8px', fontWeight: 800, textDecoration: 'none' }}>
              Sign In as Admin
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdfbf7', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="container" style={{ flex: 1, paddingTop: '160px', paddingBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#6b7280', fontSize: '0.9rem', textDecoration: 'none', marginBottom: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827' }}>Product Inventory Manager</h1>
          </div>
          <button
            onClick={handleStartAdd}
            style={{
              background: '#111827',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Plus size={18} /> {showAddForm && !editingProduct ? 'Close Form' : 'Add New Product'}
          </button>
        </div>

        {/* Product Add/Edit Form */}
        {showAddForm && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2.5rem',
              border: '2px solid #c29b38',
              marginBottom: '2.5rem',
              boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#111827' }}>
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Create New Product Listing'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowAddForm(false);
                }}
                style={{ background: '#f3f4f6', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Product Basic Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ankara Floral Dress or Persian Rug"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                    Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                    Selling Price (KSh) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 3500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                    Original Price (Optional Strikethrough)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 5000"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD & MANAGEMENT SECTION */}
              <div
                style={{
                  background: '#f9fafb',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px dashed #c29b38',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ImageIcon size={18} color="#c29b38" />
                  Product Images (Upload or URL)
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>
                  Upload photo files directly from your device or paste an external image URL.
                </p>

                {uploadError && (
                  <div style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
                    {uploadError}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  {/* File Upload Button */}
                  <div>
                    <label
                      htmlFor="image-file-input"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.6rem',
                        background: '#ffffff',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '0.85rem',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: '#111827',
                      }}
                    >
                      <Upload size={18} color="#c29b38" />
                      Choose Image File(s)
                    </label>
                    <input
                      id="image-file-input"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </div>

                  {/* URL Input */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="url"
                      placeholder="Or paste Image URL (https://...)"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      style={{ background: '#111827', color: '#ffffff', border: 'none', padding: '0 1rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                {/* Thumbnail Previews List */}
                {images.length > 0 && (
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                      Selected Image Previews ({images.length}):
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {images.map((imgSrc, index) => (
                        <div
                          key={index}
                          style={{
                            position: 'relative',
                            width: '80px',
                            height: '80px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '2px solid #c29b38',
                          }}
                        >
                          <Image src={imgSrc} alt={`Preview ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              background: 'rgba(220, 38, 38, 0.9)',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sizes & Colors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                    Available Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. S, M, L, XL or Standard, Large"
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                    Available Colors (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Black, Navy, Brown, Floral"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe material, fit, quality, care instructions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.9rem' }}
                ></textarea>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)} />
                  ✨ New Arrival Tag
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={isBestSeller} onChange={(e) => setIsBestSeller(e.target.checked)} />
                  🔥 Best Seller Tag
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={isOnSale} onChange={(e) => setIsOnSale(e.target.checked)} />
                  🏷️ On Sale Tag
                </label>
              </div>

              <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    background: '#c29b38',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.9rem 2.5rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  {editingProduct ? 'Save Product Changes' : 'Publish Product Listing'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product Table */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: '#111827' }}>
            Current Catalog ({productList.length} items)
          </h2>

          {productList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#6b7280' }}>
              <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
                No products in catalog yet
              </h3>
              <p style={{ fontSize: '0.9rem' }}>Click &quot;Add New Product&quot; above to upload your first item images & details.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f9fafb', color: '#4b5563', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Product & Image</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Price</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Stock Status</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((prod) => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <Image
                        src={prod.images[0] || '/images/product-top.png'}
                        alt={prod.name}
                        width={50}
                        height={50}
                        style={{ borderRadius: '8px', objectFit: 'cover', border: '1px solid #e5e7eb' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, color: '#111827' }}>{prod.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {prod.images.length} image(s) attached
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {categories.find((c) => c.id === prod.category_id)?.name || 'General'}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 800, color: '#16a34a' }}>
                      {formatPrice(prod.price)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: prod.in_stock ? '#dcfce7' : '#fee2e2', color: prod.in_stock ? '#16a34a' : '#dc2626', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.75rem' }}>
                        {prod.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleStartEdit(prod)}
                          style={{
                            background: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            color: '#374151',
                            cursor: 'pointer',
                            padding: '0.4rem 0.6rem',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                          }}
                          title="Edit Product"
                        >
                          <Edit3 size={14} color="#3b82f6" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '0.4rem 0.6rem',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                          }}
                          title="Delete Product"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
