import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
export const useGetTransactionFromBlock = async (block: string) => {
  try {
    const transactions = await web3.eth.getBlock(block);
    // setLoading(false);
    return transactions;
  } catch (error) {
    console.error("Failed to get transactions from block", error);
  }
};
