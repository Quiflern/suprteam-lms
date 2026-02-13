import Link from 'next/link';
import { Newsletter } from './newsletter';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Superteam Academy</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learn Solana development with interactive courses and earn on-chain credentials.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary-500">
                Twitter
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary-500">
                GitHub
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary-500">
                Discord
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Courses</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  Solana Fundamentals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  Rust for Solana
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <Newsletter />
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Superteam Brazil. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}