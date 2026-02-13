'use client';

import { Toaster as Sonner } from 'sonner';

const Toaster = () => {
  return (
    <Sonner
      position="top-right"
      toastOptions={
        classNames: {
          toast: 'bg-background border border-border text-foreground',
          title: 'font-medium',
          description: 'text-sm text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }
    />
  );
};

export { Toaster };