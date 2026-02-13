'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lang: string) => {
    // Simple language switching - in a real app, you'd use next-i18next
    router.push(`/${lang}${pathname}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('pt')}>Português</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('es')}>Español</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}