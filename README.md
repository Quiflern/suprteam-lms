# Superteam Academy - Solana Learning Platform

The ultimate learning platform for Solana-native developers. Interactive courses, gamified progression, and on-chain credentials.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Custom components with Radix primitives
- **Authentication**: Solana Wallet Adapter + NextAuth.js
- **Code Editor**: CodeMirror 6 with Rust/TypeScript support
- **State Management**: React Context + localStorage (stubbed for on-chain)
- **i18n**: Multi-language support (EN, PT-BR, ES)

## Features Implemented

### Core Pages
- ✅ Landing Page with hero, features, course previews
- ✅ Course Catalog with filtering and search
- ✅ Course Detail with module/lesson structure
- ✅ Lesson View with interactive code editor
- ✅ User Dashboard with progress tracking
- ✅ Leaderboard with XP-based rankings
- ✅ Wallet authentication (Phantom, Solflare)
- ✅ Gamification system (XP, levels, streaks)
- ✅ Multi-language support
- ✅ Light/Dark theme toggle

### Gamification System
- **XP & Leveling**: `Level = floor(sqrt(totalXP / 100))`
- **Streaks**: Consecutive days with activity
- **Achievements**: Bitmap-based system (256 possible)
- **Leaderboard**: Off-chain indexing of XP balances

### Code Editor Integration
- ✅ Rust syntax highlighting
- ✅ TypeScript/JavaScript support
- ✅ Real-time code execution simulation
- ✅ Test case validation
- ✅ Solution reveal functionality

### On-Chain Integration (Stubbed)
- `LearningProgressService` interface for future on-chain connection
- Local storage implementation for development
- Ready for Solana program integration

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm/yarn/npm
- Solana CLI (for local development)

### Installation

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Development

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Architecture

### Service Layer
- `LearningProgressService`: Main interface for learning data
- `LocalLearningProgressService`: Local implementation (stub)
- Ready for on-chain program integration

### Component Structure
- **Pages**: App router structure in `/src/app`
- **Components**: Reusable UI in `/src/components`
- **UI Primitives**: Headless components in `/src/components/ui`
- **Services**: Business logic in `/src/services`

### Data Flow
1. User interacts with UI components
2. Components call service methods
3. Services handle local storage (stub) or on-chain calls
4. Data flows back to components for display

## Deployment

### Vercel (Recommended)

```bash
pnpm build
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Future Enhancements

- [ ] Actual on-chain program integration
- [ ] Google/GitHub authentication
- [ ] Admin dashboard for course management
- [ ] Community forum section
- [ ] Advanced analytics dashboard
- [ ] Mobile app with Capacitor

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes (`git commit -am 'feat: add your feature'`)
4. Push to the branch (`git push origin feat/your-feature`)
5. Open a Pull Request

## License

MIT License. See `LICENSE` for more information.

## Contact

- Twitter: [@SuperteamBR](https://twitter.com/SuperteamBR)
- GitHub: [superteam-br/superteam-academy](https://github.com/superteam-br/superteam-academy)
- Website: [superteam.academy](https://superteam.academy)