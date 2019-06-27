import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

const rightPaddingFix = {
  paddingRight: "24px",
};

function BlockList({ blocks }: any) {
  if (!blocks) {
    return null;
  }
  const sortedBlocks = blocks.sort((a: { number: number }, b: { number: number }) => {
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
        {sortedBlocks.map((b: any) => {
          return (
            <TableRow key={b.number}>
              <TableCell component="th" scope="row"><Typography>{parseInt(b.number, 16)}</Typography></TableCell>
              <TableCell style={rightPaddingFix}>
                <Link
                  component={({ className, children }: { children: any, className: string }) => (
                    <RouterLink className={className} to={`/block/${b.hash}`} >
                      {children}
                    </RouterLink>
                  )}>
                  {b.hash}
                </Link>
              </TableCell>
              <TableCell style={rightPaddingFix}>
                <Typography>{new Date(parseInt(b.timestamp, 16) * 1000).toISOString()}</Typography>
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
