import { CircularProgress } from "@material-ui/core";
import useMultiGethStore from "../stores/useMultiGethStore";
import * as React from "react";
import BlockView from "../components/BlockView";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";

export default function Block(props: any) {
  const { match: { params: { hash } } } = props;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [block, setBlock] = React.useState();
  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_getBlockByHash(hash, true).then(setBlock);
  }, [hash, erpc]);
  if (!block) { return (<CircularProgress />); }
  return (<BlockView block={block} />);
}
