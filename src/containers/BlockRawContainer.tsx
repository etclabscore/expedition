import { CircularProgress } from "@material-ui/core";
import useMultiGethStore from "../stores/useMultiGethStore";
import * as React from "react";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";
import BlockRaw from "../components/BlockRaw";

export default function BlockRawContainer(props: any) {
  const { match: { params: { hash } } } = props;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [block, setBlock] = React.useState();
  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_getBlockByHash(hash, true).then(setBlock);
  }, [hash, erpc]);
  if (!block) { return (<CircularProgress />); }
  return (<BlockRaw block={block} />);
}
