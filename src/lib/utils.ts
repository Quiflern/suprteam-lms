import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | number): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function truncateAddress(address: string, length = 8): string {
  if (!address) return '';
  return `${address.substring(0, length)}...${address.substring(address.length - length)}`;
}

export function calculateLevelFromXP(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100));
}

export function formatXP(xp: number): string {
  return new Intl.NumberFormat().format(xp);
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));