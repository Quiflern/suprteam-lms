import { LessonView } from '@/components/lesson-view';

export default function LessonPage({ params }: { params: { slug: string; id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <LessonView slug={params.slug} lessonId={params.id} />
    </div>
  );
}