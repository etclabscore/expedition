import * as React from "react";
import { hexToNumber } from "@etclabscore/eserialize";
import { useTranslation } from "react-i18next";
import { TableCell, TableRow } from "@material-ui/core";

const BigIntMinBy = (list: [], func: (item: any) => BigInt): any => {
  let min: any;
  for (const item of list) {
    if (min === undefined) {
      min = item;
      continue;
    }
    const r = func(item);
    if (r < func(min)) {
      min = item;
    }
  }
  return min;
};

const BigIntMaxBy = (list: [], func: (item: any) => BigInt): any => {
  let max: any;
  for (const item of list) {
    if (max === undefined) {
      max = item;
      continue;
    }
    const r = func(item);
    if (r > func(max)) {
      max = item;
    }
  }
  return max;
};

function BlockGasPrice(props: any) {
  const { t } = useTranslation();
  const { transactions } = props.block;

  if (transactions.length === 0) { return null; }

  return (
    <>
      <TableRow>
        <TableCell>{t("Min Gas Price")}</TableCell>
        <TableCell>
          {hexToNumber(BigIntMinBy(transactions, (tx: any) => BigInt(tx.gasPrice))?.gasPrice || "")}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>{t("Max Gas Price")}</TableCell>
        <TableCell>
          {hexToNumber(BigIntMaxBy(transactions, (tx: any) => BigInt(tx.gasPrice))?.gasPrice) || ""}
        </TableCell>
      </TableRow>
    </>
  );
}

export default BlockGasPrice;
