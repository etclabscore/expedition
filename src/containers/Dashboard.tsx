import ERPC from "@etclabscore/ethereum-json-rpc";
import { Button, Grid, Typography, CircularProgress } from "@material-ui/core";
import BigNumber from "bignumber.js";
import * as React from "react";
import { VictoryBar, VictoryChart, VictoryLabel } from "victory";
import { hashesToGH, weiToGwei } from "../components/formatters";
import HashChart from "../components/HashChart";
import HashRate from "../components/HashRate";
import useMultiGeth from "../erpc";
import getBlocks, { useBlockNumber } from "../helpers";
import BlockList from "./BlockList";

const useState = React.useState;

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

const blockMapGasUsed = (block: any) => {
  return {
    x: parseInt(block.number, 16),
    y: new BigNumber(block.gasUsed).dividedBy(1000000),
  };
};

const blockMapUncles = (block: any) => {
  return {
    x: parseInt(block.number, 16),
    y: block.uncles.length,
  };
};

const blockMapHashRate = (block: any) => {
  return {
    x: parseInt(block.number, 16),
    y: hashesToGH(new BigNumber(block.difficulty, 16).dividedBy(config.blockTime)),
  };
};

const blockMapTransactionCount = (block: any) => {
  return {
    x: parseInt(block.number, 16),
    y: block.transactions.length,
  };
};

const getStyles = () => {
  return {
    topItems: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };
};

export default (props: any) => {
  const styles = getStyles();
  const [erpc] = useMultiGeth("1.9.1", "mainnet");
  const [blockNumber] = useBlockNumber(erpc);
  const [chainId, setChainId] = useState();
  const [block, setBlock] = useState();
  const [blocks, setBlocks] = useState();
  const [gasPrice, setGasPrice] = useState();
  const [syncing, setSyncing] = useState();
  const [peerCount, setPeerCount] = useState();

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_chainId().then(setChainId);
  }, [chainId, erpc]);

  React.useEffect(() => {
    if (!erpc || blockNumber === undefined) { return; }
    erpc.eth_getBlockByNumber(`0x${blockNumber.toString(16)}`, true).then(setBlock);
  }, [blockNumber, erpc]);

  React.useEffect(() => {
    if (!erpc || blockNumber === null) { return; }
    getBlocks(
      Math.max(blockNumber - config.blockHistoryLength + 1, 0),
      blockNumber,
      erpc,
    ).then((bl) => {
      setBlocks(bl);
    });
  }, [blockNumber, config.blockHistoryLength, erpc]);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_syncing().then(setSyncing);
  }, [erpc]);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.net_peerCount().then(setPeerCount);
  }, [erpc]);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_gasPrice().then(setGasPrice);
  }, [erpc]);

  if (!blocks) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Grid container={true} spacing={3}>
        <Grid style={styles.topItems} item={true} xs={12}>
          <div key="blockHeight">
            <Typography variant="h6">
              Block Height
            </Typography>
            <Typography>{blockNumber}</Typography>
          </div>
          <div key="chainId">
            <Typography variant="h6">
              Chain ID
            </Typography>
            <Typography>{parseInt(chainId, 16)}</Typography>
          </div>
          <div key="syncing">
            <Typography variant="h6">
              Syncing
            </Typography>
            {typeof syncing === "object" && syncing.currentBlock &&
              <Typography variant="h6">
                {parseInt(syncing.currentBlock, 16)} / {parseInt(syncing.highestBlock || "0x0", 16)}
              </Typography>
            }
            {!syncing && <Typography>No</Typography>}
          </div>
          <div key="gasPrice">
            <Typography variant="h6">
              Gas Price
            </Typography>
            <Typography>{weiToGwei(parseInt(gasPrice, 16))} Gwei</Typography>
          </div>
          <div key="hRate">
            <Typography variant="h6">
              Network Hash Rate
            </Typography>
            {block &&
              <HashRate block={block} blockTime={config.blockTime}>
                {(hashRate: any) => <Typography>{hashRate} GH/s</Typography>}
              </HashRate>
            }
          </div>
          <div>
            <Typography variant="h6">
              Peers
            </Typography>
            <Typography>{parseInt(peerCount, 16)}</Typography>
          </div>
        </Grid>
        <Grid key="hashChart" item={true} xs={12} sm={6} lg={3}>
          <HashChart
            height={config.chartHeight}
            title={`Hash Rate Last ${blocks.length} blocks`}
            data={blocks.map(blockMapHashRate)} />
        </Grid>
        <Grid key="txChart" item={true} xs={12} sm={6} lg={3}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth}>
            <VictoryLabel x={25} y={24} text={`Transaction count last ${blocks.length} blocks`} />
            <VictoryBar data={blocks.map(blockMapTransactionCount)} />
          </VictoryChart>
        </Grid>
        <Grid key="gasUsed" item={true} xs={12} sm={6} lg={3}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth}>
            <VictoryLabel x={25} y={24} text={`Gas Used Last ${blocks.length} blocks`} />
            <VictoryBar data={blocks.map(blockMapGasUsed)} />
          </VictoryChart>
        </Grid>
        <Grid key="uncles" item={true} xs={12} sm={6} lg={3}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth}>
            <VictoryLabel x={25} y={24} text={`Uncles Last ${blocks.length} blocks`} />
            <VictoryBar data={blocks.map(blockMapUncles)} />
          </VictoryChart>
        </Grid>
        {blockNumber &&
          <Grid item={true} key={"blocks"}>
            <Button href={"/blocks"}>View All Blocks</Button>
            <BlockList from={Math.max(blockNumber - 11, 0)} to={blockNumber} erpc={erpc} />
          </Grid>
        }
      </Grid>
    </div>
  );
};
