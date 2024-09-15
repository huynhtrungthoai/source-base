import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppStackScreenProps, goBack} from '../navigators';
import {colors} from '../theme';
import {Header} from '../components';
import {ScreenConst} from '../constants';
import WebView from 'react-native-webview';
import {Images} from '../theme/images';

interface WebScreenProps extends AppStackScreenProps<ScreenConst.WEB_SCREEN> {}

export const WebScreen: FC<WebScreenProps> = function WebScreen(_props) {
  const {url, title} = _props?.route?.params || {};

  return (
    <View style={styles.container}>
      <Header
        title={title}
        numberOfLines={1}
        safeAreaEdges={['top']}
        titleStyle={styles.headerTitle}
        backgroundColor={colors.palette.primary500}
        LeftActionComponent={
          <TouchableOpacity hitSlop={8} onPress={goBack} style={styles.leftButton}>
            <Image source={Images.iconBack} style={styles.leftIcon} />
          </TouchableOpacity>
        }
      />
      <WebView source={{uri: url}} style={styles.container} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headerTitle: {color: '#FFF'},
  leftButton: {marginLeft: 16},
  leftIcon: {height: 24, width: 24, tintColor: '#FFF'},
});
