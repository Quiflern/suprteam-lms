import posthog from 'posthog-js';
import { init } from '@sentry/nextjs';

// Initialize PostHog
if (typeof window !== 'undefined') {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false, // We'll capture manually
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug();
      },
    });
  }
}

// Initialize Sentry
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  });
}

export function capturePageView() {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture('$pageview');
  }
}

export function trackEvent(event: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture(event, properties);
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Tracked event:', event, properties);
  }
}

export function identifyUser(userId: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.identify(userId, properties);
  }
}

// Learning-specific analytics events
export const Analytics = {
  trackLessonStarted: (courseId: string, lessonId: string) => {
    trackEvent('lesson_started', { courseId, lessonId });
  },
  
  trackLessonCompleted: (courseId: string, lessonId: string, xpEarned: number) => {
    trackEvent('lesson_completed', { courseId, lessonId, xpEarned });
  },
  
  trackCourseEnrolled: (courseId: string) => {
    trackEvent('course_enrolled', { courseId });
  },
  
  trackCourseCompleted: (courseId: string, totalXp: number) => {
    trackEvent('course_completed', { courseId, totalXp });
  },
  
  trackXPEarned: (amount: number, source: string) => {
    trackEvent('xp_earned', { amount, source });
  },
  
  trackStreakUpdated: (currentStreak: number, longestStreak: number) => {
    trackEvent('streak_updated', { currentStreak, longestStreak });
  },
  
  trackAchievementUnlocked: (achievementId: string) => {
    trackEvent('achievement_unlocked', { achievementId });
  },
  
  trackWalletConnected: (walletType: string) => {
    trackEvent('wallet_connected', { walletType });
  },
  
  trackAuthMethodAdded: (method: string) => {
    trackEvent('auth_method_added', { method });
  },
};