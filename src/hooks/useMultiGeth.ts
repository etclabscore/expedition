import ERPC from "@etclabscore/ethereum-json-rpc";
import JadeServiceRunner from "@etclabscore/jade-service-runner-client";
import * as React from "react";

const serviceName = "multi-geth";

function useMultiGeth(serviceRunner: JadeServiceRunner | undefined, version: string, env: string): [ERPC, any] {
  const [erpc, setErpc] = React.useState();
  const [url, setUrl] = React.useState();
  React.useEffect(() => {
    if (!serviceRunner) {
      return;
    }
    const runAsync = async () => {
      const installed = await serviceRunner.installService(serviceName, version);
      if (!installed) { return; }
      const service = await serviceRunner.startService(serviceName, version, env);
      let parsedUrl;
      try {
        parsedUrl = new URL(url || `http://localhost:${service.rpcPort}`);
      } catch (e) {
        return;
      }
      let rpc;
      try {
        rpc = new ERPC({
          transport: {
            type: parsedUrl.protocol.split(":")[0] as any,
            host: parsedUrl.hostname,
            port: parseInt(parsedUrl.port, 10),
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
  }, [serviceRunner, url, version, env]);
  return [erpc, setUrl];
}

export default useMultiGeth;
