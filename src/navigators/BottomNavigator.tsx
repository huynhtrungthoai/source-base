import {BottomTabScreenProps as BottomTabProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, spacing} from '../theme';
import {AppStackParamList, AppStackScreenProps} from './AppNavigator';
import * as Screens from '../screens';
import {Images} from '../theme/images';
import {Text} from '../components';

export type BottomTabParamList = {
  HomeScreen: undefined;
  FavoriteScreen: undefined;
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<
  BottomTabProps<BottomTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>;

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomNavigator() {
  const {bottom} = useSafeAreaInsets();

  const renderTitle = (title: string, focused: boolean) => (
    <Text style={{color: focused ? colors.palette.primary500 : undefined, fontWeight: focused ? '600' : undefined}}>
      {title}
    </Text>
  );

  const renderIcon = (icon: ImageSourcePropType, focused: boolean) => (
    <Image source={icon} style={focused ? styles.iconBigSize : styles.iconSize} />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: [styles.tabBar, {height: bottom + 60}],
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Screens.HomeScreen as never}
        options={{
          tabBarLabel: ({focused}) => renderTitle('Home', focused),
          tabBarIcon: ({focused}) => renderIcon(Images.iconHome, focused),
        }}
      />

      <Tab.Screen
        name="FavoriteScreen"
        component={Screens.FavoriteScreen as never}
        options={{
          tabBarLabel: ({focused}) => renderTitle('Favorite', focused),
          tabBarIcon: ({focused}) => renderIcon(Images.iconHeart, focused),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    backgroundColor: colors.background,
    borderTopColor: '#C4C4C4',
  },
  tabBarItem: {
    paddingTop: spacing.md,
  },
  tabBarLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  iconSize: {
    height: 24,
    width: 24,
  },
  iconBigSize: {
    height: 26,
    width: 26,
  },
});
