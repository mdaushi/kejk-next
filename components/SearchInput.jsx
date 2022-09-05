import React from "react";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      className="mt-4 w-full rounded-full bg-gray-100 py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-gray-300 md:w-1/2 md:rounded-md md:p-2"
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
