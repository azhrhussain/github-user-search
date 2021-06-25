
const Colors = {
  primary: '#3b5998',
  secondary: '#f0f0f0',
  textPrimary: '#ffffff',
  textSecondary: '#000000',
  borderPrimary: '#d8d8d8',
  bodrerSecondary: '#d0d0d0',
  danger: '#ff0000',
  buttonDisabledBg: '#0099cc',
};

const SPACE_WIDTH = 5;

const spacing = (multiplier = 1): number => multiplier * SPACE_WIDTH;

export {
  Colors,
  spacing,
};