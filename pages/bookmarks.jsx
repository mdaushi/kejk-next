import Head from "next/head";
import PageHeader from "../components/PageHeader";
import BookmarkCard from "../components/BookmarkCard";
import { useRouter } from "next/router";
import { useState } from "react";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = "kemiljk";
const READ_KEY = "uNXYQDbNTCWQyEaFjq44PUolieGKBuzePTaEdnDl0CHLcnJtPK";

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
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
    "https://imgix.cosmicjs.com/d71255b0-10ed-11ed-b476-13ceb56f12f2-image.png";
  const metaDescription = "Designer, developer, writer and musician";
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
      <main>
        {router.isFallback ? (
          <PageHeader>Loading...</PageHeader>
        ) : (
          <div className="mx-auto w-full max-w-5xl">
            <PageHeader>Bookmarks</PageHeader>
            <input
              type="search"
              value={title}
              onChange={filter}
              className="mt-4 p-2 rounded-md w-full md:w-1/2 bg-gray-100 dark:bg-neutral-800 focus:outline-none focus:outline focus:outline-teal-500 text-neutral-900 dark:text-neutral-300"
              placeholder="Search for posts"
            />
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {foundBookmarks && foundBookmarks.length > 0 ? (
                foundBookmarks.map((bookmark) => {
                  const trimmedURL = bookmark.metadata.url.replace(regex, "");
                  return (
                    <a
                      key={bookmark.id}
                      href={`${bookmark.metadata.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="unstyled"
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
                <h1>No results</h1>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "bookmarks",
    },
    props: "id,slug,title,metadata,created_at",
    limit: 50,
    sort: "-created_at",
  });

  const bookmarks = await data.objects;

  return {
    props: {
      bookmarks,
    },
    revalidate: 3600,
  };
}
