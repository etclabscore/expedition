import { Button, Grid, Typography } from "@material-ui/core";
import BigNumber from "bignumber.js";
import * as React from "react";
import usePromise from "react-use-promise";
import { VictoryBar, VictoryChart, VictoryLabel } from "victory";
import { hashesToGH, weiToGwei } from "../components/formatters";
import HashChart from "../components/HashChart";
import HashRate from "../components/HashRate";
import erpc from "../erpc";
import getBlocks from "../helpers";
import BlockList from "./BlockList";

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
  const [results, error, state] = usePromise(async () => {
    const bn = await erpc.eth_blockNumber();
    const blockNum: number = parseInt(bn, 16);
    const rangeOfBlocks: any[] = await getBlocks(
      Math.max(blockNum - config.blockHistoryLength + 1, 0),
      blockNum,
    );
    const gp: number = parseInt(await erpc.eth_gasPrice(), 16);
    return {
      blockNumber: blockNum,
      chainId: parseInt(await erpc.eth_chainId(), 16),
      block: await erpc.eth_getBlockByNumber(bn, true),
      blocks: rangeOfBlocks,
      gasPrice: gp,
      syncing: await erpc.eth_syncing(),
      peerCount: parseInt(await erpc.net_peerCount(), 16),
    };
  }, []);
  if (!results) {
    return null;
  }
  const { block, blocks, gasPrice, peerCount, blockNumber, chainId, syncing } = results;

  return (
    <div>
      <Grid container={true} spacing={24}>
        <Grid style={styles.topItems} item={true} xs={12}>
          <div>
            <Typography variant="headline">
              Block Height
            </Typography>
            <Typography>{blockNumber}</Typography>
          </div>
          <div>
            <Typography variant="headline">
              Chain ID
            </Typography>
            <Typography>{chainId}</Typography>
          </div>
          <div>
            <Typography variant="headline">
              Syncing
            </Typography>
            {typeof syncing === "object" && syncing.currentBlock &&
              <Typography variant="caption">
                {parseInt(syncing.currentBlock, 16)} / {parseInt(syncing.highestBlock || "0x0", 16)}
              </Typography>
            }
            {!syncing && <Typography>No</Typography>}
          </div>
          <div>
            <Typography variant="headline">
              Gas Price
            </Typography>
            <Typography>{weiToGwei(gasPrice)} Gwei</Typography>
          </div>
          <div>
            <Typography variant="headline">
              Network Hash Rate
            </Typography>
            <HashRate block={block} blockTime={config.blockTime}>
              {(hashRate: any) => <Typography>{hashRate} GH/s</Typography>}
            </HashRate>
          </div>
          <div>
            <Typography variant="headline">
              Peers
            </Typography>
            <Typography>{peerCount}</Typography>
          </div>
        </Grid>
        <Grid item={true} xs={12} sm={6} lg={3}>
          <HashChart
            height={config.chartHeight}
            title={`Hash Rate Last ${blocks.length} blocks`}
            data={blocks.map(blockMapHashRate)} />
        </Grid>
        <Grid item={true} xs={12} sm={6} lg={3}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth}>
            <VictoryLabel x={25} y={24} text={`Transaction count last ${blocks.length} blocks`} />
            <VictoryBar data={blocks.map(blockMapTransactionCount)} />
          </VictoryChart>
        </Grid>
        <Grid item={true} xs={12} sm={6} lg={3}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth}>
            <VictoryLabel x={25} y={24} text={`Gas Used Last ${blocks.length} blocks`} />
            <VictoryBar data={blocks.map(blockMapGasUsed)} />
          </VictoryChart>
        </Grid>
        <Grid item={true} xs={12} sm={6} lg={3}>
          <VictoryChart height={config.chartHeight} width={config.chartWidth}>
            <VictoryLabel x={25} y={24} text={`Uncles Last ${blocks.length} blocks`} />
            <VictoryBar data={blocks.map(blockMapUncles)} />
          </VictoryChart>
        </Grid>
        <Grid item={true}>
          <Typography variant="headline">
            Last 10 blocks
          </Typography>
          <Button href={"/blocks"}>View All</Button>
          <BlockList from={Math.max(blockNumber - 11, 0)} to={blockNumber} />
        </Grid>
      </Grid>
    </div>
  );
};
