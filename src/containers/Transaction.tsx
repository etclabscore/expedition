import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import TxView from "../components/TxView";
import useMultiGeth from "../erpc";

export default function TransactionContainer(props: any) {
  const hash = props.match.params.hash;
  const [erpc] = useMultiGeth("1.9.0", "mainnet");
  const [transaction, setTransaction] = React.useState();
  const [receipt, setReceipt] = React.useState();

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_getTransactionByHash(hash).then(setTransaction);
  }, [hash, erpc]);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_getTransactionReceipt(hash).then(setReceipt);
  }, [hash, erpc]);

  if (!transaction || !receipt) {
    return (<CircularProgress />);
  }

  return (<TxView tx={transaction} receipt={receipt} />);
}
