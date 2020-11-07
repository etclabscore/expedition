import * as React from "react";
import { hexToNumber } from "@etclabscore/eserialize";
import { useTranslation } from "react-i18next";
import {meanBy, minBy, maxBy} from "lodash";

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
          { meanBy(transactions, (t: any) => BigInt(t.gasPrice)) }
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>{t("Min Gas Price")}</TableCell>
        <TableCell>
          { hexToNumber(minBy(transactions, (t: any) => BigInt(t.gasPrice)).gasPrice) }
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>{t("Max Gas Price")}</TableCell>
        <TableCell>
          { hexToNumber(maxBy(transactions, (t: any) => BigInt(t.gasPrice)).gasPrice) }
        </TableCell>
      </TableRow>
    </>
  );
}

export default BlockGasPrice;
