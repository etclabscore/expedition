import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import TxView from "../components/TxView";
import useMultiGethStore from "../stores/useMultiGethStore";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";

export default function TransactionContainer(props: any) {
  const hash = props.match.params.hash;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
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
