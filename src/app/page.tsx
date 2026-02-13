import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { CoursePreview } from '@/components/course-preview';
import { Testimonials } from '@/components/testimonials';
import { Newsletter } from '@/components/newsletter';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <Features />
      <CoursePreview />
      <Testimonials />
      <Newsletter />
    </div>
  );
}