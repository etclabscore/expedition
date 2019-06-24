import * as React from "react";
import usePromise from "react-use-promise";
import BlockList from "../components/BlockList";
import getBlocks from "../helpers";

interface IProps {
  from: number;
  to: number;
}


export default function BlockListContainer(props: IProps) {
  const { from, to } = props;
  const [blocks, error, state] = usePromise(() => getBlocks(from, to), [from, to]);
  if (!blocks) {
    return null;
  }
  return (
    <div>
      Blocks from {from} to {to}
      <BlockList blocks={blocks} />
    </div>
  );
}
