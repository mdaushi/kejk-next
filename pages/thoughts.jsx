import Head from "next/head";
import Link from "next/link";
import showdown from "showdown";
import PageHeader from "../components/PageHeader";
import WritingCard from "../components/WritingCard";
import Button from "../components/Button";
import classNames from "classnames";
import fs from "fs";
import { Feed } from "feed";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { RssIcon, XMarkIcon } from "@heroicons/react/20/solid";
import SearchInput from "../components/SearchInput";
import Mori from "next/font/local";

const sans = Mori({
  src: [
    {
      path: "../fonts/PPMori-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/PPMori-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/PPMori-ExtraBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

const { createBucketClient } = require("@cosmicjs/sdk");

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

export default function Writing({ writings }) {
  const metaTitle = "KEJK | Writing";
  const metaImage =
    "https://imgix.cosmicjs.com/e6c72260-d555-11ed-9cfc-8fe1cfdcf0b7-meta-thoughts.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/thoughts";

  // Tab active state
  const [activeTab, setActiveTab] = useState("All");

  // the value of the search field
  const [title, setTitle] = useState("");

  // the search result
  const [foundPosts, setFoundPosts] = useState(writings);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = writings.filter((writing) => {
        return (
          writing.title.toLowerCase().includes(keyword.toLowerCase()) ||
          writing.metadata.snippet
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          writing.metadata.tag.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFoundPosts(results);
    } else {
      setFoundPosts(writings);
    }
    setTitle(keyword);
  };

  const tagFilter = (e) => {
    const tagValue = e.target.innerText;

    const results = writings.filter((writing) => {
      if (tagValue !== "All") {
        return writing.metadata.tag.toLowerCase() === tagValue.toLowerCase();
      } else {
        return writings;
      }
    });
    setFoundPosts(results);
    setActiveTab(tagValue);
  };

  const uniqueTags = [
    ...new Set(writings.map((writing) => writing.metadata.tag)),
  ];

  return (
    <div className={"mt-12"}>
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={metaImage} />
      </Head>
      <div>
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex w-full items-center justify-between">
            <PageHeader>Writing</PageHeader>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button
                  bgColor="bg-zinc-100 dark:bg-zinc-900 mb-4 md:mb-0"
                  textColor="text-black dark:text-white"
                  borderColor="border-zinc-200 dark:border-zinc-700"
                >
                  <RssIcon className="mr-2" width={20} height={20} />
                  Subscribe
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed left-[50%] top-[25%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-25%] rounded-lg bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow dark:border dark:border-zinc-700 dark:bg-zinc-800 md:top-[50%] md:translate-y-[-50%]">
                  <Dialog.Title
                    className={`m-0 text-lg font-bold text-black dark:text-white ${sans.variable}`}
                  >
                    Subscribe
                  </Dialog.Title>
                  <Dialog.Description
                    className={`mb-2 mt-2 text-sm leading-normal text-zinc-500 dark:text-zinc-300 ${sans.variable}`}
                  >
                    Get an email whenever I publish a new thought.
                  </Dialog.Description>
                  <form
                    action="https://buttondown.email/api/emails/embed-subscribe/karl"
                    method="post"
                    target="popupwindow"
                    onSubmit="window.open(
                      'https://buttondown.email/karl',
                      'popupwindow')"
                    className="embeddable-buttondown-form"
                  >
                    <fieldset
                      className={`mb-4 flex flex-col items-start gap-2 ${sans.variable}`}
                    >
                      <label
                        className={`text-right font-sans text-sm text-zinc-500 dark:text-zinc-400 ${sans.variable}`}
                        htmlFor="bd-email"
                      >
                        Your email
                      </label>
                      <div className="flex w-full items-center gap-4">
                        <input
                          className={`inline-flex h-10 w-full flex-1 items-center justify-center rounded-xl bg-zinc-50 px-2 font-sans leading-none text-zinc-800 shadow-[0_0_0_1px] shadow-zinc-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-lime-500 dark:bg-zinc-900 dark:text-zinc-200 ${sans.variable}`}
                          type="email"
                          name="email"
                          id="bd-email"
                          placeholder="e.g. hello@email.com"
                          required
                        />
                        <input type="hidden" value="1" name="embed" />
                        <button
                          type="submit"
                          className={`inline-flex h-10 items-center justify-center rounded-xl bg-lime-400 px-4 font-sans font-semibold leading-none text-lime-950 hover:bg-lime-400 focus:shadow-[0_0_0_2px] focus:shadow-lime-500 focus:outline-none dark:bg-lime-500 ${sans.variable}`}
                        >
                          Subscribe
                        </button>
                      </div>
                    </fieldset>
                    <div
                      className={`mt-4 flex items-center justify-between font-sans ${sans.variable}`}
                    >
                      <div>
                        <span className=" text-zinc-600 dark:text-zinc-300">
                          Or you can subscribe via{" "}
                        </span>
                        <a
                          href="https://kejk.tech/rss.xml"
                          target={"_blank"}
                          rel={"noopener noreferrer"}
                          className="font-bold text-lime-700 underline decoration-2 underline-offset-2 dark:text-lime-500"
                        >
                          RSS
                        </a>
                      </div>
                    </div>
                  </form>
                  <Dialog.Close asChild>
                    <button
                      className="absolute right-2 top-2 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full  hover:bg-lime-400 focus:shadow-[0_0_0_2px] focus:shadow-lime-500 focus:outline-none dark:hover:bg-lime-800"
                      aria-label="Close"
                    >
                      <XMarkIcon
                        height={16}
                        width={16}
                        className="text-zinc-600 hover:text-lime-500 dark:text-zinc-400 dark:hover:text-lime-50"
                      />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div className="mt-4 grid grid-cols-1 items-center gap-4 md:grid-cols-2">
            <div className="scrollbar-hidden flex items-center justify-between space-x-2 overflow-x-auto">
              <button
                className={classNames(
                  "rounded-full border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-white",
                  activeTab === "All" &&
                    "!border !border-lime-300 !bg-lime-100  dark:!border-lime-500 dark:!bg-lime-950"
                )}
                onClick={tagFilter}
              >
                All
              </button>
              {uniqueTags.map((tag, idx) => (
                <button
                  className={classNames(
                    "rounded-full border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-white",
                    activeTab ===
                      `${tag.charAt(0).toUpperCase() + tag.slice(1)}` &&
                      "!border !border-lime-300 !bg-lime-100 dark:!border-lime-500 dark:!bg-lime-950"
                  )}
                  onClick={tagFilter}
                  key={idx}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
            <SearchInput
              value={title}
              onChange={filter}
              placeholder={"Search articles"}
              width={"w-full"}
            />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {foundPosts && foundPosts?.length > 0 && foundPosts !== null ? (
              foundPosts.map((writing, idx) => {
                return (
                  <Link key={idx} href={`/thoughts/${writing?.slug}`}>
                    <WritingCard
                      title={writing.title}
                      subtitle={writing.metadata.snippet}
                      tag={writing.metadata.tag}
                    />
                  </Link>
                );
              })
            ) : (
              <p className="w-full justify-center text-center text-zinc-600 dark:text-zinc-400">
                No results for <strong>{title}</strong>. Try searching for{" "}
                <em>Design</em>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ preview = null }) {
  const data = await cosmic.objects
    .find({
      type: "writings",
    })
    .props(["id,slug,title,metadata,published_at", preview]);

  const writings = await data.objects;

  const converter = new showdown.Converter();
  const posts = await data.objects;
  const siteURL = "https://kejk.tech";
  const date = new Date();
  const author = {
    name: "Karl Emil James Koch",
    email: "karl@kejk.tech",
    link: "https://twitter.com/_kejk",
  };
  const feed = new Feed({
    title: "KEJK | Writing",
    description: "Thoughts on design, development and career progression",
    id: siteURL,
    link: siteURL,
    language: "en",
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Karl Emil James Koch`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/feed.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const text = post.metadata.content;
    const content = converter.makeHtml(text);
    const url = `${siteURL}/thoughts/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: post.id,
      link: url,
      description: post.metadata.snippet,
      image: post.metadata.hero.imgix_url,
      content: content,
      author: [author],
      contributor: [author],
      date: new Date(post.published_at),
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2(), { encoding: "utf-8" });

  return {
    props: {
      writings,
      preview,
    },
  };
}
