import ERPC from "@etclabscore/ethereum-json-rpc";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import BlockList from "../components/BlockList";
import useMultiGeth from "../erpc";
import getBlocks from "../helpers";

interface IProps {
  from: number;
  to: number;
  erpc: ERPC;
}

export default function BlockListContainer(props: IProps) {
  const { from, to } = props;
  const [erpc] = useMultiGeth("1.9.0", "mainnet");
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
