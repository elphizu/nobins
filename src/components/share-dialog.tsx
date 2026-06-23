'use client';

import * as React from 'react';

import { LinkIcon, Trash2 } from 'lucide-react';

import { CopyField } from '@/components/copyfield';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

import { type ShareDialogProps } from '@/types';

const patternDots = Array.from({ length: 520 }, (_, i) => {
  const cols = 40;
  const col = i % cols;
  const row = Math.floor(i / cols);
  const hash = (row * 17 + col * 29 + row * col * 11) % 100;

  if (hash > 54) return null;

  return {
    id: i,
    left: `${(col / (cols - 1)) * 100}%`,
    top: `${row * 8}px`,
    opacity: 0.05 + (hash % 9) * 0.025,
  };
}).filter((dot): dot is { id: number; left: string; top: string; opacity: number } => Boolean(dot));

export function ShareDialog({ open, onClose, shareUrl, deleteUrl }: ShareDialogProps) {
  const renderQrCode = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      import('qr-code-styling')
        .then((QRModule) => {
          const QRCodeStyling = QRModule.default;
          if (!QRCodeStyling) {
            console.error('[QR] QRCodeStyling default export missing');
            return;
          }

          node.innerHTML = '';

          const qrCode = new QRCodeStyling({
            width: 150,
            height: 150,
            type: 'svg',
            data: shareUrl,
            dotsOptions: { color: 'var(--foreground)', type: 'dots' },
            cornersSquareOptions: { color: 'var(--foreground)', type: 'extra-rounded' },
            cornersDotOptions: { color: 'var(--foreground)', type: 'dot' },
            backgroundOptions: { color: 'var(--background)' },
            imageOptions: { crossOrigin: 'anonymous', margin: 10 },
          });

          qrCode.append(node);
        })
        .catch((error) => {
          console.error('[QR] render failed:', error);
        });
    },
    [shareUrl],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose?.();
      }}
    >
      <DialogContent
        overlayClassName="bg-black/60 backdrop-blur-sm"
        className="w-full max-w-md gap-0 overflow-visible border-0 bg-transparent p-0 shadow-none ring-0 sm:max-w-md"
      >
        <DialogTitle className="sr-only">Share Dialog</DialogTitle>

        <div className="rounded-2xl border-2 border-foreground/20 bg-background p-1">
          <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-card p-6 shadow-xl">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
              style={{
                maskImage:
                  'linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.65) 60%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.65) 60%, transparent 100%)',
              }}
            >
              {patternDots.map((dot) => (
                <div
                  key={dot.id}
                  className="absolute size-1.25 rounded-[1.5px] bg-foreground"
                  style={{
                    left: dot.left,
                    top: dot.top,
                    opacity: dot.opacity,
                  }}
                />
              ))}
            </div>

            <div className="relative mb-4 flex items-center justify-between">
              <DialogTitle className="font-heading text-lg font-medium text-foreground">
                Share via QR Code
              </DialogTitle>
            </div>

            <div className="relative flex justify-center rounded-lg bg-background p-5">
              <svg className="absolute inset-0 size-full text-border" preserveAspectRatio="none">
                <rect
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="6 14"
                  strokeDashoffset="0"
                  strokeLinecap="square"
                  rx="8"
                  ry="8"
                />
              </svg>

              <div className="relative p-2">
                <div className="absolute -inset-0.75 border border-ring c" />

                {[
                  'top-[-9px] left-[-9px]',
                  'top-[-9px] right-[-9px]',
                  'bottom-[-9px] left-[-9px]',
                  'bottom-[-9px] right-[-9px]',
                ].map((pos) => (
                  <div
                    key={pos}
                    className={`absolute size-3 rounded-[2px] border border-ring bg-background ${pos}`}
                  />
                ))}

                <div ref={renderQrCode} className="relative z-10 h-37.5 w-37.5" />
              </div>
            </div>

            <p className="relative my-5 px-2 text-center text-xs text-muted-foreground">
              Here is your unique code that will direct people to your content when scanned
            </p>

            <CopyField label="Share URL" value={shareUrl} icon={LinkIcon} />

            <CopyField
              label="Delete URL (save this — shown once)"
              value={deleteUrl}
              icon={Trash2}
            />

            <p className="relative mt-4 text-center text-xs text-muted-foreground">
              The decryption key is in the share URL fragment (#). The server never sees it.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
