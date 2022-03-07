import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import Web3 from "web3";
import Card from "../components/Card";
import CardList from "../components/CardList";
import { truncateHash, convertUnixToDate } from "../utils";

const Home: NextPage = () => {
  const [data, setData] = useState<any>([]);
  const [block, setBlock] = useState<string>("");
  const [hashTotalValue, setHashTotalValue] = useState<string>("");
  const [tranactions, setTranactions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  const getBlockData = async () => {
    try {
      const blocks = await web3.eth.getBlock(block);
      setData(blocks);

      for (let i = 0; i < blocks.transactions.length; i++) {
        const t = await web3.eth.getTransaction(blocks.transactions[i]);
        setTranactions((tranactions: any) => {
          console.log("set tranactions", t);

          return [...tranactions, t];
        });
      }
      if (blocks?.transactions && blocks.transactions.length > 0) {
        const txs = blocks?.transactions;
        // let txCount = txs.length;
        let totalValue: number[] = [];
        while (txs.length > 0) {
          const tx = await web3.eth.getTransaction(txs[txs.length - 1]);
          if (tx.value === null || tx.value === undefined) {
            throw new Error("no value");
          }
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
      console.log("data.transactions", data.transactions);
      return <div>{data?.transactions.length} transactions</div>;
    } else {
      return <div>No results</div>;
    }
  };

  useEffect(() => {}, []);

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
              {truncateHash(data?.hash)
                ? truncateHash(data.hash)
                : "No hash info"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data?.number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {renderTransactions()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {convertUnixToDate(data?.timestamp)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ETH {hashTotalValue ? hashTotalValue : "0"}{" "}
            </td>
          </tr>
        </tbody>
      </table>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tranactions.map((t: any, index: number) => {
          return (
            <li
              key={index}
              className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="flex-1 flex flex-col p-8">
                <div>Total eth transfered: {web3.utils.fromWei(t.value, "ether")}</div>
                <div>Gas  {web3.utils.fromWei(t.gas.toString(), "ether")}</div>
                <div>Gas Price  {web3.utils.fromWei(t.gasPrice, "ether")}</div>
                <div className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {t.from}
                </div>
                To:
                <div className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {t.to}
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    {/* <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Email</span>
                </a> */}
                    fill me in
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    {/* <a
                  href={`tel:${person.telephone}`}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Call</span>
                </a> */}
                    fill me in 2
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
