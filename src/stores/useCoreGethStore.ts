import { createStore } from "reusable";
import useCoreGeth from "../hooks/useCoreGeth";
import useServiceRunnerStore from "./useServiceRunnerStore";
import { useQueryParam, StringParam } from "use-query-params";

export default createStore(() => {
  const [serviceRunner, serviceRunnerUrl] = useServiceRunnerStore();
  const [networkQuery] = useQueryParam("network", StringParam);
  const [rpcUrlQuery] = useQueryParam("rpcUrl", StringParam);
  return useCoreGeth(serviceRunner, serviceRunnerUrl, "1.11.17", networkQuery || "mainnet", rpcUrlQuery);
});
