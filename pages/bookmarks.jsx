import Head from "next/head";
import PageHeader from "../components/PageHeader";
import BookmarkCard from "../components/BookmarkCard";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchInput from "../components/SearchInput";

const { createBucketClient } = require("@cosmicjs/sdk");

const BOOKMARKS_SLUG = process.env.NEXT_PUBLIC_BOOKMARKS_SLUG;
const BOOKMARKS_READ_KEY = process.env.NEXT_PUBLIC_BOOKMARKS_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BOOKMARKS_SLUG,
  readKey: BOOKMARKS_READ_KEY,
});

export default function Bookmark({ bookmarks }) {
  // the value of the search field
  const [title, setTitle] = useState("");

  // the search result
  const [foundBookmarks, setFoundBookmarks] = useState(bookmarks);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = bookmarks.filter((bookmark) => {
        return (
          bookmark.title.toLowerCase().includes(keyword.toLowerCase()) ||
          bookmark.metadata.snippet
            .toLowerCase()
            .includes(keyword.toLowerCase())
        );
      });
      setFoundBookmarks(results);
    } else {
      setFoundBookmarks(bookmarks);
    }

    setTitle(keyword);
  };

  const router = useRouter();
  if (!router.isFallback && !bookmarks?.length) {
    return;
  }

  const regex = /.*https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/|\/.*$/gm;

  const metaTitle = "KEJK | Bookmarks";
  const metaImage =
    "https://imgix.cosmicjs.com/e6ba0300-d555-11ed-9cfc-8fe1cfdcf0b7-meta-bookmarks.png";
  const metaDescription = "A collection of Karl's bookmarks";
  const url = "https://kejk.tech/bookmarks";

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
          <PageHeader>Bookmarks</PageHeader>
          <SearchInput
            value={title}
            onChange={filter}
            placeholder={"Search bookmarks"}
            width={"w-full md:w-1/2"}
          />
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {foundBookmarks &&
            foundBookmarks?.length > 0 &&
            foundBookmarks !== null ? (
              foundBookmarks.map((bookmark, idx) => {
                const trimmedURL = bookmark.metadata.url.replace(regex, "");
                return (
                  <a
                    key={idx}
                    href={`${bookmark.metadata.url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BookmarkCard
                      title={bookmark.title}
                      subtitle={bookmark.metadata.snippet}
                      date={bookmark.metadata.published}
                      url={trimmedURL}
                    />
                  </a>
                );
              })
            ) : (
              <p className="w-full justify-center text-center text-zinc-600 dark:text-zinc-400">
                No results for <strong>{title}</strong>. Try searching for{" "}
                <em>Code</em>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await cosmic.objects
    .find({
      type: "bookmarks",
    })
    .props("id,slug,title,metadata,created_at")
    .limit(42)
    .sort("-created_at");

  const bookmarks = await data.objects;

  return {
    props: {
      bookmarks,
    },
    revalidate: 10,
  };
}
