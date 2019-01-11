import BigNumber from 'bignumber.js';
import { EthRpc } from 'emerald-js';

export type Node = {
    url: string;            // remote RPC endpoint
    clientVersion?: string; // fullnode version
    networkId?: string;     // network id
    id?: string;
    rpc?: EthRpc;
    blockNumber?: number;  // last block number
    pendingBlock?: Block;  // current pending block
    error?: string | null; // any error occured during communication
    gasPrice?: BigNumber;
    chainId: number;
};

export type Block = {
  hash: string | null;
  transactions: string[];
};