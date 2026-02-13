import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import Link from 'next/link';

const courses = [
  {
    id: 'solana-fundamentals',
    title: 'Solana Fundamentals',
    description: 'Learn the core concepts of Solana blockchain development',
    difficulty: 'Beginner',
    duration: '10 hours',
    progress: 45,
    image: '/course-solana-fundamentals.jpg',
    slug: 'solana-fundamentals',
  },
  {
    id: 'rust-solana',
    title: 'Rust for Solana Developers',
    description: 'Master Rust programming for Solana smart contracts',
    difficulty: 'Intermediate',
    duration: '15 hours',
    progress: 20,
    image: '/course-rust.jpg',
    slug: 'rust-solana',
  },
  {
    id: 'anchor-framework',
    title: 'Anchor Framework',
    description: 'Build Solana programs with the Anchor framework',
    difficulty: 'Advanced',
    duration: '20 hours',
    progress: 0,
    image: '/course-anchor.jpg',
    slug: 'anchor-framework',
  },
  {
    id: 'defi-solana',
    title: 'DeFi on Solana',
    description: 'Build decentralized finance applications on Solana',
    difficulty: 'Advanced',
    duration: '25 hours',
    progress: 0,
    image: '/course-defi.jpg',
    slug: 'defi-solana',
  },
];

export function CourseCatalog() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col h-full">
          <CardHeader className="p-0">
            <div className="relative w-full h-48">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/400x300/1E293B/FFFFFF?text=${encodeURIComponent(course.title)}`;
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-6">
            <CardTitle className="mb-2">{course.title}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{course.difficulty}</Badge>
              <Badge variant="outline">{course.duration}</Badge>
            </div>
            {course.progress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
            )}
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Link href={`/courses/${course.slug}`} className="w-full">
              <Button className="w-full">
                {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}