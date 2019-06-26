import BigNumber from "bignumber.js";

export function hashesToGH(hashes: BigNumber) {
  return parseInt((hashes.dividedBy(1000000000).toNumber()).toFixed(2), 10);
}

export function weiToGwei(wei: any) {
  if (wei === 0) {
    return wei;
  }

  return wei / 1000000000;
}
