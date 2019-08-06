import { grey } from "@material-ui/core/colors";
import { Theme } from "@material-ui/core";

const sansSerif = "'Roboto', 'Helvetica Neue', Helvetica, sans-serif";

const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize: 12,
  letterSpacing: "normal",
  padding: 10,
  fill: grey[400],
  stroke: "transparent",
  strokeWidth: 0,
};

const centeredLabelStyles = {
  ...baseLabelStyles,
  textAnchor: "middle",
};

const getTheme = (theme: Theme) => ({
  axis: {
    style: {
      axis: {
        stroke: grey[400],
        strokeWidth: 2,
      },
      axisLabel: {
        ...centeredLabelStyles,
      },
      grid: {
        stroke: "none",
      },
      ticks: {
        stroke: grey[400],
      },
      tickLabels: {
        padding: 5,
        fill: grey[400],
        strokeWidth: 1,
      },
    },
  },
  line: {
    style: {
      data: {
        stroke: theme.palette.primary.main,
        strokeWidth: 2,
      },
      labels: {
        ...baseLabelStyles,
      },
    },
  },
  bar: {
    style: {
      data: {
        fill: theme.palette.primary.main,
        stroke: theme.palette.primary.main,
      },
      labels: {
        ...baseLabelStyles,
      },
    },
  },
});

export default getTheme;
