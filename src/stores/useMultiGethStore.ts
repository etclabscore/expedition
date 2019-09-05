import { createStore } from "reusable";
import useMultiGeth from "../hooks/useMultiGeth";
import useServiceRunnerStore from "./useServiceRunnerStore";
import useQueryParams from "../hooks/useQueryParams";

export default createStore(() => {
  const [serviceRunner, serviceRunnerUrl] = useServiceRunnerStore();
  const [queryParams] = useQueryParams();
  return useMultiGeth(serviceRunner, serviceRunnerUrl, "1.9.2", "mainnet", queryParams.rpcUrl);
});
