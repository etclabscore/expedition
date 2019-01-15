import { hashesToGH } from '../formatters';

export default function HashRate(props: any) {
  const { block, blockTime } = props;
  return props.children(hashesToGH(block.difficulty.dividedBy(blockTime)))
}
