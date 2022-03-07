import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
const CardList = ({ transactions }: TransactionList[] | any) => {
  // console.log('transactions', transactions)
  const [hash, setHash] = useState<string[]>([]);
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  const getHashData = async (hash: string[]) => {
    // console.log('hash', hash)
    try {
      // const tx = await web3.eth.getTransaction(hash);
      // return tx;
    } catch (error) {
      console.log("Failed to get block data", error);
    }
  };

  
  useEffect(() => {
    getHashData(hash);
  }, []);
  return (
    <ul className=''>
      {transactions &&
        transactions.map((transaction: Transaction, index: number) => {
          // console.log("transaction", transaction);
          return (
            <li key={transaction.hash}>
              {transaction.hash}{" "}
              <span>
                {transaction.from} - {transaction.to}
              </span>
            </li>
          );
        })}
    </ul>
  );
};

export default CardList;

export interface TransactionList {
  transaction: Transaction;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: number;
}
