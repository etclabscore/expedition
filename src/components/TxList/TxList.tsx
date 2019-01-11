import * as React from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from 'emerald-js';
import { Account, Address } from 'emerald-js-ui';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export interface TxListProps {
  transactions: Transaction[];
}

function TxListItem({ tx }: { tx: Transaction }) {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/tx/${tx.hash}`}>
          <Address shortened={true} id={tx.hash} />
        </Link>
      </TableCell>

      <TableCell>
        <Link to={`/address/${tx.from}`}>
          <Account address={tx.from} identity />
        </Link>
      </TableCell>

      <TableCell>
        {tx.to !== null ?
          <Link to={`/address/${tx.to}`}>
            <Account address={tx.to} identity />
          </Link>
        : null}
      </TableCell>

      <TableCell>{tx.transactionIndex}</TableCell>
    </TableRow>
  );
}

function TxList(props: TxListProps) {
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
        {props.transactions.map(tx => <TxListItem key={tx.hash} tx={tx} />)}
      </TableBody>
    </Table>
  );
}

export default TxList;
