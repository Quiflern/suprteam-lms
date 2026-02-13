import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BookOpen, Code, Trophy, Users, Zap, ShieldCheck } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary-500" />,
      title: 'Interactive Courses',
      description: 'Hands-on learning with integrated code editors and real-time feedback',
    },
    {
      icon: <Code className="h-8 w-8 text-primary-500" />,
      title: 'Project-Based',
      description: 'Build real Solana applications from day one',
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary-500" />,
      title: 'Gamified Learning',
      description: 'Earn XP, level up, and unlock achievements as you progress',
    },
    {
      icon: <Users className="h-8 w-8 text-primary-500" />,
      title: 'Community Driven',
      description: 'Learn with peers and get support from experienced developers',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-500" />,
      title: 'On-Chain Credentials',
      description: 'Earn verifiable NFT certificates for completed courses',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary-500" />,
      title: 'Production Ready',
      description: 'Learn best practices for building production-ready dApps',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Superteam Academy?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The most effective way to become a Solana developer
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <CardTitle className="text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}