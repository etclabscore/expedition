import * as React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";

interface IProps {
  children: any;
  title: string;
}

const ChartCard: React.FC<IProps> = (props) => {
  return (
    <Card style={{background: "transparent"}} elevation={0}>
      <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        {props.children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
