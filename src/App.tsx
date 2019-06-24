import * as React from "react";

import { AppBar, Card, CardContent, CardHeader, Toolbar, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Address from "./containers/Address";
import Block from "./containers/Block";
// import Dashboard from "./containers/Dashboard";
import NodeView from "./containers/NodeView";
import Transaction from "./containers/Transaction";

import "./App.css";

const routes = [
  { path: "/", component: NodeView, title: "Dashboard", exact: true },
  { path: "/block/:hash", component: Block, title: "Block" },
  { path: "/blocks", component: NodeView, title: "Latest Blocks" },
  { path: "/tx/:hash", component: Transaction, title: "Transaction Details" },
  { path: "/address/:address", component: Address, title: "Address Details" },
];

class App extends React.Component {
  public render() {
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
                const wrapped = (props: any) => (
                  <Card>
                    <CardHeader title={routeProps.title} />
                    <CardContent>
                      {routeProps.component({ ...props })}
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
}

export default App;
