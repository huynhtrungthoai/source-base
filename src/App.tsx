if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require('./devtools/ReactotronConfig.ts');
}
import './utils/gestureHandler';
import './utils/ignoreWarnings';
import React from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {ErrorBoundary} from './screens/ErrorScreen/ErrorBoundary';
import {AppNavigator} from './navigators/AppNavigator';

function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={'always'}>
        <AppNavigator />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;
