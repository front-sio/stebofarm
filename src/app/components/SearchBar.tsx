import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', searchValue);
  };

  return (
    <div
      className="SearchBar w-[884px] h-[66px] px-[39px] py-[20.50px] rounded-[10px] border border-black flex items-center gap-2.5"
      style={{ marginLeft: '100px' }}
    >
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search product..."
        className="SearchProduct w-full text-black text-base font-normal font-['Inter'] leading-normal outline-none"
      />
      <button onClick={handleSearch}>
        <FaSearch size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
