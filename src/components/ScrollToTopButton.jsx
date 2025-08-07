// ScrollToTopButton.jsx
import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollToTopButton.scss';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      console.log('🟡 ScrollY:', window.scrollY); // 꼭 확인!
      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
