import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import NodeView from './containers/NodeView';
import Block from './containers/Block';
import Address from './containers/Address';
import Transaction from './containers/Transaction';
import Dashboard from './containers/Dashboard';

import store from './store';
import { history } from './store';

import Page from 'emerald-js-ui/lib/components/Page';
import { Provider } from 'react-redux'

import { AppBar, NetworkSelector } from 'emerald-js-ui';
import { VaultJsonRpcProvider } from 'emerald-js-ui/lib/providers/VaultJsonRpcProvider';
import { EthJsonRpcProvider } from 'emerald-js-ui/lib/providers/EthJsonRpcProvider';


const routes = [
  { path: '/', component: Dashboard, title: 'Dashboard', exact: true },
  { path: '/block/:hash', component: Block, title: 'Block' },
  { path: '/blocks', component: NodeView, title: 'Latest Blocks' },
  { path: '/tx/:hash', component: Transaction, title: 'Transaction Details' },
  { path: '/address/:address', component: Address, title: 'Address Details' },
];

class App extends React.Component {
  render() {
    const ethUrl = "http://localhost:8545";
    const vaultUrl = "http://localhost:9120";
    return (
      <Provider store={store}>
        <EthJsonRpcProvider url={ethUrl}>
          <VaultJsonRpcProvider url={vaultUrl}>
            <div>
              <div>
                <AppBar title="Jade" subtitle="Explorer">
                  <NetworkSelector />
                </AppBar>
              </div>
              <div style={{ margin: '20px' }}>
                <ConnectedRouter history={history}>
                  <Switch>
                    {
                      routes.map((routeProps, i) => {
                        let wrapped = (props) => (
                          <Page title={routeProps.title}>
                            {routeProps.component({ ...props, history })}
                          </Page>
                        );

                        return (<Route key={i} path={routeProps.path} component={wrapped} exact={routeProps.exact} />);
                      })
                    }
                  </Switch>
                </ConnectedRouter>
              </div>
            </div>
          </VaultJsonRpcProvider>
        </EthJsonRpcProvider>
      </Provider>
    );
  }
}

export default App;


