//convert unix timestamp to date
export const convertUnixToDate = (unix: number) => {
  return new Date(unix * 1000).toLocaleDateString();
}
