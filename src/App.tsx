import { AppBar, Card, CardContent, CardHeader, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Address from "./containers/Address";
import Block from "./containers/Block";
import Dashboard from "./containers/Dashboard";
import NodeView from "./containers/NodeView";
import Transaction from "./containers/Transaction";

import "./App.css";
import useMultiGeth from "./erpc";

const routes = [
  { path: "/", component: Dashboard, title: "Dashboard", exact: true },
  { path: "/block/:hash", component: Block, title: "Block" },
  { path: "/blocks", component: NodeView, title: "Latest Blocks" },
  { path: "/tx/:hash", component: Transaction, title: "Transaction Details" },
  { path: "/address/:address", component: Address, title: "Address Details" },
];

function App(props: any) {
  const [erpc] = useMultiGeth("1.9.1", "mainnet");
  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography>Jade Block Explorer</Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          {
            routes.map((routeProps, i) => {
              const wrapped = (p: any) => (
                <Card>
                  <CardHeader title={routeProps.title} />
                  <CardContent>
                    {routeProps.component({ ...p, erpc })}
                  </CardContent>
                </Card>
              );
              return (<Route key={i} path={routeProps.path} component={wrapped} exact={routeProps.exact} />);
            })
          }
        </Switch>
      </Router>
    </>
  );
}

export default App;
