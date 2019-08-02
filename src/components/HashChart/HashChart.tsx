import * as React from "react";
import { VictoryChart, VictoryLabel, VictoryLine, VictoryTheme } from "victory";

export default function HashChart(props: any) {
  const { title, data, width, height } = props;

  return (
    <VictoryChart name={title} height={height} width={width} theme={VictoryTheme.material}>
      <VictoryLabel x={25} y={24} text={title}/>
      <VictoryLine data={data} height={height} width={width}/>
    </VictoryChart>
  );
}
