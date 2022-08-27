import React from "react";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      className="mt-4 w-full rounded-full bg-gray-100 p-2 text-neutral-900 focus:outline-none focus:outline focus:outline-teal-500 dark:bg-neutral-800 dark:text-neutral-300 md:w-1/2 md:rounded-md"
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
