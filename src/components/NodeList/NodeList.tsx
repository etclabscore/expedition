import * as React from "react";
import { Link } from "react-router-dom";

interface IProps {
  nodes: any[];
}

function NodeList(props: IProps) {

  const pendingTxs = (n: any) => {
    if (n.pendingBlock) {
      return <span>{n.pendingBlock.transactions.length}</span>;
    }
    return null;
  };

  return (
    <div>
      {props.nodes.map((n: any) => (
        <div key={n.id}>
          <div>
            {n.url} : {n.blockNumber}, pending Txs: {pendingTxs(n) || "..."}
          </div>
          <div>{n.clientVersion}</div>
          <div>network id: {n.networkId} gasPrice: {n.gasPrice ? n.gasPrice.toString() + " Wei" : ""}</div>
          <div>chain id: {n.chainId}</div>
          <div>{n.error && <span color="red">{n.error}</span>}</div>
          <div>
            <Link to={"/blocks"} >View</Link>
          </div>
        </div>

      ))}
    </div>
  );
}

export default NodeList;
