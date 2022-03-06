import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import Web3 from "web3";

const Home: NextPage = () => {
  const [data, setData] = useState<any>([]);
  const [block, setBlock] = useState<string>("");
  const [transaction, setTransaction] = useState("");

  const getBlockData = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const blocks = await web3.eth.getBlock(block);

      setData(blocks);
      // console.log("result", blocks.transactions);
      // if (data === null) {
      //   return <div>No results</div>;
      // }
      // if (data) {
      //   setData({ data });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const getHashData = async (transactions: any) => {
    console.log("transactions", transactions);
    try {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const transactions = await web3.eth.getTransaction(transaction);
      console.log("transaction value result in wei", transactions.value);
      // setTransaction(transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactionFromBlock = async (block: string) => {
    try {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const transactions = await web3.eth.getBlock(block);
      console.log("transactions.transactions", transactions.transactions[0]);
      // if (!data || !data.transactions || data.transactions.length === 0) {
      //   console.log("transactions", transactions);
      //   // console.error('No transactions found in block');
      //   throw new Error("No data");
      // } else {
        const data = await getHashData(transactions.transactions);
        console.log("data", data);
      // }
      return data;
      // console.log("transactions from block", { transactions });

      // console.log("transaction sum", JSON.stringify(transactions, null, 2));

      // console.log("am i an array result", Array.isArray(transactions));
      //sum up all transaction.value
      // const sum = transactions.transactions.reduce(
      //   (accumulator: number, currentValue: any) => {
      //     console.log("currentValue.value", currentValue.value);
      //     console.log("accumulator", accumulator);
      //     return accumulator + currentValue.value;
      //   },0);
      //   console.log('sum', sum);

      console.log("transactions results: ", transactions);
      // console.log("transaction.value", transactions.transactions.map(t => console.log(t)));
      // console.log("tranaction.blockNumber", transactions.blockNumber);
      // const weiConversion = web3.utils.fromWei(transactions.value, "ether");
      // console.log("Convert wei to eth", weiConversion);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlockData();
    getTransactionFromBlock(block);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    getBlockData();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBlock(e.target.value);
  };

  const renderTransactions = () => {
    if (data?.transactions) {
      //loop over transactions and make a request for each one
      getHashData(data.transactions);
      return data.transactions.map((transaction: any) => {
        return (
          <div key={transaction}>
            <p>{transaction}</p>
          </div>
        );
      });
    } else {
      return <div>No results</div>;
    }
  };

  return (
    <div>
      Block search:{" "}
      <input type="text" onChange={(e) => handleChange(e)} value={block} />
      <button onClick={handleClick}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Hash</th>
            <th>Block Number</th>
            <th>Transactions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.hash ? data.hash : "No hash info"}</td>
            <td>{data?.number}</td>
            <td>{renderTransactions()}</td>
            <td>{data?.timestamp}</td>
          </tr>
        </tbody>
      </table>
      <pre>
        debugger: <br/>   
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default Home;
