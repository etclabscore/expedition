import * as React from "react";
import usePromise from "react-use-promise";
import AddressView from "../components/AddressView";
import erpc from "../erpc";
import { useBlockNumber } from "../helpers";
const unit = require("ethjs-unit");

export default function Address(props: any) {
  const { address } = props.match.params;
  const [blockNumber] = useBlockNumber();
  const [result, error, state] = usePromise(
    async () => {
      if (blockNumber === undefined) {
        return;
      }
      const hexBlockNumber = `0x${blockNumber.toString(16)}`;
      return {
        transactionCount: await erpc.eth_getTransactionCount(address, hexBlockNumber),
        balance: await erpc.eth_getBalance(address, hexBlockNumber),
        code: await erpc.eth_getCode(address, hexBlockNumber),
      };
    },
    [address, blockNumber],
  );
  if (error) {
    return (<div>Oops. there was an error. try again later: {error.message}</div>)
  }
  if (!result) {
    return null;
  }
  const { transactionCount, balance, code } = result;
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
