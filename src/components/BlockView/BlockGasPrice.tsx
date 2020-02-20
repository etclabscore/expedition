import * as React from "react";
import { hexToNumber } from "@etclabscore/eserialize";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import { TableCell, TableRow } from "@material-ui/core";

function BlockGasPrice(props: any) {
  const { t } = useTranslation();
  const {transactions} = props.block;

  if (transactions.length === 0) {return <></>;}


  return (
    <>
      <TableRow>
        <TableCell>{t("Average Gas Price")}</TableCell>
        <TableCell>
          {_.meanBy(transactions, (t: any) => parseInt(t.gasPrice, 16))}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>{t("Min Gas Price")}</TableCell>
        <TableCell>
          {hexToNumber(_.minBy(transactions, (t: any) => parseInt(t.gasPrice, 16)).gasPrice)}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>{t("Max Gas Price")}</TableCell>
        <TableCell>
          {hexToNumber(_.maxBy(transactions, (t: any) => parseInt(t.gasPrice, 16)).gasPrice)}
        </TableCell>
      </TableRow>
    </>
  );
}

export default BlockGasPrice;
