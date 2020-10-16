import ERPC from "@etclabscore/ethereum-json-rpc";
import * as React from "react";
import useInterval from "use-interval";
import { hexToNumber } from "@etclabscore/eserialize";

export const getBlocks = (from: number, to: number, erpc: ERPC): Promise<any> => {
  const promises: any[] = [];

  for (let i = from; i <= to; i++) {
    promises.push(erpc.eth_getBlockByNumber(`0x${i.toString(16)}`, true));
  }
  return Promise.all(promises);
};

export const useBlockNumber = (erpc: ERPC | undefined): [number] => {
  const [blockNumber, setBlockNumber] = React.useState<number>(NaN);
  useInterval(() => {
    if (!erpc) {
      return;
    }
    erpc.eth_blockNumber().then((bn: string) => {
      setBlockNumber(hexToNumber(bn));
    });
  }, 7000, true);
  React.useEffect(() => {
    if (erpc) {
      erpc.eth_blockNumber().then((bn: string) => {
        setBlockNumber(hexToNumber(bn));
      });
    }
  }, [erpc]);
  return [blockNumber];
};

export default getBlocks;
