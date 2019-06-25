import * as React from "react";
import BlockList from "./BlockList";

import usePromise from "react-use-promise";
import erpc from "../erpc";

export default function NodeView(props: any) {
  const [blockNumber, error, state] = usePromise(() => erpc.eth_blockNumber(), []);
  return (
    <BlockList from={Math.max(parseInt(blockNumber, 16) - 15, 0)} to={parseInt(blockNumber, 16)} />
  );
}
