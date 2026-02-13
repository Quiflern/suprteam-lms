import Link from 'next/link';
import { Button } from './ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function Hero() {
  return (
    <section className="text-center py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Master Solana Development
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Interactive courses, on-chain credentials, and gamified learning for Solana builders
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/courses">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
              Explore Courses
            </Button>
          </Link>
          <WalletMultiButton className="!bg-primary-500 !text-white hover:!bg-primary-600" />
        </div>
        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl h-64 md:h-96">
            <img
              src="/hero-image.png"
              alt="Solana development learning platform"
              className="w-full h-full object-cover rounded-lg shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/800x400/1E293B/FFFFFF?text=Solana+Development';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}