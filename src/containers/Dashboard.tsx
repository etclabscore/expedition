import * as React from 'react';
import HashRate from '../components/HashRate';
import HashChart from '../components/HashChart';
import { EthRpc } from 'emerald-js-ui';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { hashesToGH } from '../components/formatters';
import { VictoryChart, VictoryBar, VictoryLabel } from 'victory';
import { weiToGwei } from '../components/formatters';
import Grid from '@material-ui/core/Grid';


const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 1200,
  chartHeight: 200,
  chartWidth: 400
}

const blockMapGasUsed = (block) => {
  return {
    x: block.number,
    y: block.gasUsed / 1000000
  }
}

const blockMapUncles = (block) => {
  return {
    x: block.number,
    y: block.uncles.length
  }
}

const blockMapHashRate = (block) => {
  return {
    x: block.number,
    y: hashesToGH(block.difficulty.dividedBy(config.blockTime))
  }
}

const blockMapTransactionCount = (block) => {
  return {
    x: block.number,
    y: block.transactions.length
  }
}

export default (props: any) => {
  return (
    <EthRpc method="eth.getBlock" params={['latest', true]}>
      {block => (
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div style={{display: 'flex'}}>
                <Card>
                  <CardContent>
                    <div>
                      <Typography variant="headline">
                        Block Height
                      </Typography>
                      <Typography>{block.number}</Typography>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography variant="headline">
                      Gas Price
                    </Typography>
                    <EthRpc method="eth.gasPrice">
                      {gasPrice => <Typography>{weiToGwei(gasPrice.toNumber())} Gwei</Typography>}
                    </EthRpc>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <div>
                      <Typography variant="headline">
                        Network Hash Rate
                      </Typography>
                      <HashRate block={block} blockTime={config.blockTime}>
                        {hashRate => <Typography>{hashRate} GH/s</Typography>}
                      </HashRate>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <div>
                      <Typography variant="headline">
                        Peers
                      </Typography>
                      <EthRpc method="net.peerCount">
                        {peerCount => <Typography>{peerCount}</Typography>}
                      </EthRpc>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Grid>

            <EthRpc method="ext.getBlocks" params={[Math.max(block.number - config.blockHistoryLength + 1, 0), block.number]}>
              {blocks => {
                 return [
                   <Grid item xs={6}>
                     <HashChart height={config.chartHeight} title={`Hash Rate Last ${config.blockHistoryLength} blocks`} data={blocks.map(blockMapHashRate)} />,
                   </Grid>,
                   <Grid item xs={6}>
                    <VictoryChart height={config.chartHeight} width={config.chartWidth}>
                      <VictoryLabel x={25} y={24} text={`Transaction count last ${config.blockHistoryLength} blocks`}/>
                      <VictoryBar data={blocks.map(blockMapTransactionCount)} />
                    </VictoryChart>
                   </Grid>,
                   <Grid item xs={6}>
                     <VictoryChart height={config.chartHeight} width={config.chartWidth}>
                       <VictoryLabel x={25} y={24} text={`Gas Used Last ${config.blockHistoryLength} blocks`}/>
                       <VictoryBar data={blocks.map(blockMapGasUsed)} />
                     </VictoryChart>
                   </Grid>,
                   <Grid item xs={6}>
                     <VictoryChart height={config.chartHeight} width={config.chartWidth}>
                       <VictoryLabel x={25} y={24} text={`Uncles Last ${config.blockHistoryLength} blocks`}/>
                       <VictoryBar data={blocks.map(blockMapUncles)} />
                     </VictoryChart>
                   </Grid>,
                 ]
              }}
            </EthRpc>
          </Grid>
        </div>
      )}
    </EthRpc>
  )
}
