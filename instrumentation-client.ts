'use client';

import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (typeof window !== 'undefined') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Session Replay
      integrations: [
        Sentry.replayIntegration(),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for tracing.
      // We recommend adjusting this value in production
      tracesSampleRate: 0.1,

      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });
  }
}

// Required for router instrumentation
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;