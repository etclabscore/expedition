import ERPC from "@etclabscore/ethereum-json-rpc";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import useMultiGeth from "../erpc";
import { useBlockNumber } from "../helpers";
import BlockList from "./BlockList";

export default function NodeView(props: any) {
  const [erpc] = useMultiGeth("1.9.1", "mainnet");
  const [blockNumber] = useBlockNumber(erpc);
  if (!blockNumber) {
    return (<CircularProgress />);
  }
  return (
    <BlockList from={Math.max(blockNumber - 15, 0)} to={blockNumber} erpc={erpc}/>
  );
}
