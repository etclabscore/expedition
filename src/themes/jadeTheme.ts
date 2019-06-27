import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {
        background: "#fff !important",
      },
    },
  },
  palette: {
    background: {
      default: "#fff",
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#212121",
      paper: "black",
    },
  },
  overrides: {
    MuiTable: {
      root: {
        background: "transparent !important",
      },
    },
    MuiTypography: {
      root: {
        color: "#fff",
      },
    },
  },
});

export default {
  darkTheme,
  lightTheme,
};
