import { createStore } from "reusable";
import useServiceRunner from "../hooks/useServiceRunner";
export default createStore(() => useServiceRunner(process.env.REACT_APP_SERVICE_RUNNER_URL || "http://localhost:8002"));
