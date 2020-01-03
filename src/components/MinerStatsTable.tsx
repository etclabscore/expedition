import React from "react";
import { Table, TableRow, TableCell, TableHead, TableBody, Typography, Button } from "@material-ui/core";
import { hexToString, hexToNumber } from "@etclabscore/eserialize";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import greenColor from "@material-ui/core/colors/green";

const blockTopMiners = (blocks: any[]) => {
  const result = _(blocks).chain()
    .countBy((b: any) => b.miner)
    .map((key: string, val: number) => ({
      address: val,
      blocksMined: key,
    }))
    .sortBy((item: any) => item.blocksMined)
    .reverse()
    .value();
  return result;
};

const groupByMiner = (blocks: any[]) => {
  const result = _.chain(blocks)
    .groupBy((b: any) => b.miner)
    .map((value, key) => {
      return {
        [key]: _.groupBy(value, (item) => {
          return hexToString(item.extraData);
        }),
      };
    })
    .value();
  return result;
};

interface IProps {
  blocks: any[];
}

const MinerStatsTable: React.FC<IProps> = ({ blocks }) => {
  const history = useHistory();
  const topMiners = blockTopMiners(blocks);
  const groupedMiners = Object.assign({}, ...groupByMiner(blocks));
  return (
    <Table aria-label="simple table">
      <TableHead >
        <TableRow>
          <TableCell>Blocks Mined</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>ExtraData</TableCell>
          <TableCell>Blocks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {topMiners.map((minerData: any) => (
          <TableRow key={minerData.miner}>
            <TableCell component="th" scope="row">
              {minerData.blocksMined}
            </TableCell>
            <TableCell>{minerData.address}</TableCell>
            <TableCell colSpan={2}>
              <Table>
                <TableBody>
                  {_.map(groupedMiners[minerData.address], (bs: any[], key: string) => (
                    <TableRow>
                      <TableCell>{key}</TableCell>
                      <TableCell colSpan={1}>
                        {bs.map((block) => {
                          const percentFull = (hexToNumber(block.gasUsed) / hexToNumber(block.gasLimit)) * 100;
                          return (
                            <Button
                              variant="outlined"
                              style={{
                                margin: "3px",
                                background: `linear-gradient(to right, ${greenColor[600]} 0% ${percentFull}%, transparent ${percentFull}% 100%)`,
                              }}
                              onClick={() => history.push(`/block/${block.hash}`)}
                            >
                              <Typography>
                                {hexToNumber(block.number)}
                              </Typography>
                            </Button>
                          );
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  );
};

export default MinerStatsTable;
