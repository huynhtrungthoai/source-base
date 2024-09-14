import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {AppStackScreenProps} from '../navigators';
import {spacing} from '../theme';
import {Screen, Text} from '../components';
import {ScreenConstants} from '../constants';

interface HomeScreenProps
  extends AppStackScreenProps<ScreenConstants.HOME_SCREEN> {}

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen(_props) {
  return (
    <Screen
      preset="auto"
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={styles.container}>
      <Text>{'Home Screen'}</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
});
