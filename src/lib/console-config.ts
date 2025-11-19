// Console configuration to reduce verbose logging in development
export const configureConsole = () => {
  if (process.env.NODE_ENV === 'development') {
    // Store original console methods
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    // Firebase-specific log filtering
    console.log = (...args) => {
      const message = args.join(' ');
      
      // Skip Firebase verbose logs
      if (
        message.includes('FirebaseProvider') ||
        message.includes('useEffect iniciado') ||
        message.includes('onAuthStateChanged') ||
        message.includes('USECOLLECTION') ||
        message.includes('memoizedTargetRefOrQuery') ||
        message.includes('snapshot.docs.length') ||
        message.includes('Data processed, results') ||
        message.includes('State updated, isLoading set to false')
      ) {
        return;
      }

      originalLog.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      
      // Skip Firebase configuration warnings in development
      if (
        message.includes('Automatic initialization failed') ||
        message.includes('Falling back to firebase config object')
      ) {
        return;
      }

      originalWarn.apply(console, args);
    };

    console.info = (...args) => {
      const message = args.join(' ');
      
      // Skip Firebase info logs
      if (
        message.includes('Firebase') ||
        message.includes('Firestore')
      ) {
        return;
      }

      originalInfo.apply(console, args);
    };
  }
};

// Clean console configuration for production
export const configureProductionConsole = () => {
  if (process.env.NODE_ENV === 'production') {
    // Disable all console logs in production except errors
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    // Keep console.error for debugging
  }
};