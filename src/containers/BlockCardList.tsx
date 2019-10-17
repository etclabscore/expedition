import { CircularProgress, Grid } from "@material-ui/core";
import useMultiGethStore from "../stores/useMultiGethStore";
import * as React from "react";
import getBlocks from "../helpers";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";
import BlockCard from "../components/BlockCard";
import { hexToNumber } from "@etclabscore/eserialize";

interface IProps {
  from: number;
  to: number;
  style?: any;
}

export default function BlockCardListContainer(props: IProps) {
  const { from, to, style } = props;
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [blocks, setBlocks] = React.useState();
  React.useEffect(() => {
    let isSubscribed = true;
    if (!erpc) { return; }
    if (isSubscribed) {
      getBlocks(from, to, erpc).then((bs) => {
        setBlocks(bs);
      });
    }
    return () => {
      isSubscribed = false;
      return;
    };
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  if (!blocks) {
    return <CircularProgress />;
  }
  return (
    <Grid container spacing={2} style={style}>
      {
        blocks.sort((a: any, b: any) => {
          return hexToNumber(b.number) - hexToNumber(a.number);
        }).map((block: any) => {
          return (
            <Grid item xs={12} sm={4} key={block.hash}>
              <BlockCard block={block} />
            </Grid>
          );
        })
      }
    </Grid>
  );
}
