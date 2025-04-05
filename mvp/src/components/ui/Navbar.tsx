'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScroll = window.scrollY;

        // Show navbar after scrolling past 1080px
        if (currentScroll > 1080) {
          setShow(currentScroll < lastScrollY); // show only on scroll up
        } else {
          setShow(false); // hide when at top
        }

        setLastScrollY(currentScroll);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      } bg-black/80 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-lg`}
    >
      {/* Left side: Logo */}
      <div className="text-2xl font-bold tracking-wide text-green-300">sweetlake</div>
    </nav>
  );
};

export default Navbar;
