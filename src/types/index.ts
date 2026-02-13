import { PublicKey } from '@solana/web3.js';

export interface User {
  id: string;
  walletAddress?: PublicKey;
  username: string;
  email?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // e.g., "10 hours"
  xpReward: number;
  imageUrl: string;
  instructor: string;
  modules: Module[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  courseId: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  moduleId: string;
  content: string;
  type: 'content' | 'challenge';
  starterCode?: string;
  solutionCode?: string;
  testCases?: TestCase[];
  order: number;
  xpReward: number;
}

export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
}

export interface Progress {
  userId: string;
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  completionPercentage: number;
  lastActive: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  achievementId: number; // 0-255 for bitmap
  earnedAt: Date;
  name: string;
  description: string;
}

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  streakCalendar: Record<string, boolean>; // Date strings as keys
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
}

export interface Credential {
  id: string;
  userId: string;
  name: string;
  description: string;
  imageUrl: string;
  level: number;
  mintAddress: string;
  metadata: any;
  verificationLink: string;
  earnedAt: Date;
}

export interface LearningProgressService {
  getProgress(userId: string, courseId: string): Promise<Progress>;
  completeLesson(userId: string, courseId: string, lessonIndex: number): Promise<void>;
  getXP(userId: string): Promise<number>;
  getStreak(userId: string): Promise<Streak>;
  getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]>;
  getCredentials(wallet: PublicKey): Promise<Credential[]>;
  getAchievements(userId: string): Promise<Achievement[]>;
}