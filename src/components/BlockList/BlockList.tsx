import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import Link from "@material-ui/core/Link";
import hexToDate from "../../helpers/hexToDate";
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
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography>Block Number</Typography></TableCell>
            <TableCell><Typography>Hash</Typography></TableCell>
            <TableCell><Typography>Timestamp</Typography></TableCell>
            <TableCell><Typography>Transactions</Typography></TableCell>
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
                  <Typography>{hexToDate(b.timestamp)}</Typography>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <Typography>{b.transactions.length}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

  );
}

export default BlockList;
