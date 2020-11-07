import JadeServiceRunner, { ObjectOfStringDoaGddGAStringVp8AIgHFStringDoaGddGAUnorderedSetOfObjectOfStringDoaGddGAStringDoaGddGAKieCSt44UIuKSje3YY1BLmC3 as IAvailableServices, ServiceRunner } from "@etclabscore/jade-service-runner-client"; //tslint:disable-line
import React, { Dispatch, useEffect } from "react";
import { useQueryParam, StringParam } from "use-query-params";

function useServiceRunner(defaultUrl: string): [JadeServiceRunner, string, Dispatch<string>, IAvailableServices[]] { //tslint:disable-line
  const [url, setUrl] = React.useState(defaultUrl);
  const [serviceRunner, setServiceRunner] = React.useState<JadeServiceRunner | undefined>();
  const [availableServices, setAvailableServices] = React.useState<IAvailableServices[]>([]);
  const [rpcUrlQuery] = useQueryParam("rpcUrl", StringParam);
  React.useEffect(() => {
    if (process.env.REACT_APP_ETH_RPC_URL || rpcUrlQuery) {
      return;
    }
    if (!url) {
      return;
    }
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (e) {
      return;
    }
    let rpc;
    try {
      const protocol = parsedUrl.protocol.split(":")[0] as any;
      const fallbackPort = protocol === "http" ? 80 : 443;
      const port = parseInt(parsedUrl.port, 10);
      rpc = new JadeServiceRunner({
        transport: {
          host: parsedUrl.hostname,
          port: port ? port : fallbackPort,
          type: protocol,
        },
      });
    } catch (e) {
      return;
    }
    if (rpc) {
      setServiceRunner(rpc);
    }
    return () => {
      if (serviceRunner) {
        serviceRunner.rpc.requestManager.close();
      }
    };
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  useEffect(() => {
    if (serviceRunner) {
      serviceRunner.listServices("available").then(setAvailableServices);
    }
  }, [serviceRunner]);
  return [serviceRunner as ServiceRunner, url, setUrl, availableServices];
}

export default useServiceRunner;
