//convert unix timestamp to date
export const convertUnixToDate = (unix: number): string => {
  if (unix) {
    return new Date(unix * 1000).toLocaleDateString();
  } else {
    return "";
  }
};
