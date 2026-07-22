import { Product } from '@/types';
import { products as defaultProducts } from './data';

const CUSTOM_PRODUCTS_KEY = 'wajose_custom_products';

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return defaultProducts;
  try {
    const saved = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    if (saved) {
      const parsed: Product[] = JSON.parse(saved);
      return parsed;
    }
  } catch (e) {
    console.error('Error reading custom products from storage', e);
  }
  return defaultProducts;
}

export function saveStoredProducts(productsList: Product[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(productsList));
    window.dispatchEvent(new Event('products-updated'));
  } catch (e) {
    console.error('Error saving custom products to storage', e);
  }
}
