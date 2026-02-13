'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { capturePageView, identifyUser } from '@/lib/analytics';
import { useWallet } from '@solana/wallet-adapter-react';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const wallet = useWallet();

  useEffect(() => {
    // Capture page views
    capturePageView();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Identify user when wallet connects
    if (wallet.publicKey) {
      identifyUser(wallet.publicKey.toString(), {
        walletType: wallet.wallet?.adapter.name,
      });
    }
  }, [wallet.publicKey]);

  return children;
}