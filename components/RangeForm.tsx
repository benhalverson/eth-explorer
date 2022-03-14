import React from "react";
import type { NextPage } from "next";
import Web3 from 'web3';

const RangeForm: NextPage = () => {
  
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const [data, setData] = React.useState<any>([]);
  const [startingBlock, setStartingBlock] = React.useState<string>("");
  const [endingBlock, setEndingBlock] = React.useState<string>("");
  const [hashTotalValue, setHashTotalValue] = React.useState<string>("");
  const [tranactions, setTranactions] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean | undefined>(undefined);
  const [transactionsArray, setTransactionArray] = React.useState<any>([]);

  const handleChangeStarting = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    setStartingBlock(e.target.value);
  };

  const handleChangeEnding = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setEndingBlock(e.target.value);
  };

  const resetData = () => {
    setData([]);
    setStartingBlock("");
    setEndingBlock("");
    setHashTotalValue("");
    setTranactions([]);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (startingBlock && endingBlock) {
      setLoading(true);
      setStartingBlock(startingBlock);
      setEndingBlock(endingBlock);
      getBlockData(startingBlock, endingBlock)
    }
  };

  const getBlockData = async (startingBlock: string, endingBlock: string) => {
    try {
      const startingBlockNumber = parseInt(startingBlock, 10);
      const endingBlockNumber = parseInt(endingBlock, 10);
      const totalValue = [];
      let txLength = endingBlockNumber - startingBlockNumber;
      let transactionsArray = [];
      console.log("txLength", txLength);
      for (let i = startingBlockNumber; i <= endingBlockNumber; i++) {
        const block = i.toString();
        console.log('for loop i', i);
        const blockData = await web3.eth.getBlock(block);
        for(let j = 0; j < blockData.transactions.length; j++) {
          const tx = blockData.transactions[j];
          console.log('tx in for loop j', tx);
          const txData = await web3.eth.getTransaction(tx);
          transactionsArray.push(txData);
          console.log('transactionsArray', transactionsArray, transactionsArray.length);
          if(txData) {
            totalValue.push(txData.value);
            setTransactionArray(transactionsArray);
          }
        }
        const transactions = await web3.eth.getBlock(block);
        console.log("transactions", transactions);
        console.log('transactionsArray', transactionsArray);
        setLoading(false);
        return transactions;
      }
    } catch (error) {
      console.error("Failed to get block data", error);
    }
  };

  return (
    <div>
      <div className="container text-center">
        <label htmlFor="search" className="p-5">
          Block search:
        </label>
        <input
          type="search"
          onChange={(e) => handleChangeStarting(e)}
          value={startingBlock}
          className="form-control min-w-0  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Starting block"
          aria-label="Starting block"
        />

        <input
          type="search"
          onChange={(e) => handleChangeEnding(e)}
          value={endingBlock}
          className="form-control min-w-0  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Ending block"
          aria-label="Ending block"
        />
        <button
          onClick={handleClick}
          className="ml-2 pl-5 pr-5 pt-1 pb-1 rounded border-2"
        >
          Search
        </button>
        <button
          onClick={resetData}
          className="ml-2 pl-5 pr-5 pt-1 pb-1 rounded border-2"
        >
          Clear
        </button>
      </div>
      <pre>
        {JSON.stringify(tranactions, null, 2)}
      </pre>
    </div>
  );
};

export default RangeForm;
