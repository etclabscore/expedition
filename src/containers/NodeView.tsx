import * as React from 'react';
import BlockList from './BlockList';
import { EthRpc } from 'emerald-js-ui';

export default function NodeView(props: any) {
  return (
    <EthRpc method="eth.getBlockNumber">
      {blockNumber => (<BlockList from={Math.max(blockNumber - 15, 0)} to={blockNumber} />)}
    </EthRpc>
  );
}
