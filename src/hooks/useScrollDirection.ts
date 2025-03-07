import { useState, useEffect } from 'react';

type Direction = 'up' | 'down' | 'none';

export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<Direction>('none');
  const [prevScrollY, setPrevScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - prevScrollY) >= threshold) {
        const direction = currentScrollY > prevScrollY ? 'down' : 'up';
        setScrollDirection(direction);
        setPrevScrollY(currentScrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY, threshold]);
  
  return scrollDirection;
} 