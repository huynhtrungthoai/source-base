import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppStackScreenProps, goBack} from '../navigators';
import {spacing} from '../theme';
import {Screen, Text} from '../components';
import {ScreenConst} from '../constants';
import WebView from 'react-native-webview';

interface WebScreenProps extends AppStackScreenProps<ScreenConst.WEB_SCREEN> {}

export const WebScreen: FC<WebScreenProps> = function WebScreen(_props) {
  console.log(`🚀 ~ WebScreen ~ _props:`, _props);

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Text>Back</Text>
      </TouchableOpacity>

      <View style={{flex: 1, height: 500, width: 500, backgroundColor: 'red'}}>
        <WebView source={{uri: 'https://google.com'}} style={{flex: 1, height: 300, width: 300}} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
});
