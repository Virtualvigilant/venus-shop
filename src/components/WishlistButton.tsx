'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import styles from './WishlistButton.module.css';

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export default function WishlistButton({ productId, className }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('venus-wishlist') || '[]');
    setIsWishlisted(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem('venus-wishlist') || '[]');
    let newWishlist: string[];

    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter((id: string) => id !== productId);
    } else {
      newWishlist = [...wishlist, productId];
    }

    localStorage.setItem('venus-wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`${styles.btn} ${isWishlisted ? styles.active : ''} ${className || ''}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
    </button>
  );
}
