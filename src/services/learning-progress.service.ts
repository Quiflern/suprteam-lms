import { PublicKey } from '@solana/web3.js';

export interface Progress {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  completionPercentage: number;
  lastActive: Date;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  streakCalendar: Record<string, boolean>;
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
  name: string;
  description: string;
  imageUrl: string;
  level: number;
  mintAddress: string;
  metadata: any;
  verificationLink: string;
}

export interface LearningProgressService {
  getProgress(userId: string, courseId: string): Promise<Progress>;
  completeLesson(userId: string, courseId: string, lessonIndex: number): Promise<void>;
  getXP(userId: string): Promise<number>;
  getStreak(userId: string): Promise<StreakData>;
  getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]>;
  getCredentials(wallet: PublicKey): Promise<Credential[]>;
}

export class LocalLearningProgressService implements LearningProgressService {
  private storageKey = 'learningProgress';
  private xpStorageKey = 'userXP';
  private streakStorageKey = 'userStreak';
  
  private getStorage(): Record<string, any> {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    }
    return {};
  }
  
  private setStorage(data: Record<string, any>): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
  }
  
  async getProgress(userId: string, courseId: string): Promise<Progress> {
    const storage = this.getStorage();
    const key = `${userId}:${courseId}`;
    
    if (storage[key]) {
      return {
        ...storage[key],
        lastActive: new Date(storage[key].lastActive)
      };
    }
    
    return {
      courseId,
      completedLessons: 0,
      totalLessons: 10, // Default, will be overridden by actual course data
      completionPercentage: 0,
      lastActive: new Date()
    };
  }
  
  async completeLesson(userId: string, courseId: string, lessonIndex: number): Promise<void> {
    const storage = this.getStorage();
    const key = `${userId}:${courseId}`;
    
    const progress = storage[key] || {
      courseId,
      completedLessons: 0,
      totalLessons: 10,
      completionPercentage: 0,
      lastActive: new Date().toISOString()
    };
    
    // Mark lesson as completed (simple implementation)
    progress.completedLessons = Math.max(progress.completedLessons, lessonIndex + 1);
    progress.completionPercentage = Math.round(
      (progress.completedLessons / progress.totalLessons) * 100
    );
    progress.lastActive = new Date().toISOString();
    
    storage[key] = progress;
    this.setStorage(storage);
    
    // Award XP for lesson completion
    const xpService = new LocalXPService();
    await xpService.awardXP(userId, 25); // 25 XP per lesson
    
    // Update streak
    const streakService = new LocalStreakService();
    await streakService.updateStreak(userId);
  }
  
  async getXP(userId: string): Promise<number> {
    const xpService = new LocalXPService();
    return xpService.getXP(userId);
  }
  
  async getStreak(userId: string): Promise<StreakData> {
    const streakService = new LocalStreakService();
    return streakService.getStreak(userId);
  }
  
  async getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]> {
    const xpService = new LocalXPService();
    const users = ['user1', 'user2', 'user3', 'user4', 'user5'];
    
    const leaderboard = await Promise.all(
      users.map(async (userId, index) => {
        const xp = await xpService.getXP(userId);
        return {
          rank: index + 1,
          userId,
          username: `User ${index + 1}`,
          avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
          xp,
          level: this.calculateLevel(xp),
          streak: 5 + index
        };
      })
    );
    
    return leaderboard.sort((a, b) => b.xp - a.xp);
  }
  
  async getCredentials(wallet: PublicKey): Promise<Credential[]> {
    // Stub implementation - will connect to on-chain program later
    return [
      {
        id: 'cred-1',
        name: 'Solana Fundamentals',
        description: 'Completed Solana Fundamentals track',
        imageUrl: '/certificate-solana-fundamentals.png',
        level: 1,
        mintAddress: wallet.toString(),
        metadata: {
          name: 'Solana Fundamentals Certificate',
          symbol: 'SOL-FUND',
          uri: 'https://arweave.net/transaction-id'
        },
        verificationLink: `https://explorer.solana.com/address/${wallet.toString()}?cluster=devnet`
      }
    ];
  }
  
  private calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 100));
  }
}

class LocalXPService {
  private storageKey = 'userXP';
  
  async getXP(userId: string): Promise<number> {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(`${this.storageKey}:${userId}`);
      return data ? parseInt(data) : 0;
    }
    return 0;
  }
  
  async awardXP(userId: string, amount: number): Promise<void> {
    if (typeof window !== 'undefined') {
      const currentXP = await this.getXP(userId);
      const newXP = currentXP + amount;
      localStorage.setItem(`${this.storageKey}:${userId}`, newXP.toString());
    }
  }
}

class LocalStreakService {
  private storageKey = 'userStreak';
  
  async getStreak(userId: string): Promise<StreakData> {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(`${this.storageKey}:${userId}`);
      if (data) {
        return JSON.parse(data);
      }
    }
    
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: new Date(),
      streakCalendar: {}
    };
  }
  
  async updateStreak(userId: string): Promise<void> {
    if (typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      const streak = await this.getStreak(userId);
      const lastActivity = new Date(streak.lastActivityDate).toISOString().split('T')[0];
      
      if (today !== lastActivity) {
        // New day
        if (this.isConsecutiveDay(lastActivity, today)) {
          streak.currentStreak += 1;
          streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
        } else {
          streak.currentStreak = 1;
        }
        streak.lastActivityDate = new Date().toISOString();
        streak.streakCalendar[today] = true;
      }
      
      localStorage.setItem(`${this.storageKey}:${userId}`, JSON.stringify(streak));
    }
  }
  
  private isConsecutiveDay(prevDay: string, currentDay: string): boolean {
    const prevDate = new Date(prevDay);
    const currentDate = new Date(currentDay);
    const diff = currentDate.getTime() - prevDate.getTime();
    return diff === 86400000; // 1 day in milliseconds
  }
}