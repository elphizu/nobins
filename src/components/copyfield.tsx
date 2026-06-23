import { useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { type CopyFieldProps } from '@/types';

export function CopyField({ label, value, icon: Icon }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!value) return;

    await navigator.clipboard.writeText(value);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <div className="space-y-2 mb-2">
      <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {label}
      </label>

      <div className="flex items-center gap-2 rounded-lg border bg-muted/80 px-3 py-1">
        {Icon && <Icon className="h-4 w-4" />}
        <input value={value} readOnly className="min-w-0 flex-1 text-sm outline-none" />

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
