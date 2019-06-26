import * as React from "react";
import { Link } from "react-router-dom";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

export interface ITxListProps {
  transactions: any[];
}

function TxListItem({ tx }: { tx: any }) {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/tx/${tx.hash}`}>
          {tx.hash}
        </Link>
      </TableCell>

      <TableCell>
        <Link to={`/address/${tx.from}`}>
          {tx.from}
        </Link>
      </TableCell>

      <TableCell>
        {tx.to !== null ?
          <Link to={`/address/${tx.to}`}>
            {tx.to}
          </Link>
        : null}
      </TableCell>

      <TableCell>{parseInt(tx.transactionIndex, 16)}</TableCell>
    </TableRow>
  );
}

function TxList(props: ITxListProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Hash</TableCell>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell>Index</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {props.transactions.map((tx: any) => <TxListItem key={tx.hash} tx={tx} />)}
      </TableBody>
    </Table>
  );
}

export default TxList;
