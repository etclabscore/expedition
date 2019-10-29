import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { useBlockNumber } from "../helpers";
import BlockList from "./BlockList";
import useMultiGethStore from "../stores/useMultiGethStore";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";
import { useQueryParam, NumberParam } from "use-query-params";

export default function NodeView(props: any) {
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [blockNumber] = useBlockNumber(erpc);
  const [queryNumber] = useQueryParam("number", NumberParam);
  const blockNum = queryNumber || blockNumber;
  if (!blockNumber) {
    return (<CircularProgress />);
  }
  return (
    <BlockList
      from={Math.max(blockNum - 14, 0)}
      to={(queryNumber || blockNumber)}
      disablePrev={blockNum >= blockNumber}
      onPrev={() => {
        const newQuery = blockNum + 15;
        props.history.push(`/blocks?number=${newQuery}`);
      }}
      onNext={() => {
        const newQuery = Math.max(blockNum - 15, 0);
        props.history.push(`/blocks?number=${newQuery}`);
      }}
    />
  );
}
