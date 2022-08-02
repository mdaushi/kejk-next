import Head from "next/head";
import PageHeader from "../components/PageHeader";
import WritingCard from "../components/WritingCard";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Bookmark({ bookmarks }) {
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
        <div className="mx-auto w-full max-w-5xl">
          <PageHeader>Bookmarks</PageHeader>
          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
            {bookmarks.map((bookmark) => {
              return (
                <a
                  key={bookmark.id}
                  href={`${bookmark.metadata.url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WritingCard
                    title={bookmark.title}
                    subtitle={bookmark.metadata.snippet}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "bookmarks",
    },
    props: "id,slug,title,metadata,published_at",
    limit: 50,
  });

  const bookmarks = await data.objects;

  return {
    props: {
      bookmarks,
    },
  };
}
