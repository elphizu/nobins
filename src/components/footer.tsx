import Link from 'next/link';

import { socialLinks } from '@/data';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <p className="text-sm text-muted-foreground">
          End-to-end encrypted &middot; Zero-knowledge
        </p>
        <div className="flex gap-2">
          {socialLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="size-4" />
              <span className="sr-only">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
