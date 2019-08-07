import moment from "moment";

const hexToDate = (hexTimestamp: string) => {
  return moment(
    new Date(parseInt(hexTimestamp, 16) * 1000).toISOString(),
  ).format("MMMM Do YYYY, h:mm:ss a");
};

export default hexToDate;
