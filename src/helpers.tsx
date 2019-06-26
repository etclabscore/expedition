import ERPC from "@etclabscore/ethereum-json-rpc";
import * as React from "react";
import useInterval from "use-interval";

export const getBlocks = (from: number, to: number, erpc: ERPC): Promise<any> => {
    const promises: any[] = [];
    for (let i = from; i < to; i++) {
        promises.push(erpc.eth_getBlockByNumber(`0x${i.toString(16)}`, true));
    }
    return Promise.all(promises);
};

export const useBlockNumber = (erpc: ERPC) => {
    const [blockNumber, setBlockNumber] = React.useState();
    useInterval(() => {
        if (!erpc) {
            return;
        }
        erpc.eth_blockNumber().then((bn: string) => {
            setBlockNumber(parseInt(bn, 16));
        });
    }, 1000, true);
    return [blockNumber];
};

export default getBlocks;
