import ERPC from "@etclabscore/ethereum-json-rpc";
import * as React from "react";

export default React.createContext<ERPC | null>(null);
