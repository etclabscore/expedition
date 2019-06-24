import BigNumber from "bignumber.js";
import { hashesToGH } from "../formatters";

export default function HashRate(props: any) {
  const { block, blockTime } = props;
  return props.children(hashesToGH(new BigNumber(block.difficulty, 16).dividedBy(blockTime)));
}
