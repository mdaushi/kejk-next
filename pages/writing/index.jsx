import Head from "next/head";
import WritingCard from "../../components/WritingCard";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Writing({ writings }) {
  const metaTitle = "KEJK | Writing";
  return (
    <div className={"mt-12"}>
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="pb-4 text-4xl font-bold text-gray-700 dark:text-gray-200">
            Writing
          </h1>
          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
            {writings.map((writing) => {
              return (
                <WritingCard
                  key={writing.id}
                  link={writing.metadata.url}
                  title={writing.title}
                  subtitle={writing.metadata.snippet}
                />
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
      type: "writings",
      // slug: "writings",
    },
    props: "slug,title,metadata",
  });
  const writings = await data.objects;
  return {
    props: {
      writings,
    },
  };
}
