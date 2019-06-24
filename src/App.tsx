import * as React from "react";

import { AppBar, Card,  CardContent, CardHeader } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import Address from "./containers/Address";
import Block from "./containers/Block";
// import Dashboard from "./containers/Dashboard";
import NodeView from "./containers/NodeView";
import Transaction from "./containers/Transaction";
import store, { history } from "./store";

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
      <Provider store={store}>
        <div>
          <div>
            <AppBar title="Jade Explorer" />
          </div>
          <div style={{ margin: "20px" }}>
            <ConnectedRouter history={history}>
              <Switch>
                {
                  routes.map((routeProps, i) => {
                    const wrapped = (props) => (
                      <Card>
                        <CardHeader title={routeProps.title}/>
                        <CardContent>
                          {routeProps.component({ ...props, history })}
                        </CardContent>
                      </Card>
                    );
                    return (<Route key={i} path={routeProps.path} component={wrapped} exact={routeProps.exact} />);
                  })
                }
              </Switch>
            </ConnectedRouter>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;


