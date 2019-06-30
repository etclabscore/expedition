import * as React from "react";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";

export default React.createContext<EthereumJSONRPC | undefined>(undefined);
