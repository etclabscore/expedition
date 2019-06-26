import ERPC from "@etclabscore/ethereum-json-rpc";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import usePromise from "react-use-promise";
import TxView from "../components/TxView";

export default function TransactionContainer(props: any) {
  const { erpc }: { erpc: ERPC } = props;
  const [results, error, state] = usePromise(async () => {
    if (!erpc) { return; }
    return {
      transaction: await erpc.eth_getTransactionByHash(props.match.params.hash),
      receipt: await erpc.eth_getTransactionReceipt(props.match.params.hash),
    };
  }, [props.match.params.hash]);

  if (error && !results) {
    return (<div>Oops. Something went wrong. Please try again. <br /><br /><code>{error.message}</code></div>);
  }
  if (state && !results || !results) {
    return (<CircularProgress />);
  }

  const receipt = results.receipt;
  const transaction = results.transaction;

  return (<TxView tx={transaction} receipt={receipt} />);
}
