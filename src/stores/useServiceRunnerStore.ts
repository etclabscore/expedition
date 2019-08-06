import { createStore } from "reusable";
import useServiceRunner from "../hooks/useServiceRunner";
export default createStore(() => useServiceRunner("http://localhost:8002"));
