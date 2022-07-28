import React from "react";

export default function HeaderView({ children }) {
  return (
    <header className="mx-auto w-full">
      <div className="flex w-full justify-start md:justify-center px-4 pt-12 sm:px-6 lg:px-8">
        <h1 className="font-mono text-3xl font-bold text-neutral-900 dark:text-neutral-200 text-left md:text-center">
          {children}
        </h1>
      </div>
    </header>
  );
}
