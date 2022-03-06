import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import Web3 from "web3";
import { convertUnixToDate } from "../utils/dateConverter";

const Home: NextPage = () => {
  const [data, setData] = useState<any>([]);
  const [block, setBlock] = useState<string>("");
  const [hashTotalValue, setHashTotalValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  const getBlockData = async () => {
    try {
      const blocks = await web3.eth.getBlock(block);
      setData(blocks);
      loadingRender();
      if (blocks.transactions && blocks.transactions.length > 0) {
        const txs = blocks.transactions;
        // let txCount = txs.length;
        let totalValue: number[] = [];

        while (txs.length > 0) {
          // loadingRender();
          const tx = await web3.eth.getTransaction(txs[txs.length - 1]);
          let total = 0;
          total += parseFloat(tx.value);
          totalValue.push(total);
          // txCount--;
          txs.length--;
          console.log("txCount", txs.length);
        }

        let sum = totalValue.reduce((a, b) => a + b, 0).toString();
        const totalEth = web3.utils.fromWei(sum, "ether");
        setHashTotalValue(totalEth);
        return totalValue;
      }
    } catch (error) {
      console.log("Failed to get block data", error);
    }
  };

  const getTransactionFromBlock = async (block: string) => {
    try {
      const transactions = await web3.eth.getBlock(block);
      return transactions;
    } catch (error) {
      console.log("Failed to get transactions from block", error);
    }
  };

  const loadingRender = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
  };

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    getBlockData();
    getTransactionFromBlock(block);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBlock(e.target.value);
  };

  const renderTransactions = () => {
    if (data?.transactions) {
      return <div>{data.transactions.length} transactions</div>;
    } else {
      return <div>No results</div>;
    }
  };

  useEffect(() => {
    loadingRender();
  }, []);

  return (
    <div>
      Block search:
      <input type="text" onChange={(e) => handleChange(e)} value={block} />
      <button onClick={handleClick}>Search</button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Hash
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Block Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Transactions
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Eth Transfered
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data?.hash ? data.hash : "No hash info"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data?.number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {renderTransactions()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {convertUnixToDate(data.timestamp)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ETH {hashTotalValue ? hashTotalValue : "0"}{" "}
            </td>
          </tr>
        </tbody>
      </table>
      <pre>
        {/* debugger: <br />
        {JSON.stringify(data, null, 2)} */}
        {/* Total value: <br /> */}
        {/* {hashTotalValue} */}
      </pre>
    </div>
  );
};

export default Home;
