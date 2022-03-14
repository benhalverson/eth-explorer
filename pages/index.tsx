import type { NextPage } from "next";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import ReactLoading from "react-loading";
import Web3 from "web3";
// import Card from "../components/Card";
// import CardList from "../components/CardList";
import { truncateHash, convertUnixToDate } from "../utils";
import RangeForm from "../components/RangeForm";

const Home: NextPage = () => {
  const [data, setData] = useState<any>([]);
  const [block, setBlock] = useState<string>("");
  const [hashTotalValue, setHashTotalValue] = useState<string>("");
  const [tranactions, setTranactions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [enabled, setEnabled] = useState(false);

  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const {
    useGetTransactionFromBlock,
  } = require("../hooks/useGetTransactionsFromBlock");

  const getBlockData = async () => {
    try {
      const blocks = await web3.eth.getBlock(block);
      setData(blocks);
      // setLoading(true);
      for (let i = 0; i < blocks.transactions.length; i++) {
        const t = await web3.eth.getTransaction(blocks.transactions[i]);
        setTranactions((tranactions: any) => [...tranactions, t]);
      }
      if (blocks?.transactions && blocks.transactions.length > 0) {
        const txs = blocks?.transactions;
        console.log("txs", txs);
        let totalValue: number[] = [];
        let txLength = txs.length;
        while (txLength > 0) {
          const tx = await web3.eth.getTransaction(txs[txLength - 1]);
          if (tx.value === null || tx.value === undefined) {
            throw new Error("no value");
          }
          console.log("loading 1", loading);
          // setLoading(true);
          let total = 0;
          total += parseFloat(tx.value);
          totalValue.push(total);
          txLength--;
          console.log("txCount", txLength);
        }

        console.log("loading 1", loading);
        let sum = totalValue.reduce((a, b) => a + b, 0).toString();
        const totalEth = web3.utils.fromWei(sum, "ether");
        setHashTotalValue(totalEth);
        setLoading(false);
        return totalValue;
      }
    } catch (error) {
      console.error("Failed to get block data", error);
    }
  };

  const getTransactionFromBlock = async (block: string) => {
    try {
      const transactions = await web3.eth.getBlock(block);
      setLoading(false);
      return transactions;
    } catch (error) {
      console.error("Failed to get transactions from block", error);
    }
  };

  // const useData = useGetTransactionFromBlock(block);

  // useData(block);
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    getBlockData();
    // useData(block);

    // useGetTransactionFromBlock(block);
    getTransactionFromBlock(block);
  };

  const reseetData = () => {
    setData([]);
    setTranactions([]);
    setHashTotalValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBlock(e.target.value);
  };

  return (
    <>
      <div className="container text-center">
        <label htmlFor="search" className="p-5">
          Block search:
        </label>
        <input
          id="search"
          type="search"
          onChange={(e) => handleChange(e)}
          value={block}
          className="form-control min-w-0  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          onClick={handleClick}
          className="ml-2 pl-5 pr-5 pt-1 pb-1 rounded border-2"
        >
          Search
        </button>
        <button
          onClick={reseetData}
          className="ml-2 pl-5 pr-5 pt-1 pb-1 rounded border-2"
        >
          Clear
        </button>
      </div>
      {!enabled && (
        <div>
          <RangeForm />
        </div>
      )}
      <input type="checkbox" onChange={() => setEnabled(!enabled)} />
      <div>{JSON.stringify(enabled, null, 2)}</div>
      {loading ? (
        <ReactLoading
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
      ) : (
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
                {truncateHash(data?.hash) ? truncateHash(data.hash) : null}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {data?.number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {`${data?.transactions?.length} transactions`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {convertUnixToDate(data?.timestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {hashTotalValue ? hashTotalValue : null}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
        {tranactions.map((t: any, index: number) => {
          return (
            <li
              key={index}
              className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="flex-1 flex flex-col p-8">
                <div className="uppercase">
                  Total eth transfered: {web3.utils.fromWei(t.value, "ether")}
                </div>
                <div className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  Gas Price {t.gasPrice}
                </div>

                <div className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  Gas {t.gas}
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    From:{" "}
                    <a
                      href={`https://etherscan.io/address/${t.from}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {truncateHash(t.from)}
                      {/* {t.from.length} */}
                    </a>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    To: {truncateHash(t.to)}
                    {/* {t.to.length} */}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <pre>{JSON.stringify(tranactions, null, 2)}</pre>
    </>
  );
};

export default Home;
