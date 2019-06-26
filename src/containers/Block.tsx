import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import usePromise from "react-use-promise";
import BlockView from "../components/BlockView";

export default function Block(props: any) {
  const { erpc, match: { params: { hash } } } = props;
  const [block, error, state] = usePromise(() => {
    if (!erpc) { return; }
    return erpc.eth_getBlockByHash(hash, true);
  }, [hash]);
  if (error) { return (<div> Error: {error} </div>); }
  if (!block) { return (<CircularProgress />); }
  return (<BlockView block={block} />);
}
