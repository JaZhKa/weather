import React, { useState } from 'react';

interface Props {
  onSearch: (city: string) => void;
}

const SearchCity: React.FC<Props> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-center items-center my-4'
    >
      <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='Enter city'
        className='p-2 border border-gray-300 rounded-md'
      />
      <button
        type='submit'
        className='p-2 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-800 active:bg-blue-900 transition duration-300 cursor-pointer'
      >
        Search
      </button>
    </form>
  );
};

export default SearchCity;
