import { ChangeEvent, useState } from 'react';

const Search = () => {
  const [block, setBlock] = useState<string>("");
  const getBlockData = async () => {}
  const getTransactionFromBlock = async (block: string) => {}
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    getBlockData();
    getTransactionFromBlock(block);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBlock(e.target.value);
  };

  return (
    <div>
      Block search:
      <input type="text" onChange={(e) => handleChange(e)} value={block} />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Search;
