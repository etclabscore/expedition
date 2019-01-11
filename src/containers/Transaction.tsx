import * as React from 'react';
import TxView from '../components/TxView';
import { EthRpc } from 'emerald-js-ui';

export default function TransactionContainer(props: any) {
  const { hash } = props.match.params;

  return (
    <EthRpc method="eth.getTransaction" params={[hash]}>
      {transaction => (
        <EthRpc method="eth.getTransactionReceipt" params={[hash]}>
          {receipt => (<TxView tx={transaction} receipt={receipt} />)}
        </EthRpc>
      )}
    </EthRpc>
  );
}
