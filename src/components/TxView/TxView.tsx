import * as React from 'react';
import { Link } from 'react-router-dom';
import { Transaction, TransactionReceipt } from 'emerald-js';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export interface TxViewProps {
  tx: Transaction;
  receipt: TransactionReceipt | null;
}

function renderTxTable(tx: Transaction, receipt: TransactionReceipt | null) {
  return (
    <div>
      <div>General</div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Hash</TableCell>
            <TableCell>{tx.hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Block</TableCell>
            <TableCell>
              <Link to={`/block/${tx.blockHash}`}>{tx.blockHash}</Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Block number</TableCell>
            <TableCell>{tx.blockNumber}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Gas</TableCell>
            <TableCell>{tx.gas}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Gas Price</TableCell>
            <TableCell>{tx.gasPrice.toString()}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Value</TableCell>
            <TableCell>{tx.value.toString()}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>
              <Link to={`/address/${tx.from}`}>{tx.from}</Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>To</TableCell>
            <TableCell>
              {tx.to !== null ?
               <Link to={`/address/${tx.to}`}>{tx.to}</Link>
               : null
              }
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Nonce</TableCell>
            <TableCell>{tx.nonce}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Transaction Index</TableCell>
            <TableCell>{tx.transactionIndex}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Input</TableCell>
            <TableCell>{tx.input}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>ReplayProtected</TableCell>
            <TableCell>{tx.replayProtected && tx.replayProtected.toString()}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>v</TableCell>
            <TableCell>{tx.v}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>r</TableCell>
            <TableCell>{tx.r}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>s</TableCell>
            <TableCell>{tx.s}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div>Receipt</div>
      {receipt &&
       <Table>
         <TableBody>
           <TableRow>
             <TableCell>Hash</TableCell>
             <TableCell>{receipt.transactionHash}</TableCell>
           </TableRow>

           <TableRow>
             <TableCell>Block</TableCell>
             <TableCell>
               <Link to={`/block/${receipt.blockHash}`}>{receipt.blockHash}</Link>
             </TableCell>
           </TableRow>

           <TableRow>
             <TableCell>Block number</TableCell>
             <TableCell>{receipt.blockNumber}</TableCell>
           </TableRow>

           <TableRow>
             <TableCell>Gas Used</TableCell>
             <TableCell>{receipt.gasUsed}</TableCell>
           </TableRow>

           <TableRow>
             <TableCell>Cumulative Gas Used</TableCell>
             <TableCell>{receipt.cumulativeGasUsed}</TableCell>
           </TableRow>

           <TableRow>
             <TableCell>Value</TableCell>
             <TableCell>{tx.value.toString()}</TableCell>
           </TableRow>

           <TableRow>
             <TableCell>From</TableCell>
             <TableCell>
               <Link to={`/address/${receipt.from}`}>{receipt.from}</Link>
             </TableCell>
           </TableRow>

           <TableRow>
             <TableCell>To</TableCell>
             <TableCell>
               <Link to={`/address/${receipt.to}`}>{receipt.to}</Link>
             </TableCell>
           </TableRow>

           <TableRow>
             <TableCell>Contract Address</TableCell>
             <TableCell>{receipt.contractAddress}</TableCell>
           </TableRow>

           <TableRow>
             <TableCell>Transaction Index</TableCell>
             <TableCell>{receipt.transactionIndex}</TableCell>
           </TableRow>

           <TableRow>
             <TableCell>Status</TableCell>
             <TableCell>{receipt.status}</TableCell>
           </TableRow>

           <TableRow>
             <TableCell>Logs</TableCell>
             <TableCell>
               <textarea>{receipt.logs}</textarea>
             </TableCell>
           </TableRow>
         </TableBody>
       </Table>
      }
    </div>
  );
}

function TxView(props: TxViewProps) {
  const { tx, receipt } = props;
  if (!tx) {
    return null;
  }

  return renderTxTable(tx, receipt);
}

export default TxView;
