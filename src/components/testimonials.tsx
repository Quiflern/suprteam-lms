import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Solana Developer',
      avatar: 'https://i.pravatar.cc/150?img=1',
      quote: 'Superteam Academy helped me go from zero to building my own Solana dApp in just 3 months. The interactive challenges are amazing!',
    },
    {
      name: 'Carlos Rodriguez',
      role: 'Blockchain Engineer',
      avatar: 'https://i.pravatar.cc/150?img=2',
      quote: 'The gamification system keeps me motivated. I love earning XP and seeing my progress on the leaderboard.',
    },
    {
      name: 'Ana Costa',
      role: 'Web3 Founder',
      avatar: 'https://i.pravatar.cc/150?img=3',
      quote: 'As a founder, I needed to understand Solana quickly. The on-chain credentials helped me prove my skills to investors.',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Learners Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of developers who have learned Solana with us
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}