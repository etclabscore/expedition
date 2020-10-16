import { History, LocationDescriptor, LocationDescriptorObject } from "history";
import queryString from "query-string";

type LocationState = History.LocationState;

type CreateHistory<O, H> = (options?: O) => History & H;

function preserveQueryParameters(
  history: History,
  preserve: string[],
  location: LocationDescriptorObject,
): LocationDescriptorObject {
  const currentQuery = queryString.parse(window.location.search);
  if (currentQuery) {
    const preservedQuery: { [key: string]: any } = {};
    for (const p of preserve) {
      const v = currentQuery[p];
      if (v) {
        preservedQuery[p] = v;
      }
    }
    if (location.search) {
      Object.assign(preservedQuery, queryString.parse(location.search));
    }
    location.search = queryString.stringify(preservedQuery);
  }
  return location;
}

function createLocationDescriptorObject(location: LocationDescriptor, state?: LocationState): LocationDescriptorObject {
  return typeof location === "string" ? { pathname: location, state } : location;
}

export function createPreserveQueryHistory<O, H>(
  createHistory: CreateHistory<O, H>,
  queryParameters: string[],
): CreateHistory<O, H> {
  return (options?: O) => {
    const history = createHistory(options);
    const oldPush = history.push;
    const oldReplace = history.replace;
    history.push = (path: LocationDescriptor, state?: LocationState) =>
      oldPush.apply(history, [
        preserveQueryParameters(history, queryParameters, createLocationDescriptorObject(path, state)),
      ]);
    history.replace = (path: LocationDescriptor, state?: LocationState) =>
      oldReplace.apply(history, [
        preserveQueryParameters(history, queryParameters, createLocationDescriptorObject(path, state)),
      ]);
    return history;
  };
}
