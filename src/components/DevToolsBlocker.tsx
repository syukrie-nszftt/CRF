'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function DevToolsBlocker() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (sessionStorage.getItem('devToolsBypass') === 'true') {
      if (pathname === '/dev-tools-warning') {
        router.replace('/');
      }
      return;
    }

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
      }
    };
    
    if (pathname !== '/dev-tools-warning') {
        document.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('keydown', handleKeyDown);
    }

    const devToolsCheck = () => {
      const threshold = 160;
      const isDevToolsOpen =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;

      if (isDevToolsOpen) {
        if (pathname !== '/dev-tools-warning') {
          router.replace('/dev-tools-warning');
        }
      } else {
        if (pathname === '/dev-tools-warning') {
          router.replace('/');
        }
      }
    };

    const intervalId = setInterval(devToolsCheck, 1000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(intervalId);
    };
  }, [router, pathname]);

  return null;
}
