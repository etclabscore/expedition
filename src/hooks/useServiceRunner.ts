import JadeServiceRunner from "@etclabscore/jade-service-runner-client";
import * as React from "react";

function useServiceRunner(): [JadeServiceRunner | undefined, any] {
  const [url, setUrl] = React.useState("http://localhost:8002");
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
  return [serviceRunner, setUrl];
}

export default useServiceRunner;
