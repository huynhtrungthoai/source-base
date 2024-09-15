import React, {ReactElement} from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {colors, spacing} from '../theme';
import {ExtendedEdge, useSafeAreaInsetsStyle} from '../utils/useSafeAreaInsetsStyle';
import {Text, TextProps} from './Text';

export interface HeaderProps {
  numberOfLines?: number;
  titleMode?: 'center' | 'flex';
  titleStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  title?: TextProps['text'];
  leftIcon?: any;
  leftIconColor?: string;
  leftText?: TextProps['text'];
  LeftActionComponent?: ReactElement;
  onLeftPress?: TouchableOpacityProps['onPress'];
  rightIcon?: any;
  rightIconColor?: string;
  rightText?: TextProps['text'];
  RightActionComponent?: ReactElement;
  onRightPress?: TouchableOpacityProps['onPress'];
  safeAreaEdges?: ExtendedEdge[];
}

interface HeaderActionProps {
  backgroundColor?: string;
  icon?: any;
  numberOfLines?: number;
  iconColor?: string;
  text?: TextProps['text'];
  onPress?: TouchableOpacityProps['onPress'];
  ActionComponent?: ReactElement;
}

export function Header(props: HeaderProps) {
  const {
    backgroundColor = colors.background,
    LeftActionComponent,
    leftIcon,
    leftIconColor,
    leftText,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    rightText,
    numberOfLines = undefined,
    safeAreaEdges = ['top'],
    title,
    titleMode = 'center',
    titleContainerStyle: $titleContainerStyleOverride,
    style: $styleOverride,
    titleStyle: $titleStyleOverride,
    containerStyle: $containerStyleOverride,
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <View style={[$container, $containerInsets, {backgroundColor}, $containerStyleOverride]}>
      <View style={[$wrapper, $styleOverride]}>
        <HeaderAction
          text={leftText}
          icon={leftIcon}
          iconColor={leftIconColor}
          onPress={onLeftPress}
          backgroundColor={backgroundColor}
          ActionComponent={LeftActionComponent}
        />
        {!!title && (
          <View
            style={[
              titleMode === 'center' && $titleWrapperCenter,
              titleMode === 'flex' && $titleWrapperFlex,
              $titleContainerStyleOverride,
            ]}
            pointerEvents="none">
            <Text size="md" numberOfLines={numberOfLines} text={title} style={[$title, $titleStyleOverride]} />
          </View>
        )}
        <HeaderAction
          text={rightText}
          icon={rightIcon}
          iconColor={rightIconColor}
          onPress={onRightPress}
          backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
    </View>
  );
}

/**
 * @param {HeaderActionProps} props - The props for the `HeaderAction` component.
 * @returns {JSX.Element} The rendered `HeaderAction` component.
 */
function HeaderAction(props: HeaderActionProps) {
  const {backgroundColor, icon, text, onPress, ActionComponent, iconColor} = props;

  if (ActionComponent) return ActionComponent;

  if (text) {
    return (
      <TouchableOpacity
        style={[$actionTextContainer, {backgroundColor}]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}>
        <Text size="md" text={text} style={$actionText} />
      </TouchableOpacity>
    );
  }

  if (icon) {
    return (
      <Image
        source={icon}
        style={[{height: 24, width: 24, tintColor: iconColor}, $actionIconContainer, {backgroundColor}]}
      />
    );
  }

  return <View style={[$actionFillerContainer, {backgroundColor}]} />;
}

const $wrapper: ViewStyle = {
  height: 56,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const $container: ViewStyle = {
  width: '100%',
};

const $title: TextStyle = {
  textAlign: 'center',
};

const $actionTextContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  paddingHorizontal: spacing.md,
  zIndex: 2,
};

const $actionText: TextStyle = {
  color: colors.tint,
};

const $actionIconContainer: ImageStyle = {
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  paddingHorizontal: spacing.md,
  zIndex: 2,
};

const $actionFillerContainer: ViewStyle = {
  width: 16,
};

const $titleWrapperCenter: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  paddingHorizontal: spacing.xxl,
  zIndex: 1,
};

const $titleWrapperFlex: ViewStyle = {
  justifyContent: 'center',
  flexGrow: 1,
};
