import { Product, Category, Collection } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Women',
    slug: 'women',
    image_url: '/images/product-dress-floral.png',
    description: 'Curated fashion for the modern Kenyan woman — from elegant ankara to casual everyday wear.',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Men',
    slug: 'men',
    image_url: '/images/product-blazer.png',
    description: 'Sharp, stylish menswear — from smart casual to statement pieces.',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Kids',
    slug: 'kids',
    image_url: '/images/product-top.png',
    description: 'Adorable and durable fashion for the little ones.',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    image_url: '/images/product-bag.png',
    description: 'Bags, shoes, sunglasses and more — the finishing touches that make the look.',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Home',
    slug: 'home',
    image_url: '/images/collection-weekend.png',
    description: 'Statement carpets, doormats, and home décor — dress your space with warmth.',
    created_at: new Date().toISOString(),
  },
];

// Existing products removed so store manager can add fresh catalog from Admin Portal
export const products: Product[] = [];

export const collections: Collection[] = [
  {
    id: '1',
    name: 'The Soko Edit',
    slug: 'soko-edit',
    description: 'Our curated marketplace collection — the best of Kenyan style and home living.',
    image_url: '/images/collection-datenight.png',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Home Essentials',
    slug: 'home-essentials',
    description: 'Statement carpets, doormats, and décor that dress your space with warmth.',
    image_url: '/images/collection-office.png',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Weekend Vibes',
    slug: 'weekend-vibes',
    description: 'Relaxed styles for the perfect Kenyan weekend. Comfort meets fashion.',
    image_url: '/images/collection-weekend.png',
    created_at: new Date().toISOString(),
  },
];

export function formatPrice(price: number): string {
  return `KSh ${new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)}`;
}

export function getDiscountPercentage(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
