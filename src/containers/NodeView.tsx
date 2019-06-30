import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { useBlockNumber } from "../helpers";
import BlockList from "./BlockList";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";
import ERPCContext from "../contexts/ERPCContext";

export default function NodeView(props: any) {
  const erpc = React.useContext<EthereumJSONRPC | undefined>(ERPCContext);
  const [blockNumber] = useBlockNumber(erpc);
  if (!blockNumber) {
    return (<CircularProgress />);
  }
  return (
    <BlockList from={Math.max(blockNumber - 15, 0)} to={blockNumber}/>
  );
}
