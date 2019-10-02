import * as React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export interface IAddressViewProps {
  address: string;
  balance: string;
  txCount: number;
  code: string;
}

function AddressView(props: IAddressViewProps) {
  const { address, balance, txCount, code } = props;
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{t("Address")}: {address}</Typography>
        <Typography variant="h6">{t("Balance")}: {balance}</Typography>
        <Typography variant="h6">{t("Transactions")}: {txCount}</Typography>
        <br />
        <div>
          <div>{t("Code")}</div>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddressView;
