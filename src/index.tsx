import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { ReusableProvider } from "reusable";

ReactDOM.render(
  <ReusableProvider>
    <App />
  </ReusableProvider>,
  document.getElementById("root") as HTMLElement,
);
