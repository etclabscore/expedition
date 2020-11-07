import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import Editor from "@monaco-editor/react";
import useDarkMode from "use-dark-mode";
import { Transaction } from "@etclabscore/ethereum-json-rpc";

interface IProps {
  tx: Transaction;
  receipt: any;
}

const TxRaw: React.FC<IProps> = (props) => {
  const history = useHistory();
  const darkMode = useDarkMode();
  const { tx, receipt } = props;

  return (
    <div style={{ margin: "0px -25px 0px -25px" }}>
      <Button
        onClick={() => {
          history.push(`/tx/${tx.hash}`);
        }}
        style={{ position: "absolute", right: "10px", top: "75px", zIndex: 1 }}
      >View Transaction</Button>
      <br />
      <Typography variant="h5" gutterBottom style={{ marginLeft: "10px" }}>Transaction</Typography>
      <br />
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          lineNumbers: "off",
          wordWrap: "on",
          wrappingIndent: "deepIndent",
          readOnly: true,
          showFoldingControls: "always",
        }}
        theme={darkMode.value ? "dark" : "light"}
        width="100vw"
        height="35vh"
        language="json"
        value={JSON.stringify(tx, null, 4)}
      />
      <br />
      <Typography variant="h6" gutterBottom style={{ marginLeft: "10px" }}>Receipt</Typography>
      <br />
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          lineNumbers: "off",
          wordWrap: "on",
          wrappingIndent: "deepIndent",
          readOnly: true,
          showFoldingControls: "always",
        }}
        theme={darkMode.value ? "dark" : "light"}
        width="100vw"
        height="35vh"
        language="json"
        value={JSON.stringify(receipt, null, 4)}
      />
    </div>
  );
};

export default TxRaw;
