import Toast from 'react-native-toast-message';

const DEFAULT_DURATION = 2000;

interface AlertProps {
  text: string;
  duration?: number;
  topOffset?: number;
}

export const alertSuccess = ({text, duration, topOffset}: AlertProps) => {
  Toast.show({
    type: 'success',
    text1: text,
    position: 'top',
    topOffset: topOffset || 20,
    visibilityTime: duration || DEFAULT_DURATION,
  });
};

export const alertError = ({text, duration, topOffset}: AlertProps) => {
  Toast.show({
    type: 'error',
    text1: text,
    position: 'top',
    topOffset: topOffset || 20,
    visibilityTime: duration || DEFAULT_DURATION,
  });
};

export const alertWithIcon = ({text, duration, topOffset}: AlertProps) => {
  Toast.show({
    type: 'info',
    text1: text,
    position: 'top',
    topOffset: topOffset || 20,
    visibilityTime: duration || DEFAULT_DURATION,
  });
};
