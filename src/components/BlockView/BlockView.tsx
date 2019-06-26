import * as React from "react";
import { Link } from "react-router-dom";
import TxList from "../TxList";

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
            <TableCell>{new Date(parseInt(timestamp, 16) * 1000).toString()}</TableCell>
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
                {miner}
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
