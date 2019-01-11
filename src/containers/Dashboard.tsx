import * as React from 'react';
import HashRate from '../components/HashRate';
import { EthRpc } from 'emerald-js-ui';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default (props: any) => {
  return (
    <div style={{display: 'flex'}}>
      <Card style={{width: '350px', marginRight: '10px'}}>
        <CardContent>
          <Typography variant="headline">
            Network Hash Rate
          </Typography>
          <EthRpc method="eth.getBlock" params={['latest', true]} refresh={3000}>
            {block => (
              <HashRate block={block} blockTime={15}>
                {hashRate => <Typography>{hashRate} GH/s</Typography>}
              </HashRate>
            )}
          </EthRpc>
        </CardContent>
      </Card>
      <Card style={{width: '350px'}}>
        <CardContent>
          <Typography variant="headline">
            Block Height
          </Typography>
          <EthRpc method="eth.getBlock" params={['latest', true]} refresh={3000}>
            {block => <Typography>{block.number}</Typography>}
          </EthRpc>
        </CardContent>
      </Card>
    </div>
  )
}
