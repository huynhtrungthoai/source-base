import {
  NavigationState,
  PartialState,
  createNavigationContainerRef,
} from '@react-navigation/native';
import type {AppStackParamList} from './AppNavigator';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
): string {
  const route = state.routes[state.index ?? 0];
  if (!route.state) return route.name as keyof AppStackParamList;
  return getActiveRouteName(route.state as NavigationState<AppStackParamList>);
}

export const onNavigationStateChange = (state: NavigationState | undefined) => {
  if (state !== undefined) {
    const currentRouteName = getActiveRouteName(state);
    if (__DEV__) {
      console.log('=>>> Navigate to:', currentRouteName);
    }
  }
};

export function navigate(name: unknown, params?: unknown) {
  if (navigationRef.isReady()) {
    // @ts-expect-error
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(
  state: Parameters<typeof navigationRef.resetRoot>[0] = {index: 0, routes: []},
) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(state);
  }
}
