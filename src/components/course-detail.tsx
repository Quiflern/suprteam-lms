import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';

const coursesData: Record<string, any> = {
  'solana-fundamentals': {
    id: 'solana-fundamentals',
    title: 'Solana Fundamentals',
    description: 'Learn the core concepts of Solana blockchain development including accounts, transactions, programs, and the Solana runtime.',
    difficulty: 'Beginner',
    duration: '10 hours',
    xp: 500,
    image: '/course-solana-fundamentals.jpg',
    instructor: 'Jane Doe',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Solana',
        lessons: [
          { id: 'lesson-1', title: 'What is Solana?', type: 'content', completed: true },
          { id: 'lesson-2', title: 'Solana Architecture', type: 'content', completed: true },
          { id: 'lesson-3', title: 'Setting up Development Environment', type: 'challenge', completed: false },
        ],
      },
      {
        id: 'module-2',
        title: 'Core Concepts',
        lessons: [
          { id: 'lesson-4', title: 'Accounts and Transactions', type: 'content', completed: false },
          { id: 'lesson-5', title: 'Programs and Smart Contracts', type: 'content', completed: false },
          { id: 'lesson-6', title: 'Create Your First Program', type: 'challenge', completed: false },
        ],
      },
    ],
  },
  'rust-solana': {
    id: 'rust-solana',
    title: 'Rust for Solana Developers',
    description: 'Master Rust programming with a focus on Solana smart contract development.',
    difficulty: 'Intermediate',
    duration: '15 hours',
    xp: 750,
    image: '/course-rust.jpg',
    instructor: 'John Smith',
    modules: [
      {
        id: 'module-1',
        title: 'Rust Basics',
        lessons: [
          { id: 'lesson-1', title: 'Rust Syntax and Concepts', type: 'content', completed: false },
          { id: 'lesson-2', title: 'Ownership and Borrowing', type: 'content', completed: false },
        ],
      },
    ],
  },
};

export function CourseDetail({ slug }: { slug: string }) {
  const course = coursesData[slug] || coursesData['solana-fundamentals'];
  const wallet = useWallet();

  const totalLessons = course.modules.reduce(
    (sum: number, module: any) => sum + module.lessons.length,
    0
  );
  const completedLessons = course.modules.reduce(
    (sum: number, module: any) =>
      sum + module.lessons.filter((l: any) => l.completed).length,
    0
  );
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/800x400/1E293B/FFFFFF?text=${encodeURIComponent(course.title)}`;
            }}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <Badge variant="secondary">{course.difficulty}</Badge>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {course.description}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span>Instructor: {course.instructor}</span>
            <span>Duration: {course.duration}</span>
            <span>{course.xp} XP available</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Completed Lessons
                  </p>
                  <p className="text-2xl font-bold">
                    {completedLessons}/{totalLessons}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">XP Earned</p>
                  <p className="text-2xl font-bold">225 XP</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" defaultValue={['module-1']}>
              {course.modules.map((module: any, moduleIndex: number) => (
                <AccordionItem key={module.id} value={module.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">Module {moduleIndex + 1}: {module.title}</span>
                      <Badge variant="outline">
                        {module.lessons.length} lessons
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 mt-4">
                      {module.lessons.map((lesson: any, lessonIndex: number) => {
                        const lessonNumber =
                          moduleIndex * course.modules[0].lessons.length + lessonIndex + 1;
                        return (
                          <Link
                            key={lesson.id}
                            href={`/courses/${slug}/lessons/${lesson.id}`}
                            className={`flex items-center justify-between p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors ${
                              lesson.completed ? 'bg-green-50 dark:bg-green-900/50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-gray-500 dark:text-gray-400 w-6">
                                {lessonNumber}.
                              </span>
                              <span
                                className={`font-medium ${
                                  lesson.completed ? 'text-green-600 dark:text-green-400' : ''
                                }`}
                              >
                                {lesson.title}
                              </span>
                              {lesson.type === 'challenge' && (
                                <Badge variant="secondary" size="sm">
                                  Challenge
                                </Badge>
                              )}
                            </div>
                            {lesson.completed && (
                              <span className="text-green-600 dark:text-green-400">
                                ✓ Completed
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle>Course Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {wallet.connected ? (
              <Link href={`/courses/${slug}/lessons/lesson-1`} className="w-full block">
                <Button className="w-full">
                  {progress > 0 ? 'Continue Course' : 'Start Course'}
                </Button>
              </Link>
            ) : (
              <Button className="w-full" disabled>
                Connect Wallet to Enroll
              </Button>
            )}

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-2">What you'll learn:</p>
              <ul className="space-y-1">
                <li>• Solana blockchain fundamentals</li>
                <li>• Rust programming for Solana</li>
                <li>• Building and deploying programs</li>
                <li>• Interacting with Solana network</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm font-medium mb-2">Course Requirements</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Basic programming knowledge</li>
                <li>• Solana CLI installed</li>
                <li>• Rust toolchain</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}