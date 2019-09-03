import { createStore } from "reusable";
import useMultiGeth from "../hooks/useMultiGeth";
import useServiceRunnerStore from "./useServiceRunnerStore";

export default createStore(() => {
  const [serviceRunner, serviceRunnerUrl] = useServiceRunnerStore();
  return useMultiGeth(serviceRunner, serviceRunnerUrl, "1.9.2", "mainnet");
});
