import React from "react";
import ReactDOM from "react-dom";
import NetworkDopdown from "./NetworkDropdown";

it("renders network dropdown", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<NetworkDopdown networks={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders network dropdown with networks passed", async () => {
  const div = document.createElement("div");
  const networks = [{ name: "kotti", url: "foo.bar" }];
  ReactDOM.render(<NetworkDopdown networks={networks} selectedNetwork={networks[0]} />, div);
  expect(div.innerHTML.includes("kotti")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders network dropdown with multiple networks passed and selected network", async () => {
  const div = document.createElement("div");
  const networks = [
    { name: "kotti", url: "foo.bar" },
    { name: "etc", url: "foo.baz" },
  ];
  ReactDOM.render(<NetworkDopdown networks={networks} selectedNetwork={networks[0]}/>, div);
  console.log(div.innerHTML);//tslint:disable-line
  expect(div.innerHTML.includes("kotti")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
