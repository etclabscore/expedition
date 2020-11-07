import { AppBar, CssBaseline, Toolbar, Typography, IconButton, Grid, InputBase, Tooltip } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import React, { Dispatch, ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import { Link as RouterLink, Router, Route, Switch } from "react-router-dom";
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
import NotesIcon from "@material-ui/icons/Notes";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CodeIcon from "@material-ui/icons/Code";
import ServiceRunner, { ObjectOfStringDoaGddGAStringVp8AIgHFStringDoaGddGAUnorderedSetOfObjectOfStringDoaGddGAStringDoaGddGAKieCSt44UIuKSje3YY1BLmC3 as IAvailableServices } from "@etclabscore/jade-service-runner-client"; //tslint:disable-line
import availableServiceToNetwork from "./helpers/availableServiceToNetwork";

import useInterval from "use-interval";
import useServiceRunnerStore from "./stores/useServiceRunnerStore";
import useCoreGethStore from "./stores/useCoreGethStore";
import EthereumJSONRPC from "@etclabscore/ethereum-json-rpc";
import ETHJSONSpec from "@etclabscore/ethereum-json-rpc-specification/openrpc.json";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./containers/LanguageMenu";
import { createBrowserHistory } from "history";
import NetworkDropdown from "./components/NetworkDropdown/NetworkDropdown";
import { StringParam, QueryParamProvider, useQueryParams } from "use-query-params";
import { createPreserveQueryHistory } from "./helpers/createPreserveHistory";
import BlockRawContainer from "./containers/BlockRawContainer";
import TransactionRawContainer from "./containers/TransactionRawContainer";
import expeditionLogo from "./expedition.png";
import MinerStatsPage from "./containers/MinerStatsPage";

const history = createPreserveQueryHistory(createBrowserHistory, ["network", "rpcUrl"])();

function App(props: any) {
  const { t } = useTranslation();
  const darkMode = useDarkMode();
  const [search, setSearch] = useState();
  const theme = darkMode.value ? darkTheme : lightTheme;

  const [selectedNetwork, setSelectedNetworkState] = useState();
  const [serviceRunner, serviceRunnerUrl, setServiceRunnerUrl, availableServices]: [ServiceRunner, string, any, IAvailableServices[]] = useServiceRunnerStore(); //tslint:disable-line
  const [erpc, setCoreGethUrlOverride]: [EthereumJSONRPC, Dispatch<string>] = useCoreGethStore();
  const [networks, setNetworks] = useState<any[]>([]);

  const [query, setQuery] = useQueryParams({
    network: StringParam,
    rpcUrl: StringParam,
  });

  const setSelectedNetwork = async (network: any) => {
    setSelectedNetworkState(network);
    if (network.service) {
      await serviceRunner.installService(network.service.name, network.service.version);
      await serviceRunner.startService(network.service.name, network.service.version, network.name);
    }
    setCoreGethUrlOverride(network.url);
  };

  useEffect(() => {
    if (availableServices && serviceRunnerUrl) {
      const n = availableServiceToNetwork(availableServices, serviceRunnerUrl);
      setNetworks(n);
    }
  }, [availableServices, serviceRunnerUrl]);

  useEffect(() => {
    if (!networks || networks.length === 0) {
      return;
    }
    if (query.rpcUrl) {
      return;
    }
    if (networks && query.network) {
      const foundNetwork = networks.find((net) => net.name === query.network);
      setSelectedNetworkState(foundNetwork);
    } else {
      setSelectedNetworkState(networks[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networks, query.network]);

  useEffect(() => {
    if (selectedNetwork === undefined) {
      return;
    }
    const { name } = selectedNetwork as any;

    if (name !== query.network) {
      setQuery({ network: name });
      history.push({
        pathname: history.location.pathname,
        search: `?network=${name}`,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNetwork, setQuery]);

  const handleConfigurationChange = (type: string, url: string) => {
    if (type === "service-runner") {
      setServiceRunnerUrl(url);
    } else if (type === "ethereum-rpc") {
      setCoreGethUrlOverride(url);
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

  const isAddress = (q: string): boolean => {
    const re = new RegExp(ETHJSONSpec.components.schemas.Address.pattern);
    return re.test(q);
  };

  const isKeccakHash = (q: string): boolean => {
    const re = new RegExp(ETHJSONSpec.components.schemas.Keccak.pattern);
    return re.test(q);
  };

  const isBlockNumber = (q: string): boolean => {
    const re = new RegExp(/^-{0,1}\d+$/);
    return re.test(q);
  };

  const handleSearch = async (qry: string | undefined) => {
    if (qry === undefined) { return; }
    const q = qry.trim();
    if (isAddress(q)) {
      history.push(`/address/${q}`);
    }
    if (isKeccakHash(q)) {
      let transaction;

      try {
        transaction = await erpc.eth_getTransactionByHash(q);
      } catch (e) {
        // do nothing
      }

      if (transaction) {
        history.push(`/tx/${q}`);
      }
      let block;
      try {
        block = await erpc.eth_getBlockByHash(q, false);
      } catch (e) {
        // do nothing
      }
      if (block) {
        history.push(`/block/${q}`);
      }
    }
    if (isBlockNumber(q)) {
      const block = await erpc.eth_getBlockByNumber(`0x${parseInt(q, 10).toString(16)}`, false);
      if (block) {
        history.push(`/block/${block.hash}`);
      }
    }
  };

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky" color="default" elevation={0}>
          <Toolbar>
            <Grid justify="space-between" alignItems="center" alignContent="center" container>
              <Grid item style={{ marginTop: "8px" }}>
                <Link
                  component={({ className, children }: { children: any, className: string }) => (
                    <RouterLink className={className} to={"/"}>
                      {children}
                    </RouterLink>
                  )}>
                  <Grid container>
                    <Grid>
                      <img
                        alt="expedition-logo"
                        height="30"
                        style={{ marginRight: "10px" }}
                        src={expeditionLogo}
                      />
                    </Grid>
                    <Grid>
                      <Typography color="textSecondary" variant="h6">
                        {t("Expedition")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputBase
                  placeholder={t("Enter an Address, Transaction Hash or Block Number")}
                  onKeyDown={
                    (event: KeyboardEvent<HTMLInputElement>) => {
                      if (event.keyCode === 13) {
                        handleSearch(search);
                      }
                    }
                  }
                  onChange={
                    (event: ChangeEvent<HTMLInputElement>) => {
                      if (event.target.value) {
                        const {value} = event.target;
                        setSearch(value as any);
                      }
                    }
                  }
                  fullWidth
                  style={{
                    background: "rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                    padding: "5px 10px 0px 10px",
                    marginRight: "5px",
                  }}
                />
              </Grid>
              <Grid item>
                <NetworkDropdown
                  networks={networks}
                  setSelectedNetwork={setSelectedNetwork}
                  selectedNetwork={selectedNetwork}
                />
                <LanguageMenu />
                <Tooltip title={t("JSON-RPC API Documentation") as string}>
                  <IconButton
                    onClick={() =>
                      window.open("https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/etclabscore/ethereum-json-rpc-specification/master/openrpc.json") //tslint:disable-line
                    }>
                    <NotesIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("Expedition Github") as string}>
                  <IconButton
                    onClick={() =>
                      window.open("https://github.com/etclabscore/expedition")
                    }>
                    <CodeIcon />
                  </IconButton>
                </Tooltip>
                <ConfigurationMenu onChange={handleConfigurationChange} />
                <Tooltip title={t("Toggle Dark Mode") as string}>
                  <IconButton onClick={darkMode.toggle}>
                    {darkMode.value ? <Brightness3Icon /> : <WbSunnyIcon />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "0px 25px 0px 25px" }}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <CssBaseline />
            <Switch>
              <Route path={"/"} component={Dashboard} exact={true} />
              <Route path={"/stats/miners"} component={MinerStatsPage} exact={true} />
              <Route path={"/stats/miners/:block"} component={MinerStatsPage} />
              <Route path={"/block/:hash/raw"} component={BlockRawContainer} />
              <Route path={"/block/:hash"} component={Block} />
              <Route path={"/blocks/:number"} component={NodeView} />
              <Route path={"/tx/:hash/raw"} component={TransactionRawContainer} />
              <Route path={"/tx/:hash"} component={Transaction} />
              <Route path={"/address/:address/:block"} component={Address} />
              <Route path={"/address/:address"} component={Address} />
            </Switch>
          </QueryParamProvider>
        </div>
      </ThemeProvider >
    </Router >
  );
}

export default App;
