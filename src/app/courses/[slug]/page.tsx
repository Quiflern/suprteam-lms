import { CourseDetail } from '@/components/course-detail';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <CourseDetail slug={params.slug} />
    </div>
  );
}