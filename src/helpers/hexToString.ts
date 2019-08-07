const hexToString = (hex: string) => {
  return new Buffer(hex.substring(2), "hex").toString();
};

export default hexToString;
