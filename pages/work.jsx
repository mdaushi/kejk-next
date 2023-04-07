import Head from "next/head";
import PageHeader from "../components/PageHeader";
import WorkCard from "../components/WorkCard";

const { createBucketClient } = require("@cosmicjs/sdk");

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

export default function Work({ works }) {
  const metaTitle = "KEJK | Work";
  const metaImage =
    "https://imgix.cosmicjs.com/e6c68620-d555-11ed-9cfc-8fe1cfdcf0b7-meta-projects.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/work";

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
            <PageHeader>Work</PageHeader>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {works.map((work, idx) => (
              <WorkCard
                key={idx}
                link={`/work/${work.slug}`}
                image={work.metadata?.hero.imgix_url}
                title={work.title}
                subtitle={work.metadata?.description}
                year={work.metadata?.year}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await cosmic.objects
    .find({
      type: "works",
    })
    .props("id,slug,title,metadata,published_at");

  const works = await data.objects;

  return {
    props: {
      works,
    },
  };
}
