import ERPC from "@etclabscore/ethereum-json-rpc";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import BlockList from "../components/BlockList";
import getBlocks from "../helpers";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";
import ERPCContext from "../contexts/ERPCContext";

interface IProps {
  from: number;
  to: number;
}

export default function BlockListContainer(props: IProps) {
  const { from, to } = props;
  const erpc = React.useContext<EthereumJSONRPC | undefined>(ERPCContext);
  const [blocks, setBlocks] = React.useState();
  React.useEffect(() => {
    if (!erpc) { return; }
    getBlocks(from, to, erpc).then(setBlocks);
  }, [from, to, erpc]);

  if (!blocks) {
    return <CircularProgress />;
  }
  return (
    <div>
      Blocks from {from} to {to}
      <BlockList blocks={blocks} />
    </div>
  );
}
