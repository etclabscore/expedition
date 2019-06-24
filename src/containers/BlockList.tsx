import * as React from "react";
import usePromise from "react-use-promise";
import BlockList from "../components/BlockList";
import erpc from "../erpc";

interface IProps {
  from: number;
  to: number;
}

const fetchBlocks  = (from: number, to: number): Promise<any> => {
  const promises: any[] = [];
  for (let i = from; i < to; i++) {
    promises.push(erpc.eth_getBlockByNumber(`0x${i.toString(16)}`, true));
  }
  return Promise.all(promises);
};

export default function BlockListContainer(props: IProps) {
  const { from, to } = props;
  const [blocks, error, state] = usePromise(() => fetchBlocks(from, to), [from, to]);
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
