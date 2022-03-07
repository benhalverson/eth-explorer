import React from "react";
import type { NextPage } from "next";
const RangeForm: NextPage = () => {
  const [data, setData] = React.useState<any>([]);
  const [startingBlock, setStartingBlock] = React.useState<string>("");
  const [endingBlock, setEndingBlock] = React.useState<string>("");
  const [hashTotalValue, setHashTotalValue] = React.useState<string>("");
  const [tranactions, setTranactions] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean | undefined>(undefined);

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

    console.log('startingBlock', startingBlock);
    console.log('endingBlock', endingBlock);
  };
  return (
    <div>
      <div className="container text-center">
        <label htmlFor="search" className="p-5">
          Block search:
        </label>
        <input
          type="text"
          onChange={(e) => handleChangeStarting(e)}
          value={startingBlock}
          className="form-control min-w-0  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Starting block"
          aria-label="Starting block"
        />

        <input
          type="text"
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
    </div>
  );
};

export default RangeForm;
