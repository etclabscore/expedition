import * as React from "react";
import BlockView from "../components/BlockView";

import erpc from "../erpc";

import usePromise from "react-use-promise";

export default function Block(props: any) {
  const { match: { params: { hash } } } = props;
  const [block, error, state] = usePromise(() => erpc.eth_getBlockByHash(hash, true), []);
  if (error) {
    return (<div> Error: {error} </div>);
  }
  if (!block) {
    return;
  }
  return (
    <>
      <BlockView block={block} />
    </>
  );
}
