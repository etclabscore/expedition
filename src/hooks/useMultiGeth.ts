import ERPC from "@etclabscore/ethereum-json-rpc";
import JadeServiceRunner from "@etclabscore/jade-service-runner-client";
import * as React from "react";

const serviceName = "multi-geth";

function useMultiGeth(
  serviceRunner: JadeServiceRunner | undefined,
  serviceRunnerUrl: string,
  version: string,
  env: string,
): [ERPC] {
  const [erpc, setErpc] = React.useState();
  React.useEffect(() => {
    if (!serviceRunner) {
      return;
    }
    const runAsync = async () => {
      console.log(serviceRunnerUrl); //tslint:disable-line
      const installed = await serviceRunner.installService(serviceName, version);
      console.log("installed", installed); //tslint:disable-line
      await serviceRunner.startService(serviceName, version, env);
      let parsedUrl;
      try {
        parsedUrl = new URL(`${serviceRunnerUrl}/${serviceName}/${env}/${version}`);
      } catch (e) {
        console.error("error parsing url", e);
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
        console.log("rpc", rpc);
      } catch (e) {
        console.error("erroro making rpc client", e);
        return;
      }
      if (rpc) {
        setErpc(rpc);
      }
    };
    runAsync();
  }, [serviceRunner, serviceRunnerUrl, version, env]);
  return [erpc];
}

export default useMultiGeth;
