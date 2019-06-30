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
import useMultiGeth from "./hooks/useMultiGeth";
import useServiceRunner from "./hooks/useServiceRunner";
import ServiceRunnerContext from "./contexts/ServiceRunnerContext";
import ERPCContext from "./contexts/ERPCContext";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
}));

function App(props: any) {
  const darkMode = useDarkMode();
  const [serviceRunner, setServiceRunnerUrl] = useServiceRunner();
  const [erpc, setERPCUrl] = useMultiGeth(serviceRunner, "1.9.0", "mainnet");
  const theme = darkMode.value ? darkTheme : lightTheme;
  const classes = useStyles(theme);
  const handleConfigurationChange = (type: string, url: string) => {
    if (type === "service-runner") {
      setServiceRunnerUrl(url);
    } else if (type === "ethereum-rpc") {
      setERPCUrl(url);
    }
  };
  return (
    <ERPCContext.Provider value={erpc}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <Typography className={classes.title}>Jade Block Explorer</Typography>
            <IconButton onClick={darkMode.toggle}>
              {darkMode.value ? <Brightness3Icon /> : <WbSunnyIcon />}
            </IconButton>
            <ConfigurationMenu onChange={handleConfigurationChange}/>
          </Toolbar>
        </AppBar>
        <Router>
          <Switch>
            <Route path={"/"} component={Dashboard} exact={true} />
            <Route path={"/block/:hash"} component={Block} />
            <Route path={"/blocks"} component={NodeView} />
            <Route path={"/tx/:hash"} component={Transaction} />
            <Route path={"/address/:address"} component={Address} />
          </Switch>
        </Router>
      </ThemeProvider>
    </ERPCContext.Provider>
  );
}

export default App;
