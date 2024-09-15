import {Dimensions, StatusBar} from 'react-native';
const {width, height} = Dimensions.get('window');

const Metrics = {
  // SIZE XS | SM | MD | LG | XL | XXL | XXXL
  getStatusBarHeight: () => {
    return StatusBar.currentHeight;
  },
  // SCREEN WIDTH / HEIGHT
  SCREEN_WIDTH: width < height ? width : height,
  SCREEN_HEIGHT: width < height ? height : width,

  // TAB BAR HEIGHT
  TAB_BAR_HEIGHT: 60,

  // AVATAR SIZE
  AVATAR_SM: 32,
  AVATAR_MD: 64,
  AVATAR_LG: 128,

  // BUTTON HEIGHT
  BUTTON_SM: 26,
  BUTTON_MD: 36,
  BUTTON_LG: 48,

  // SPACING
  SPACING_XS: 4,
  SPACING_SM: 8,
  SPACING_MD: 12,
  SPACING_LG: 16,
  SPACING_XL: 20,

  // BORDER WIDTH
  BORDER_SM: 0.5,
  BORDER_MD: 1,
  BORDER_LG: 2,

  // BORDER RADIUS
  RADIUS_XS: 4,
  RADIUS_SM: 6,
  RADIUS_MD: 8,
  RADIUS_LG: 12,

  // ICON SIZE
  ICON_XS: 16,
  ICON_SM: 20,
  ICON_MD: 24,
  ICON_LG: 32,

  // FONT SIZE
  FONT_XS: 10,
  FONT_SM: 12,
  FONT_MD: 14,
  FONT_LG: 16,
  FONT_XL: 20,

  // HIS SLOPS
  HIT_SLOPS_XS: 4,
  HIT_SLOPS_SM: 6,
  HIT_SLOPS_MD: 8,
  HIT_SLOPS_LG: 10,
};

export default Metrics;
