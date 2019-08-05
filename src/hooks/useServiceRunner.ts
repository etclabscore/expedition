import JadeServiceRunner from "@etclabscore/jade-service-runner-client";
import * as React from "react";

function useServiceRunner(defaultUrl: string): [JadeServiceRunner | undefined, string, any] {
  const [url, setUrl] = React.useState(defaultUrl);
  const [serviceRunner, setServiceRunner] = React.useState<JadeServiceRunner | undefined>();
  React.useEffect(() => {
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
  }, [url]);
  return [serviceRunner, url, setUrl];
}

export default useServiceRunner;
