import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  blue800, blue700, grey400,
  deepOrangeA400, grey100, grey500,
  grey300, darkBlack, cyan500,
  fullBlack, white, grey, black } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

export default getMuiTheme({
  palette: {
    primary1Color: blue800,
    primary2Color: blue700,
    primary3Color: grey400,
    accent1Color: deepOrangeA400,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: black,
    alternateTextColor: grey,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});

