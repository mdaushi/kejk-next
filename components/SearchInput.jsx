import React from "react";

const SearchInput = ({ value, onChange, placeholder, width }) => {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      className={`rounded-full bg-zinc-100 px-4 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-zinc-900 dark:text-zinc-300 ${width} h-10 text-sm md:rounded-md md:p-2`}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
