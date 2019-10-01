import moment from "moment";

const hexToDate = (hexTimestamp: string) => {
  return new Date(parseInt(hexTimestamp, 16) * 1000).toISOString();
};

export default hexToDate;
