import React from "react";
import Image from "next/image";
import Link from "next/link";
import AllCapsHeader from "../components/AllCapsHeader";

const AppCard = ({ title, subtitle, image, link, year }) => {
  return (
    <Link
      href={link}
      className="flex flex-col space-y-2 rounded-xl border border-zinc-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-lime-500 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
    >
      <div className="flex w-full items-start justify-between pb-2">
        <Image
          className="h-auto w-full rounded"
          src={image}
          width={400}
          height={100}
          placeholder="blur"
          blurDataURL={`${image}?auto=format,compress&q=1&blur=500&w=2`}
          alt="Image of the project"
          quality={100}
        />
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <header className="flex w-full items-center justify-between">
          <span className="w-full text-lg font-bold text-zinc-700 dark:text-zinc-200">
            {title}
          </span>
          <span className="flex w-1/3 justify-end font-mono text-sm uppercase text-zinc-500 dark:text-zinc-400">
            {year}
          </span>
        </header>
        <span className="tracking-tight text-zinc-500 dark:text-zinc-400">
          {subtitle}
        </span>
      </div>
    </Link>
  );
};

export default AppCard;
