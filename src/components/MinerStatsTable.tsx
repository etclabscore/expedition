import React, { useState } from "react";
import { Grid, Table, TableRow, TableCell, TableHead, TableBody, Typography, Button, LinearProgress } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { hexToString, hexToNumber } from "@etclabscore/eserialize";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  config: any;
}

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

const MinerStatsTable: React.FC<IProps> = ({ blocks }) => {
  const [showHover, setHover] = useState(true);
  const history = useHistory();
  const { t } = useTranslation();
  const topMiners = blockTopMiners(blocks);
  const groupedMiners = Object.assign({}, ...groupByMiner(blocks));
  console.log("topMiners", topMiners);
  console.log("groupedMiners", groupedMiners);
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
                                background: `linear-gradient(to right, ${greenColor[100]} 0% ${percentFull}%, transparent ${percentFull}% 100%)`,
                              }}
                              onClick={() => history.push(`/block/${block.hash}`)}
                            >
                              <Typography>
                                {hexToNumber(block.number)}
                              </Typography>
                            </Button>
                          )
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  );
};

export default MinerStatsTable;
