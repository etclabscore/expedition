import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import hexToNumber from "../../helpers/hexToNumber";

export interface ITxListProps {
  transactions: any[];
}

function TxListItem({ tx }: { tx: any }) {
  return (
    <TableRow>
      <TableCell>
        <Link
          component={({ className, children }: { children: any, className: string }) => (
            <RouterLink className={className} to={`/tx/${tx.hash}`} >
              {children}
            </RouterLink>
          )}>
          {tx.hash}
        </Link>
      </TableCell>

      <TableCell>
        <Link
          component={({ className, children }: { children: any, className: string }) => (
            <RouterLink className={className} to={`/address/${tx.from}`} >
              {children}
            </RouterLink>
          )}>
          {tx.from}
        </Link>
      </TableCell>

      <TableCell>
        {tx.to !== null ?
          <Link
            component={({ className, children }: { children: any, className: string }) => (
              <RouterLink className={className} to={`/address/${tx.to}`} >
                {children}
              </RouterLink>
            )}>
            {tx.to}
          </Link>
          : null}
      </TableCell>

      <TableCell>{hexToNumber(tx.transactionIndex)}</TableCell>
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
