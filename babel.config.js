module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': ['./src/components'],
          '@constants': ['./src/constants'],
          '@hooks': ['./src/hooks'],
          '@navigators': ['./src/navigators'],
          '@screen': ['./src/screen'],
          '@services': ['./src/services'],
          '@theme': ['./src/theme'],
          '@utils': ['./src/utils'],
        },
      },
    ],
  ],
};
