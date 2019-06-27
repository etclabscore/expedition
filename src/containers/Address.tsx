import ERPC from "@etclabscore/ethereum-json-rpc";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import usePromise from "react-use-promise";
import AddressView from "../components/AddressView";
import { useBlockNumber } from "../helpers";

const unit = require("ethjs-unit");

export default function Address({erpc, match}: {erpc: ERPC, match: {params: {address: string}}}) {
  const { address } = match.params;
  const [blockNumber] = useBlockNumber(erpc);
  const [result, error, state] = usePromise(
    async () => {
      if (blockNumber === undefined || !erpc) {
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
    return (<div>Oops. there was an error. try again later: {error.message}</div>);
  }
  if (!result) {
    return <CircularProgress />;
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
