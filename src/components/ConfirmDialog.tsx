import React, {forwardRef, useRef, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, StyleProp, ViewStyle, View} from 'react-native';
import Modal from 'react-native-modal';
import Metrics from '../theme/metrics';
import {Text} from './Text';
import {Button} from './Button';

interface ConfirmDialogProps {
  children: any;
  isVisible?: boolean;
  title?: string | React.ReactNode;
  submitText?: string;
  cancelText?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  onBackdropPress?: () => void;
  useExternalVisibility?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const ConfirmDialog = forwardRef((props: ConfirmDialogProps, ref: any) => {
  const {
    children,
    isVisible = false,
    title,
    submitText = 'Đồng ý',
    cancelText = 'Huỷ',
    onSubmit = undefined,
    onCancel = undefined,
    onBackdropPress,
    useExternalVisibility = false,
    style,
  } = props;

  const refCallbacks = useRef<any>({});
  const [_isVisible, setVisible] = useState(false);
  const visible = useExternalVisibility ? isVisible : _isVisible;

  // Ref external
  React.useImperativeHandle(
    ref,
    () => ({
      // Ref toggle dialog show/hide
      toggle: (callbacks: () => void) => {
        toggleDialog(callbacks);
      },
      // Ref show dialog
      show: (callbacks: () => void) => {
        onShowDialog(callbacks);
      },
      // Ref hide dialog
      hide: () => {
        onHideDialog();
      },
    }),
    [],
  );

  // Toggle dialog show/hide
  const toggleDialog = (refDialog: any) => {
    refCallbacks.current = refDialog;
    setVisible(!isVisible);
  };

  // Hide dialog
  const onHideDialog = () => {
    setVisible(false);
  };

  // Show dialog
  const onShowDialog = (refDialog: any) => {
    refCallbacks.current = refDialog;
    setVisible(true);
  };

  const onHideBackdrop = () => {
    onHideDialog();
    onBackdropPress && onBackdropPress();
  };

  const onSubmitPress = () => {
    onHideDialog();
    onSubmit && onSubmit();
    refCallbacks?.current?.onOK && refCallbacks?.current?.onOK();
  };

  const onCancelPress = () => {
    onHideDialog();
    onCancel && onCancel();
  };

  const _containerStyle = StyleSheet.flatten([styles.containerStyle, style]);

  if (!visible) return null;
  return (
    <KeyboardAvoidingView>
      <Modal
        isVisible={visible}
        useNativeDriver
        animationIn="fadeIn"
        animationOut="fadeOut"
        statusBarTranslucent
        animationInTiming={300}
        animationOutTiming={300}
        deviceHeight={Metrics.SCREEN_HEIGHT + 80}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        onBackdropPress={onHideBackdrop}>
        <View style={_containerStyle}>
          {title && (
            <Text weight="semibold" style={{fontWeight: '600'}} size={'lg'}>
              {title}
            </Text>
          )}
          {children}
          <View style={styles.buttonView}>
            {onCancel && (
              <Button type="outline" style={styles.halfScreenButton} onPress={onCancelPress}>
                {cancelText}
              </Button>
            )}
            {!!onCancel && !!onSubmit && <View style={{flex: 1}} />}
            {onSubmit && (
              <Button style={!!onSubmit ? styles.halfScreenButton : styles.fullScreenButton} onPress={onSubmitPress}>
                {submitText}
              </Button>
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 0,
  },
  blurModal: {
    minHeight: 20,
    borderRadius: 8,
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  halfScreenButton: {width: '45%'},
  fullScreenButton: {width: '100%'},
  buttonView: {marginTop: 32, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
});
