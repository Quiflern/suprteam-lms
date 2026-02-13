import { CourseCatalog } from '@/components/course-catalog';

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Course Catalog</h1>
      <CourseCatalog />
    </div>
  );
}