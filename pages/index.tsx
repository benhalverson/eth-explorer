import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import Web3 from "web3";

const Home: NextPage = () => {
  const [data, setData] = useState<any>([]);
  const [block, setBlock] = useState<string>("");
  const [transaction, setTransaction] = useState('');

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

  const getHashData = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const transactions = await web3.eth.getTransaction('0x7d67fb191e8b85ec6e5e2744868f70833f5e81b6a0fb9af3c9d6ff68b3f6e7d2');

      setData(transactions);
      console.log("result", transactions);
      // if (data === null) {
      //   return <div>No results</div>;
      // }
      // if (data) {
      //   setData({ data });
      // }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlockData();
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

  return (
    <div>
      Block search:{" "}
      <input type="text" onChange={(e) => handleChange(e)} value={block} />
      <button onClick={handleClick}>Search</button>
      {/* {data &&
        data.result.map((d: Result) => (
          <>
            <div>{d.transactions}</div>
          </>
        ))} */}
      <ul>
        {data?.transactions?.map((str: any, idx: number) => (
          <li key={idx}>transaction: {str}</li>
        ))}
      </ul>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
