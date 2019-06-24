import * as React from "react";
import usePromise from "react-use-promise";
import TxView from "../components/TxView";
import erpc from "../erpc";

export default function TransactionContainer(props: any) {
  const [{ transaction, receipt }, error, state] = usePromise(async () => ({
    transaction: await erpc.eth_getBlockTransactionCountByHash(props.match.params),
    receipt: await erpc.eth_getTransactionReceipt(props.match.params),
  }), []);

  return (<TxView tx={transaction} receipt={receipt} />);
}
