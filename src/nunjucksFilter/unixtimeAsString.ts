export const unixtimeAsString = (unixtime: number) => {
  return new Date(unixtime * 1000).toLocaleString();
};
