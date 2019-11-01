import { createStore } from "reusable";
import useMultiGeth from "../hooks/useMultiGeth";
import useServiceRunnerStore from "./useServiceRunnerStore";
import { useQueryParam, StringParam } from "use-query-params";

export default createStore(() => {
  const [serviceRunner, serviceRunnerUrl] = useServiceRunnerStore();
  const [networkQuery] = useQueryParam("network", StringParam);
  const [rpcUrlQuery] = useQueryParam("rpcUrl", StringParam);
  return useMultiGeth(serviceRunner, serviceRunnerUrl, "1.9.2", networkQuery || "mainnet", rpcUrlQuery);
});
