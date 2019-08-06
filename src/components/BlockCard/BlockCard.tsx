import * as React from "react";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardHeader, CardContent, Typography, Chip } from "@material-ui/core";
import moment from "moment";

interface IProps {
  block: any;
}

export default function BlockCard(props: IProps) {
  const { block } = props;
  const d = moment(new Date(parseInt(block.timestamp, 16) * 1000).toISOString()).format('MMMM Do YYYY, h:mm:ss a')

  return (
    <Link
      component={({ className, children }: { children: any, className: string }) => (
        <RouterLink className={className} to={`/block/${block.hash}`} >
          {children}
        </RouterLink>
      )}>
      <Card elevation={1}>
        <CardHeader title={parseInt(block.number, 16)}>
        </CardHeader>
        <CardContent>
          <Typography variant="caption" style={{ fontSize: "11px" }}>{block.hash}</Typography>
          <Typography gutterBottom>{d}</Typography>
          <Chip label={`${block.transactions.length} Transactions`}>
          </Chip>
        </CardContent>
      </Card>
    </Link>
  );
}
