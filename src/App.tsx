import { AppBar, CssBaseline, Theme, Toolbar, Typography, IconButton, Grid } from "@material-ui/core"; //tslint:disable-line
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
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

import useInterval from "use-interval";
import useServiceRunnerStore from "./stores/useServiceRunnerStore";
import useMultiGethStore from "./stores/useMultiGethStore";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
}));

function App(props: any) {
  const darkMode = useDarkMode();
  const theme = darkMode.value ? darkTheme : lightTheme;

  const [, , setServiceRunnerUrl] = useServiceRunnerStore();
  const [erpc]: [EthereumJSONRPC] = useMultiGethStore();

  const classes = useStyles(theme);
  const handleConfigurationChange = (type: string, url: string) => {
    if (type === "service-runner") {
      setServiceRunnerUrl(url);
    }
  };

  React.useEffect(() => {
    if (erpc) {
      erpc.startBatch();
    }
  }, [erpc]);

  useInterval(() => {
    if (erpc) {
      erpc.stopBatch();
      erpc.startBatch();
    }
  }, 100, true);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar color="default" elevation={0}>
          <Toolbar>
            <Grid justify="space-between" container>
              <Grid item style={{marginTop: "8px"}}>
                <Link
                  component={({ className, children }: { children: any, className: string }) => (
                    <RouterLink className={className} to={"/"}>
                      {children}
                    </RouterLink>
                  )}>
                  <Grid container>
                    {darkMode.value ?
                      <img
                        alt="jade-explorer"
                        height="30"
                        style={{ marginRight: "5px" }}
                        src="https://github.com/etclabscore/jade-media-assets/blob/master/jade-logo-dark/jade-logo-dark%20(PNG)/32x32.png?raw=true" //tslint:disable-line
                      />
                      :
                      <img
                        alt="jade-explorer"
                        height="30"
                        style={{ marginRight: "5px" }}
                        src="https://github.com/etclabscore/jade-media-assets/blob/master/jade-logo-light/jade-logo-light%20(PNG)/32x32.png?raw=true" //tslint:disable-line
                      />
                    }
                    <Typography className={classes.title} color="textSecondary" variant="h6">Jade Explorer</Typography>
                  </Grid>
                </Link>
              </Grid>
              <Grid item>
                <IconButton onClick={darkMode.toggle}>
                  {darkMode.value ? <Brightness3Icon /> : <WbSunnyIcon />}
                </IconButton>
                <ConfigurationMenu onChange={handleConfigurationChange} />
              </Grid>
            </Grid>

          </Toolbar>
        </AppBar>
        <div style={{ margin: "0px 25px 0px 25px" }}>
          <Switch>
            <Route path={"/"} component={Dashboard} exact={true} />
            <Route path={"/block/:hash"} component={Block} />
            <Route path={"/blocks"} component={NodeView} />
            <Route path={"/tx/:hash"} component={Transaction} />
            <Route path={"/address/:address"} component={Address} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
