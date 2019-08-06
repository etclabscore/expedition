import { CircularProgress } from "@material-ui/core";
import useMultiGethStore from "../stores/useMultiGethStore";
import * as React from "react";
import BlockList from "../components/BlockList";
import getBlocks from "../helpers";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";

interface IProps {
  from: number;
  to: number;
}

export default function BlockListContainer(props: IProps) {
  const { from, to } = props;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [blocks, setBlocks] = React.useState();
  React.useEffect(() => {
    if (!erpc) { return; }
    getBlocks(from, to, erpc).then(setBlocks);
  }, [from, to, erpc]);

  if (!blocks) {
    return <CircularProgress />;
  }
  return (
    <div>
      Blocks from {from} to {to}
      <BlockList blocks={blocks} />
    </div>
  );
}
