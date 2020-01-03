import React from "react";
import { VictoryTooltip } from "victory";

class CustomPieChartLabel extends React.Component {
  public static defaultEvents = (VictoryTooltip as any).defaultEvents;
  public render() {
    return (
      <>
        {(this.props as any).defaultActive &&
          <VictoryTooltip
            {...(this.props as any)}
            active={(this.props as any).defaultActive &&
              (this.props as any).defaultActive.x === (this.props as any).datum.x}
            text={`${(this.props as any).datum.x}\n${(this.props as any).datum.y}`}
            cornerRadius={5}
            height={40}
            flyoutStyle={{
              stroke: "none",
            }}
          />
        }
        <VictoryTooltip
          {...(this.props as any)}
          // active={(this.props as any).defaultActive &&
          //   (this.props as any).defaultActive.x === (this.props as any).datum.x}
          width={100}
          text={`${(this.props as any).datum.x}\n${(this.props as any).datum.y}`}
          // x={(this.props as any).width / 2}
          // y={(this.props as any).y + 15}
          // orientation="bottom"
          // pointerLength={0}
          cornerRadius={5}
          height={40}
          flyoutStyle={{
            stroke: "none",
          }}
        />
      </>
    );
  }
}

export default CustomPieChartLabel;
