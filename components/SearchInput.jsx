import React from "react";

const SearchInput = ({ value, onChange, placeholder, width }) => {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      className={`mt-4 rounded-full bg-neutral-100 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-neutral-900 dark:text-neutral-300 ${width} md:rounded-md md:p-2`}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
