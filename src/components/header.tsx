import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { UserMenu } from './user-menu';
import { Button } from './ui/button';

require('@solana/wallet-adapter-react-ui/styles.css');

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            Superteam Academy
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="hover:text-primary-500 transition-colors">
              Courses
            </Link>
            <Link href="/dashboard" className="hover:text-primary-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="hover:text-primary-500 transition-colors">
              Leaderboard
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <UserMenu />
          <WalletMultiButton className="!bg-primary-500 !text-white hover:!bg-primary-600" />
          <Link href="/courses">
            <Button variant="outline">Explore Courses</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}