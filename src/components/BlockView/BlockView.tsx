import * as React from 'react';
import { Link } from 'react-router-dom';
import { BlockWithTxData } from 'emerald-js';
import { Account } from 'emerald-js-ui';
import TxList from '../TxList';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export interface Props {
  block: BlockWithTxData;
}

function BlockView(props: Props) {
  const { block } = props;

  if (!block) {
    return (<div>Loading...</div>);
  }

  const {
    number, timestamp, hash, parentHash, miner, nonce, difficulty,
    extraData, stateRoot, transactionsRoot, receiptsRoot, transactions,
  } = block

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>{number}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>{new Date(timestamp).toString()}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Hash</TableCell>
            <TableCell>{hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>ParentHash</TableCell>
            <TableCell>
              <Link to={`/block/${parentHash}`}>{parentHash}</Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Miner</TableCell>
            <TableCell>
              <Account address={miner} identity />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Nonce</TableCell>
            <TableCell>{nonce}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Difficulty</TableCell>
            <TableCell>{difficulty.toString()}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Extra Data</TableCell>
            <TableCell>{extraData}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>State Root</TableCell>
            <TableCell>{stateRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Transaction Root</TableCell>
            <TableCell>{transactionsRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Receipts Root</TableCell>
            <TableCell>{receiptsRoot}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <TxList transactions={transactions}/>
    </div>
  );
}

export default BlockView;
