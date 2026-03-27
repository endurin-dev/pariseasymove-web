'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Quick & clean fix: TypeScript-safe way without extra files
    const dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer = dataLayer;

    dataLayer.push({
      event: 'custom_page_view',
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}