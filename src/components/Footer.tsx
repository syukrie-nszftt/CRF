'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Footer() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

  return (
    <footer className="w-full shrink-0 border-t bg-card py-4">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
            <Link
              href="/"
              className={cn(
                'transition-colors hover:text-primary',
                pathname === '/' && 'font-semibold text-primary underline underline-offset-4'
              )}
            >
              Static Website Form
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/dynamic-form"
              className={cn(
                'transition-colors hover:text-primary',
                pathname === '/dynamic-form' &&
                  'font-semibold text-primary underline underline-offset-4'
              )}
            >
              Dynamic Website Form
            </Link>
        </div>
        {basePath && (
          <div className="mt-2 text-xs">
            <p>Deployment Base Path: <code className="font-mono bg-muted px-1 py-0.5 rounded-sm">{basePath}</code></p>
          </div>
        )}
      </div>
    </footer>
  );
}
