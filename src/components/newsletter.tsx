import { Button } from './ui/button';
import { Input } from './ui/input';

export function Newsletter() {
  return (
    <section className="py-16 bg-primary-50 dark:bg-primary-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Subscribe to our newsletter for course updates, new content, and Solana development tips.
          </p>
          <form className="flex gap-2">
            <Input type="email" placeholder="Your email" className="flex-grow" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}