import React from "react";

export default function HeaderView({ children }) {
  return (
    <header className="mx-auto w-full">
      <div className="flex w-full justify-start pt-12 md:justify-center md:px-4">
        <h1 className="font-serif text-3xl font-bold text-zinc-900 dark:text-zinc-200 md:text-center md:text-4xl">
          {children}
        </h1>
      </div>
    </header>
  );
}
