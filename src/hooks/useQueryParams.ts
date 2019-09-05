import { useState } from "react";
import * as qs from "qs";

const useQueryParams = () => {
  const parse = () => {
    return qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
      depth: 100,
      decoder(str) {
        if (/^(\d+|\d*\.\d+)$/.test(str)) {
          return parseFloat(str);
        }
        if (str === "false") {
          return false;
        }
        if (str === "true") {
          return true;
        }
        return decodeURIComponent(str);
      },
    });
  };
  const [query] = useState(parse());
  return [query];
};

export default useQueryParams;
