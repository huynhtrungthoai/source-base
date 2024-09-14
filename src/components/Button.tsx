import React, {ComponentType} from 'react';
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {colors, spacing} from '../theme';
import {Text, TextProps} from './Text';

type Presets = keyof typeof $viewPresets;

export interface ButtonAccessoryProps {
  style: StyleProp<any>;
  pressableState: PressableStateCallbackType;
  disabled?: boolean;
}

export interface ButtonProps extends PressableProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps['text'];
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>;
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>;
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextStyle?: StyleProp<TextStyle>;
  /**
   * One of the different types of button presets.
   */
  preset?: Presets;
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   * https://reactnative.dev/docs/pressable#disabled
   */
  disabled?: boolean;
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>;
}

/**
 * @example
 * <Button
 *   tx="common.ok"
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export function Button(props: ButtonProps) {
  const {
    text,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    ...rest
  } = props;

  const preset: Presets = props.preset ?? 'default';

  function $viewStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
      !!disabled && $disabledViewStyleOverride,
    ];
  }

  function $textStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
      !!disabled && $disabledTextStyleOverride,
    ];
  }

  return (
    <Pressable
      style={$viewStyle}
      accessibilityRole="button"
      accessibilityState={{disabled: !!disabled}}
      {...rest}
      disabled={disabled}>
      {state => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory
              style={$leftAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}

          <Text text={text} style={$textStyle(state)}>
            {children}
          </Text>

          {!!RightAccessory && (
            <RightAccessory
              style={$rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  );
}

const $baseViewStyle: ViewStyle = {
  minHeight: 56,
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  overflow: 'hidden',
};

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 20,
  textAlign: 'center',
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
};

const $rightAccessoryStyle: ViewStyle = {marginStart: spacing.xs, zIndex: 1};
const $leftAccessoryStyle: ViewStyle = {marginEnd: spacing.xs, zIndex: 1};

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.palette.neutral400,
      backgroundColor: colors.palette.neutral100,
    },
  ] as StyleProp<ViewStyle>,

  filled: [
    $baseViewStyle,
    {backgroundColor: colors.palette.neutral300},
  ] as StyleProp<ViewStyle>,

  reversed: [
    $baseViewStyle,
    {backgroundColor: colors.palette.neutral800},
  ] as StyleProp<ViewStyle>,
};

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  filled: $baseTextStyle,
  reversed: [$baseTextStyle, {color: colors.palette.neutral100}],
};

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: {backgroundColor: colors.palette.neutral200},
  filled: {backgroundColor: colors.palette.neutral400},
  reversed: {backgroundColor: colors.palette.neutral700},
};

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: {opacity: 0.9},
  filled: {opacity: 0.9},
  reversed: {opacity: 0.9},
};
