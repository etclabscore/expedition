import * as React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";

export interface IAddressViewProps {
  address: string;
  balance: string;
  txCount: number;
  code: string;
}

function renderGeneral(props: IAddressViewProps) {
  const { address, balance, txCount, code } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Address: {address}</Typography>
        <Typography variant="h6">Balance: {balance}</Typography>
        <Typography variant="h6">Transactions: {txCount}</Typography>
        <br />
        <div>
          <div>Code</div>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

function AddressView(props: IAddressViewProps) {
  return (
    <React.Fragment>
      {renderGeneral(props)}
    </React.Fragment>
  );
}

export default AddressView;
