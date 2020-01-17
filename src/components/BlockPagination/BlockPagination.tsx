
import React from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";

interface IProps {
  from: number;
  to: number;
  disableNext?: boolean;
  disablePrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  style?: any;
}

const BlockPagination: React.FC<IProps> = (props) => {

  return (
    <Grid container>
      <Grid container justify="flex-end">
        <IconButton onClick={props.onPrev} disabled={props.disablePrev}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={props.onNext} disabled={props.disableNext}>
          <ArrowForwardIos />
        </IconButton>
      </Grid>
      <Grid container justify="flex-end">
        <Typography>Showing {(props.to - props.from) + 1} Block Range: <b>{props.to}</b> - {props.from}</Typography>
      </Grid>
    </Grid>
  );
};

export default BlockPagination;
