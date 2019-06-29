import { AppBar, Card, CardContent, CardHeader, CssBaseline, Theme, Toolbar, Typography, IconButton } from "@material-ui/core"; //tslint:disable-line
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import "./App.css";
import Address from "./containers/Address";
import Block from "./containers/Block";
import Dashboard from "./containers/Dashboard";
import NodeView from "./containers/NodeView";
import Transaction from "./containers/Transaction";
import ConfigurationMenu from "./containers/ConfigurationMenu";
import { darkTheme, lightTheme } from "./themes/jadeTheme";

import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

const routes = [
  { path: "/", component: Dashboard, title: "Dashboard", exact: true },
  { path: "/block/:hash", component: Block, title: "Block" },
  { path: "/blocks", component: NodeView, title: "Latest Blocks" },
  { path: "/tx/:hash", component: Transaction, title: "Transaction Details" },
  { path: "/address/:address", component: Address, title: "Address Details" },
];

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
}));

function App(props: any) {
  const darkMode = useDarkMode();
  const theme = darkMode.value ? darkTheme : lightTheme;
  const classes = useStyles(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography className={classes.title}>Jade Block Explorer</Typography>
          <IconButton onClick={darkMode.toggle}>
            {darkMode.value ? <Brightness3Icon /> : <WbSunnyIcon />}
          </IconButton>
          <ConfigurationMenu />
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          {
            routes.map((routeProps, i) => (
              <Route key={routeProps.path} path={routeProps.path} component={(p: any) => (
                <Card elevation={0} style={{background: "none"}}>
                  <CardHeader title={routeProps.title} />
                  <CardContent>
                    {routeProps.component({ ...p })}
                  </CardContent>
                </Card>
              )} exact={routeProps.exact} />
            ))
          }
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
