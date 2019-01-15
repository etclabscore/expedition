export function hashesToGH(hashes: number) {
  return parseInt((hashes / 1000000000).toFixed(2), 10);
}


export function weiToGwei(wei: any) {
  if (wei === 0) {
    return wei;
  }

  return wei / 1000000000;
}
