import React, {useState} from 'react';
import {
  Pressable,
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Text,
} from 'react-native';
import {omit} from 'lodash';
import Metrics from '../theme/metrics';
import {colors} from '../theme';

interface ButtonProps {
  loading?: boolean;
  disable?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
  children?: React.ReactNode;
  type?: 'default' | 'outline' | 'alert';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
}

export const Button = (props: ButtonProps) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const {
    loading = false,
    style,
    textStyle,
    children,
    type = 'default',
    size = 'lg',
    disable = false,
    leftIcon = null,
    rightIcon = null,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
  } = props;

  const onButtonPress = (e: GestureResponderEvent) => {
    if (!disable) {
      onPress && onPress(e);
    }
  };

  const onButtonLongPress = (e: GestureResponderEvent) => {
    if (!disable) {
      onLongPress && onLongPress(e);
    }
  };

  const onButtonPressIn = (e: GestureResponderEvent) => {
    if (!disable) {
      setPressed(true);
      onPressIn && onPressIn(e);
    }
  };

  const onButtonPressOut = (e: GestureResponderEvent) => {
    if (!disable) {
      setPressed(false);
      onPressOut && onPressOut(e);
    }
  };

  const _buttonStyle = StyleSheet.flatten([
    styles.buttonContainer,
    styles[`${size}Button`],
    styles[`${type}Background`],
    {...(pressed && {opacity: 0.6})},
    {...(disable && {opacity: 0.7})},
    style,
  ]);

  const _textStyle = [styles[`${size}Text`], styles[`${type}TextColor`], textStyle];

  return (
    <Pressable
      {...omit(props, ['children', 'style', 'textStyle'])}
      disabled={disable}
      onPress={onButtonPress}
      onLongPress={onButtonLongPress}
      onPressIn={onButtonPressIn}
      onPressOut={onButtonPressOut}
      style={_buttonStyle}>
      {loading ? (
        <ActivityIndicator
          animating
          size={'small'}
          color={styles[`${type}IndicatorColor`].color}
          style={styles[`${size}Indicator`]}
        />
      ) : null}
      {leftIcon && leftIcon}
      <Text style={_textStyle}>{children}</Text>
      {rightIcon && rightIcon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: Metrics.SPACING_SM,
    borderRadius: Metrics.RADIUS_SM,
  },
  // Button size
  smButton: {height: Metrics.BUTTON_SM},
  mdButton: {height: Metrics.BUTTON_MD},
  lgButton: {height: Metrics.BUTTON_LG},

  // Font size
  smText: {fontSize: Metrics.FONT_SM, fontWeight: '600'},
  mdText: {fontSize: Metrics.FONT_MD, fontWeight: '600'},
  lgText: {fontSize: Metrics.FONT_LG, fontWeight: '600'},

  // Indicator size
  smIndicator: {transform: [{scale: 0.6}], marginRight: Metrics.SPACING_XS},
  mdIndicator: {transform: [{scale: 0.8}], marginRight: Metrics.SPACING_XS},
  lgIndicator: {transform: [{scale: 1}], marginRight: Metrics.SPACING_XS},

  // Button background color
  defaultBackground: {backgroundColor: colors.palette.primary500},
  outlineBackground: {
    borderWidth: 1,
    borderColor: colors.palette.primary500,
    backgroundColor: colors.palette.neutral100,
  },
  alertBackground: {backgroundColor: colors.error},

  // Text color
  defaultTextColor: {color: colors.palette.neutral100},
  outlineTextColor: {color: colors.palette.primary500},
  alertTextColor: {color: colors.palette.neutral100},

  // Indicator color
  defaultIndicatorColor: {color: colors.palette.neutral100},
  outlineIndicatorColor: {color: colors.errorBackground},
  alertIndicatorColor: {color: colors.palette.neutral100},
});
