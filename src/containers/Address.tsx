import * as React from "react";
import usePromise from "react-use-promise";
import AddressView from "../components/AddressView";
import erpc from "../erpc";
const unit = require("ethjs-unit");

export default function Address(props: any) {
  const { address } = props.match.params;
  const [{ transactionCount, balance, code }, error, state] = usePromise(
    async () => {
      const blockNumber = await erpc.eth_blockNumber();
      return {
        transactionCount: await erpc.eth_getTransactionCount(address, blockNumber),
        balance: await erpc.eth_getBalance(address),
        code: await erpc.eth_getCode(address),
      };
    },
    [address],
  );
  return (
    <>
      {state}
      {error && <div> Error Displaying Balance for address: {address} </div>}
      <AddressView
        address={address}
        txCount={transactionCount ? parseInt(transactionCount, 10) : 0}
        balance={unit.fromWei(balance || 0, "ether")}
        code={code}
      />
    </>
  );
}
