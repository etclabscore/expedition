import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";

const rightPaddingFix = {
  paddingRight: "24px",
};

function BlockList({ blocks }: any) {
  const sortedBlocks = blocks.sort((a: {number: number}, b: {number: number}) => {
    return b.number - a.number;
  });
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
