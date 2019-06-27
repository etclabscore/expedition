import ERPC from "@etclabscore/ethereum-json-rpc";
import JadeServiceRunner from "@etclabscore/jade-service-runner-client";
import * as React from "react";

const serviceRunner = new JadeServiceRunner({
    transport: {
        host: "localhost",
        port: 8002,
        type: "http",
    },
});

const serviceName = "multi-geth";

function useMultiGeth(version: string, env: string): [ERPC] {
    const [erpc, setErpc] = React.useState();
    React.useEffect(() => {
        const runAsync = async () => {
            const installed = await serviceRunner.installService(serviceName, version);
            if (!installed ) { return; }
            const service = await serviceRunner.startService(serviceName, version, env);
            setErpc(new ERPC({
                transport: {
                    type: "http",
                    host: "localhost",
                    port: parseInt(service.rpcPort, 10),
                },
            }));
        };
        runAsync();
    }, [version, env]);
    return [erpc];
}

export default useMultiGeth;
