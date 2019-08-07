import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import TxList from "../TxList";
import moment from "moment";

import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

function BlockView(props: any) {
  const { block } = props;

  if (!block) {
    return (<div>Loading...</div>);
  }

  const {
    timestamp, hash, parentHash, miner, nonce, difficulty,
    extraData, stateRoot, transactionsRoot, receiptsRoot, transactions,
  } = block;
  const d = moment(
    new Date(parseInt(timestamp, 16) * 1000).toISOString(),
  ).format("MMMM Do YYYY, h:mm:ss a");

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>{parseInt(block.number, 16)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>{d}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Hash</TableCell>
            <TableCell>{hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>ParentHash</TableCell>
            <TableCell>
              <Link
                component={({ className, children }: { children: any, className: string }) => (
                  <RouterLink className={className} to={`/block/${parentHash}`} >
                    {children}
                  </RouterLink>
                )}>
                {parentHash}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Miner</TableCell>
            <TableCell>
              <Link
                component={({ className, children }: { children: any, className: string }) => (
                  <RouterLink className={className} to={`/address/${miner}`} >
                    {children}
                  </RouterLink>
                )}>
                {miner}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Nonce</TableCell>
            <TableCell>{parseInt(nonce, 16)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Difficulty</TableCell>
            <TableCell>{parseInt(difficulty, 16)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Extra Data</TableCell>
            <TableCell>{new Buffer(extraData.substring(2), "hex").toString()}</TableCell>
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

      <TxList transactions={transactions} />
    </div>
  );
}

export default BlockView;
