import * as React from "react";
import usePromise from "react-use-promise";
import BlockView from "../components/BlockView";
import erpc from "../erpc";

export default function Block(props: any) {
  const { match: { params: { hash } } } = props;
  const [block, error, state] = usePromise(() => erpc.eth_getBlockByHash(hash, true), [hash]);
  if (error) { return (<div> Error: {error} </div>); }
  if (!block) { return; }
  return (<BlockView block={block} />);
}
