import ERPC from "@etclabscore/ethereum-json-rpc";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import usePromise from "react-use-promise";
import BlockList from "../components/BlockList";
import getBlocks from "../helpers";

interface IProps {
  from: number;
  to: number;
  erpc: ERPC;
}

export default function BlockListContainer(props: IProps) {
  const { from, to, erpc } = props;
  const [blocks, error, state] = usePromise(async () => {
    if (!erpc) { return; }
    return getBlocks(from, to, erpc);
  }, [from, to]);
  if (!blocks && state === "pending") {
    return <CircularProgress />;
  }
  return (
    <div>
      Blocks from {from} to {to}
      <BlockList blocks={blocks} />
    </div>
  );
}
