import { useEffect, useState } from 'react';
import { LocalLearningProgressService } from '@/services/learning-progress.service';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Link from 'next/link';
import { Calendar } from './ui/calendar';
import { useWallet } from '@solana/wallet-adapter-react';

export function UserDashboard() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState(0);
  const [courses, setCourses] = useState<any[]>([]);
  const wallet = useWallet();

  useEffect(() => {
    const fetchData = async () => {
      const service = new LocalLearningProgressService();
      
      // Get XP and calculate level
      const userXP = await service.getXP(wallet.publicKey?.toString() || 'user1');
      setXp(userXP);
      setLevel(Math.floor(Math.sqrt(userXP / 100)));
      
      // Get streak
      const streakData = await service.getStreak(wallet.publicKey?.toString() || 'user1');
      setStreak(streakData.currentStreak);
      
      // Mock course data
      const mockCourses = [
        {
          id: 'solana-fundamentals',
          title: 'Solana Fundamentals',
          progress: 45,
          slug: 'solana-fundamentals',
        },
        {
          id: 'rust-solana',
          title: 'Rust for Solana',
          progress: 20,
          slug: 'rust-solana',
        },
      ];
      setCourses(mockCourses);
      
      // Calculate overall progress
      const totalProgress = mockCourses.reduce((sum, course) => sum + course.progress, 0);
      setProgress(totalProgress / mockCourses.length);
    };
    
    fetchData();
  }, [wallet.publicKey]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">XP</p>
                  <p className="text-2xl font-bold">{xp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
                  <p className="text-2xl font-bold">Level {level}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={course.progress} className="w-32 h-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <Link href={`/courses/${course.slug}`}>
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-300 text-sm">🎓</span>
                </div>
                <div>
                  <p className="font-medium">Completed Lesson 3</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Solana Fundamentals • 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-300 text-sm">✨</span>
                </div>
                <div>
                  <p className="font-medium">Earned 25 XP</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Lesson completion • 2 hours ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Streak</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4">
              <div className="text-4xl font-bold mb-2">{streak}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                days in a row
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${
                      i < streak ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                  />
                ))}
              </div>
            </div>
            <Button className="w-full" variant="outline">
              View Calendar
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">🏆</Badge>
                <span className="font-medium">First Steps</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">🔥</Badge>
                <span className="font-medium">Week Warrior</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">💻</Badge>
                <span className="font-medium">Rust Rookie</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Anchor Framework</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Advanced • 20 hours</p>
              </div>
              <Link href="/courses/anchor-framework">
                <Button variant="outline" size="sm">
                  Start
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">DeFi on Solana</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Advanced • 25 hours</p>
              </div>
              <Link href="/courses/defi-solana">
                <Button variant="outline" size="sm">
                  Start
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}