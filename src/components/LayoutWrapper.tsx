
'use client';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noFooterPaths = ['/dev-tools-warning'];

  const showFooter = !noFooterPaths.includes(pathname);

  return (
    <>
      <main className="flex-grow flex flex-col">{children}</main>
      {showFooter && <Footer />}
    </>
  )
}
