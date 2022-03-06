import { NextPage } from 'next';
import {useEffect, useState}from 'react'
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const Ranges: NextPage = () => {
  const [data, setData] = useState<any>([]);
  const [range, setRange] = useState<string[]>([]);

  const getBlockData = async () => {
    try {
      const blocks = await web3.eth.getBlockNumber();
      setData(blocks);
      console.log("blocks", blocks);
    } catch (error) {
      console.log("Failed to get block data", error);
    }
  };
  
  const getBlockRange = async (range: string[]) => {
    try {
      const block1 = await web3.eth.getBlock(range[0]);
      const block2 = await web3.eth.getBlock(range[1]);
      const rangeDifference = block2.number - block1.number;
      console.log('rangeDiff ', rangeDifference);
      // setData(blocks);
      console.log("block1 ", block1);
      console.log("block2 ", block2);
    } catch (error) {
      console.log("Failed to get block data", error);
    }
  };
  useEffect(() => {
    getBlockRange(['14333083','14333487']);
  }, [])


  return (
    <div>ranges</div>
  )
}

export default Ranges