import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import * as Screens from '../screens';
import {navigationRef} from './navigationUtils';
import {ScreenConst} from '../constants';

export type AppStackParamList = {
  HomeScreen: undefined;
  WebScreen: {url: string};
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ScreenConst.HOME_SCREEN}>
      <Stack.Screen name={ScreenConst.HOME_SCREEN} component={Screens.HomeScreen} />
      <Stack.Screen name={ScreenConst.WEB_SCREEN} component={Screens.WebScreen} />
    </Stack.Navigator>
  );
};

export interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
