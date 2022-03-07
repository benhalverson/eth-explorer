export const truncateHash = (hash: string) => {
  if (hash) {
    return `${hash.substring(0, 2)}...
      ${hash.substring(hash.length - 4, hash.length)}`;
  } else {
    return "";
  }
};
