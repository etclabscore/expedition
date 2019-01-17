import * as React from 'react';
import { Link } from 'react-router-dom';
import { BlockWithoutTxData } from 'emerald-js';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';

export interface BlockListProps {
  blocks: Array<BlockWithoutTxData>;
}


const rightPaddingFix = {
  paddingRight: '24px'
}

function BlockList({ blocks }: BlockListProps) {
  const sortedBlocks = blocks.sort((_a, _b) => {
    return _b.number - _a.number;
  })
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><Typography>#</Typography></TableCell>
          <TableCell><Typography>Hash</Typography></TableCell>
          <TableCell><Typography>Timestamp</Typography></TableCell>
          <TableCell><Typography>Txs</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedBlocks.map(b => {
           return (
             <TableRow key={b.number!}>
               <TableCell component="th" scope="row"><Typography>{b.number}</Typography></TableCell>
                 <TableCell style={rightPaddingFix}><Link to={`/block/${b.hash}`}>{b.hash}</Link></TableCell>
                 <TableCell style={rightPaddingFix}>
                   <Typography>{b.timestamp}</Typography>
                 </TableCell>
                 <TableCell style={rightPaddingFix}>
                   <Typography>{b.transactions.length}</Typography>
                 </TableCell>
             </TableRow>
           );
        })}
      </TableBody>
    </Table>
  );
}

export default BlockList;