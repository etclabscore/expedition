import ERPC from "@etclabscore/ethereum-json-rpc";
import JadeServiceRunner from "@etclabscore/jade-service-runner-client";
import React, { useState, Dispatch } from "react";

const serviceName = "core-geth";

function useCoreGeth(
  serviceRunner: JadeServiceRunner | undefined,
  serviceRunnerUrl: string,
  version: string,
  env: string,
  queryUrlOverride?: string,
): [ERPC, Dispatch<string>] {
  const [erpc, setErpc] = React.useState<ERPC>();
  const [urlOverride, setUrlOverride] = useState(queryUrlOverride || process.env.REACT_APP_ETH_RPC_URL);
  React.useEffect(() => {
    const runAsync = async () => {
      if (!urlOverride) {
        if (!serviceRunner) {
          return;
        }
        const installed = await serviceRunner.installService(serviceName, version);
        if (!installed) {
          return;
        }
        await serviceRunner.startService(serviceName, version, env);
      }
      let parsedUrl;
      try {
        parsedUrl = new URL(urlOverride || `${serviceRunnerUrl}/${serviceName}/${env}/${version}`);
      } catch (e) {
        return;
      }
      let rpc;
      try {
        const protocol = parsedUrl.protocol.split(":")[0] as any;
        const fallbackPort = protocol === "http" ? 80 : 443;
        const port = parseInt(parsedUrl.port, 10);
        rpc = new ERPC({
          transport: {
            host: parsedUrl.hostname,
            port: port ? port : fallbackPort,
            type: protocol,
            path: parsedUrl.pathname,
          },
        });
      } catch (e) {
        return;
      }
      if (rpc) {
        setErpc(rpc);
      }
    };
    runAsync();
    return () => {
      if (erpc) {
        erpc.rpc.requestManager.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceRunner, serviceRunnerUrl, version, env, urlOverride, queryUrlOverride]);
  return [erpc as ERPC, setUrlOverride];
}

export default useCoreGeth;
