
import { CircularProgress } from "@material-ui/core";
import useMultiGethStore from "../stores/useMultiGethStore";
import _ from "lodash";
import * as React from "react";
import getBlocks, { useBlockNumber } from "../helpers";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";
import { useTranslation } from "react-i18next";
import MinerStats from "../components/MinerStats";
import MinerStatsTable from "../components/MinerStatsTable";

const useState = React.useState;

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

export default (props: any) => {
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();
  const [blockNumber] = useBlockNumber(erpc);
  const [blocks, setBlocks] = useState();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!erpc || blockNumber === null) { return; }
    getBlocks(
      Math.max(blockNumber - config.blockHistoryLength + 1, 0),
      blockNumber,
      erpc,
    ).then((bl) => {
      setBlocks(bl);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  if (!blocks) {
    return <CircularProgress />;
  }

  return (
    <>
      <MinerStats blocks={blocks} config={config} />
      <MinerStatsTable blocks={blocks} config={config} />
    </>
  );
};
