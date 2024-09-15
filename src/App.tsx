if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require('./devtools/ReactotronConfig.ts');
}
import './utils/gestureHandler';
import './utils/ignoreWarnings';
import React from 'react';
import {initialWindowMetrics, SafeAreaProvider} from 'react-native-safe-area-context';
import {ErrorBoundary} from './screens/ErrorScreen/ErrorBoundary';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppNavigator} from './navigators/AppNavigator';

export const queryClient = new QueryClient();

function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary catchErrors={'always'}>
          <AppNavigator />
        </ErrorBoundary>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
