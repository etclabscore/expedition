import * as React from "react";
import BlockList from "../components/BlockList";


interface IProps {
  from: number;
  to: number;
}

export default function BlockListContainer(props: IProps) {
  const { from, to } = props;
  const blocks = [];
  return (
    <div>
      Blocks from {from} to {to}
      <BlockList blocks={blocks} />
    </div>
  );
}
