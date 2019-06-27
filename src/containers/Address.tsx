import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import AddressView from "../components/AddressView";
import useMultiGeth from "../erpc";
import { useBlockNumber } from "../helpers";

const unit = require("ethjs-unit");

export default function Address({ match }: { match: { params: { address: string } } }) {
  const { address } = match.params;
  const [erpc] = useMultiGeth("1.9.1", "mainnet");
  const [blockNumber] = useBlockNumber(erpc);
  const [transactionCount, setTransactionCount] = React.useState();
  const [balance, setBalance] = React.useState();
  const [code, setCode] = React.useState();

  React.useEffect(() => {
    if (blockNumber === undefined || !erpc) {
      return;
    }
    const hexBlockNumber = `0x${blockNumber.toString(16)}`;
    erpc.eth_getTransactionCount(address, hexBlockNumber).then(setTransactionCount);
    erpc.eth_getBalance(address, hexBlockNumber).then(setBalance);
    erpc.eth_getCode(address, hexBlockNumber).then(setCode);
  }, [blockNumber, address, erpc]);

  if (transactionCount === undefined || balance === undefined || code === undefined) {
    return <CircularProgress />;
  }
  return (
    <>
      <AddressView
        address={address}
        txCount={transactionCount ? parseInt(transactionCount, 10) : 0}
        balance={unit.fromWei(balance || 0, "ether")}
        code={code}
      />
    </>
  );
}
