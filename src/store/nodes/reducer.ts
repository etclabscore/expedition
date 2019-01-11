import { EthRpc, JsonRpc, HttpTransport } from 'emerald-js';
import { Node } from './model';
import { NodesAction, UpdateNodeStatus, UpdateNodeStatusError } from './actions';
import { UPDATE_NODE_STATUS, UPDATE_NODE_STATUS_ERROR } from './constants';

export interface State {
  nodes: Node[];
}

const initialState: State = {
  nodes: [
    {
      id: '1',
      url: 'https://web3.gastracker.io',
      rpc: new EthRpc(new JsonRpc(new HttpTransport('https://web3.gastracker.io'))),
      chainId: 61,
    },
    {
      id: '2',
      url: 'https://web3.gastracker.io/morden',
      rpc: new EthRpc(new JsonRpc(new HttpTransport('https://web3.gastracker.io/morden'))),
      chainId: 62,
    },
    {
      id: '3',
      url: 'http://localhost:8545',
      rpc: new EthRpc(new JsonRpc(new HttpTransport('http://localhost:8545'))),
      chainId: 1,
    }
  ]
};

function onUpdateNodeStatus(state: State, action: UpdateNodeStatus): State {
  if (action.type === UPDATE_NODE_STATUS) {
    const nodes = state.nodes.map(node =>
      node.id === action.nodeId ?
        {
          ...node,
          error: null,
          blockNumber: action.blockNumber,
          pendingBlock: action.pendingBlock,
          clientVersion: action.clientVersion,
          networkId: action.networkId,
          gasPrice: action.gasPrice,
        } : node
    );
    return { ...state, nodes };
  }

  return state;
}

function onUpdateNodeStatusError(state: State, action: UpdateNodeStatusError): State {
  const nodes = state.nodes.map(node =>
    node.id === action.nodeId ?
      {
        ...node,
        error: action.error,
      } : node
  );
  return { ...state, nodes };
}

export default function reduce(state: State, action: NodesAction) {
  state = state || initialState;
  switch (action.type) {
    case UPDATE_NODE_STATUS:
      return onUpdateNodeStatus(state, action);
    case UPDATE_NODE_STATUS_ERROR:
      return onUpdateNodeStatusError(state, action);
    default:
      return state;
  }
} 