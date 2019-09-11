import * as React from "react";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardHeader, CardContent, Typography, Chip } from "@material-ui/core";
import hexToDate from "../../helpers/hexToDate";
import hexToString from "../../helpers/hexToString";
import hexToNumber from "../../helpers/hexToNumber";
import { GetBlockByNumberResult as IBlock } from "@etclabscore/ethereum-json-rpc";

interface IProps {
  block: IBlock;
}

export default function BlockCard(props: IProps) {
  const { block } = props;

  if (!block) {
    return null;
  }

  return (
    <Link
      component={({ className, children }: { children: any, className: string }) => (
        <RouterLink className={className} to={`/block/${block.hash}`} >
          {children}
        </RouterLink>
      )}>
      <Card elevation={1}>
        <CardHeader title={hexToNumber(block.number!)}>
        </CardHeader>
        <CardContent>
          <Typography variant="caption" style={{ fontSize: "11px" }}>{block.hash}</Typography>
          <Typography gutterBottom>{hexToDate(block.timestamp!)}</Typography>
          <Typography gutterBottom>{hexToString(block.extraData!)}</Typography>
          <Chip label={`${block.transactions!.length} Transactions`}>
          </Chip>
        </CardContent>
      </Card>
    </Link>
  );
}
