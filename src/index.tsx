import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { ReusableProvider } from "reusable";
import "./i18n";

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <ReusableProvider>
      <App />
    </ReusableProvider>
  </I18nextProvider>,
  document.getElementById("root") as HTMLElement,
);
