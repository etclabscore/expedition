import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import BlockView from "../components/BlockView";
import useMultiGeth from "../erpc";

export default function Block(props: any) {
  const { match: { params: { hash } } } = props;
  const [erpc] = useMultiGeth("1.9.1", "mainnet");
  const [block, setBlock] = React.useState();
  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_getBlockByHash(hash, true).then(setBlock);
  }, [hash, erpc]);
  if (!block) { return (<CircularProgress />); }
  return (<BlockView block={block} />);
}
