import { useEffect, useState } from 'react';
import { LocalLearningProgressService } from '@/services/learning-progress.service';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useWallet } from '@solana/wallet-adapter-react';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');
  const [loading, setLoading] = useState(true);
  const wallet = useWallet();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const service = new LocalLearningProgressService();
      const data = await service.getLeaderboard(timeframe);
      setLeaderboard(data);
      setLoading(false);
    };
    
    fetchLeaderboard();
  }, [timeframe]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Learners</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.userId}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    wallet.publicKey?.toString() === entry.userId
                      ? 'bg-primary-50 dark:bg-primary-900/50'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-400 dark:text-gray-600">
                      {index + 1}
                    </div>
                    <Avatar>
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback>{entry.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{entry.username}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Level {entry.level} • Streak: {entry.streak}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{entry.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
        Leaderboard updates every 15 minutes
      </div>
    </div>
  );
}