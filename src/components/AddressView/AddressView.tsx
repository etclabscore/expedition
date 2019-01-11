import * as React from 'react';

export interface AddressViewProps {
  address: string;
  balance: string;
  txCount: number;
  code: string;
}

function renderGeneral(props: AddressViewProps) {
  const { address, balance, txCount, code } = props;
  return (
    <div>
      <div>Balance: {balance}</div>
      <div>Tx count: {txCount}</div>
      <div>{address}</div>
      <div>Code</div>
      <div>
        <textarea value={code} />
      </div>
    </div>
  );
}

function AddressView(props: AddressViewProps) {
  return (
    <React.Fragment>
        {renderGeneral(props)}
    </React.Fragment>
  );
}

export default AddressView;
