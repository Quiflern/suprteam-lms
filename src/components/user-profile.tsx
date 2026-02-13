import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useWallet } from '@solana/wallet-adapter-react';
import { LocalLearningProgressService } from '@/services/learning-progress.service';
import { useEffect, useState } from 'react';

export function UserProfile() {
  const wallet = useWallet();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [credentials, setCredentials] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!wallet.publicKey) return;

      const service = new LocalLearningProgressService();
      
      // Get XP and level
      const userXP = await service.getXP(wallet.publicKey.toString());
      setXp(userXP);
      setLevel(Math.floor(Math.sqrt(userXP / 100)));
      
      // Get credentials
      const creds = await service.getCredentials(wallet.publicKey);
      setCredentials(creds);
      
      // Mock course data
      setCourses([
        { id: 'solana-fundamentals', title: 'Solana Fundamentals', completed: true },
        { id: 'rust-solana', title: 'Rust for Solana', completed: false },
      ]);
    };
    
    fetchData();
  }, [wallet.publicKey]);

  if (!wallet.connected) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Please connect your wallet</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your Solana wallet to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={`https://avatars.dicebear.com/api/pixel-art/${wallet.publicKey?.toString().substring(0, 8)}.svg`} />
              <AvatarFallback>{wallet.publicKey?.toString().substring(0, 2)}</AvatarFallback>
            </Avatar>
            <CardTitle>{wallet.publicKey?.toString().substring(0, 8)}...</CardTitle>
            <p className="text-gray-500 dark:text-gray-400">Solana Developer</p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">XP</p>
                <p className="text-xl font-bold">{xp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
                <p className="text-xl font-bold">Level {level}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary">Solana Developer</Badge>
              <Badge variant="secondary">Rust Enthusiast</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Rust</span>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="w-24 h-2" />
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Solana</span>
                <div className="flex items-center gap-2">
                  <Progress value={60} className="w-24 h-2" />
                  <span className="text-sm font-medium">60%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Anchor</span>
                <div className="flex items-center gap-2">
                  <Progress value={45} className="w-24 h-2" />
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>On-Chain Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            {credentials.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No credentials earned yet. Complete courses to earn on-chain certificates.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {credentials.map((credential) => (
                  <div key={credential.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{credential.name}</h3>
                      <Badge variant="secondary">Level {credential.level}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {credential.description}
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={credential.verificationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-500 hover:underline"
                      >
                        Verify on Solana Explorer
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {courses.filter((course) => course.completed).length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No courses completed yet. Start learning to see your progress here.
              </p>
            ) : (
              <div className="space-y-4">
                {courses
                  .filter((course) => course.completed)
                  .map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Completed • {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-600 dark:text-primary-300 text-sm">🎓</span>
                </div>
                <div>
                  <p className="font-medium">Completed Solana Fundamentals</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Earned 500 XP • {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-600 dark:text-primary-300 text-sm">✨</span>
                </div>
                <div>
                  <p className="font-medium">Achieved 7-day streak</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Earned Week Warrior badge • {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-primary-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}