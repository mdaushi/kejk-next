import Head from "next/head";
import AppCard from "../components/AppCard";
import PageHeader from "../components/PageHeader";

const { createBucketClient } = require("@cosmicjs/sdk");

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

export default function Playground({ apps, utilities, clients }) {
  const metaTitle = "KEJK | Playground";
  const metaImage =
    "https://imgix.cosmicjs.com/49f4beb0-ba80-11ed-9435-5306e8ef93bc-meta-projects.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/playground";

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
        <PageHeader>Playground</PageHeader>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
          {apps.map((app, idx) => {
            return (
              <AppCard
                key={idx}
                link={app.metadata.url}
                image={app.metadata.cover?.imgix_url}
                title={app.title}
                subtitle={app.metadata.subtitle}
              />
            );
          })}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {utilities.map((utility, idx) => {
            return (
              <AppCard
                key={idx}
                link={utility.metadata.url}
                image={utility.metadata.cover?.imgix_url}
                title={utility.title}
                subtitle={utility.metadata.subtitle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await cosmic.objects
    .find({
      type: "apps",
    })
    .props("id,title,metadata");

  const utilitiesData = await cosmic.objects
    .find({
      type: "utilities",
    })
    .props("id,title,metadata");

  const freelancesData = await cosmic.objects
    .find({
      type: "freelances",
    })
    .props("id,title,metadata");

  const apps = await data.objects;
  const utilities = await utilitiesData.objects;
  const clients = await freelancesData.objects;
  return {
    props: {
      apps,
      utilities,
      clients,
    },
  };
}
