import React from "react";
import Image from "next/image";
import Tag from "../components/Tag";

const AppCard = ({ title, subtitle, image, link, tags }) => {
  return (
    <a
      className=" space-y-2 rounded-xl border border-zinc-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-lime-600 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900
    "
      href={link}
      rel="noreferrer"
    >
      <div className="flex w-full items-start justify-between space-x-4">
        <Image
          className="rounded"
          src={image}
          width={50}
          height={50}
          placeholder="blur"
          blurDataURL={`${image}?auto=format,compress&q=1&blur=500&w=2`}
          alt="Image of the plugin icon"
          quality={50}
        />
        <div className="w-full flex-col items-center gap-2">
          <header className="mr-2 text-lg font-bold text-zinc-700 dark:text-zinc-200">
            {title}
          </header>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </span>
          {tags && (
            <div className="flex w-full items-center justify-start space-x-2 pt-4">
              {tags !== undefined &&
                tags.map((tag, idx) => {
                  return <Tag key={idx}>{tag}</Tag>;
                })}
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default AppCard;
