import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { WalletProvider } from '@/components/wallet-provider';
import { AuthProvider } from '@/components/auth-provider';
import { I18nProvider } from '@/components/i18n-provider';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { LearningProvider } from '@/context/LearningContext';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@/components/google-analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Superteam Academy - Solana Developer Education',
  description: 'Learn Solana development with interactive courses and earn on-chain credentials',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <I18nProvider>
              <AnalyticsProvider>
                <WalletProvider>
                  <LearningProvider>
                    <div className="flex flex-col min-h-screen">
                      <Header />
                      <main className="flex-grow">{children}</main>
                      <Footer />
                    </div>
                    <Toaster />
                  </LearningProvider>
                </WalletProvider>
              </AnalyticsProvider>
            </I18nProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}