import * as React from "react";
import TxView from "../components/TxView";

import usePromise from "react-use-promise";
import erpc from "../erpc";

export default function TransactionContainer(props: any) {
  const { hash } = props.match.params;
  const [{ transaction, receipt }, error, state] = usePromise(async () => {
    return {
      transaction: await erpc.eth_getBlockTransactionCountByHash(hash),
      receipt: await erpc.eth_getTransactionReceipt(hash),
    };
  }, []);

  return (
    <TxView tx={transaction} receipt={receipt} />
  );
}
