import * as React from 'react';
import BlockView from '../components/BlockView';
import { EthRpc } from 'emerald-js-ui';

export default function Block(props: any) {
  const { match: { params: { hash } } } = props;
  return (
    <EthRpc method="eth.getBlock" params={[hash, true]}>
      {block => (<BlockView block={block} />)}
    </EthRpc>
  );
}
