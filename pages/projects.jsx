import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";
import AllCapsHeader from "../components/AllCapsHeader";
import AppCard from "../components/AppCard";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Projects({ clients }) {
  const metaTitle = "KEJK | Projects";
  const metaImage =
    "https://imgix.cosmicjs.com/49f4beb0-ba80-11ed-9435-5306e8ef93bc-meta-projects.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/projects";

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
        <PageHeader>Projects</PageHeader>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
          {clients.map((client, idx) => {
            return (
              <AppCard
                key={idx}
                link={client.metadata.url}
                image={client.metadata.cover?.imgix_url}
                title={client.title}
                subtitle={client.metadata.subtitle}
                tags={client.metadata.tags}
              />
            );
          })}
        </div>
        <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center space-y-4 md:mt-16 md:flex-row md:space-x-4 md:space-y-0">
          <Link href="/work">
            <Button
              bgColor="bg-neutral-100 dark:bg-neutral-900"
              textColor="text-black dark:text-white"
              borderColor="border-neutral-200 dark:border-neutral-700"
            >
              View my in-house work
              <ArrowRightIcon className="ml-2" width={20} height={20} />
            </Button>
          </Link>
          <Button
            bgColor="bg-neutral-100 dark:bg-neutral-900"
            textColor="text-black dark:text-white"
            borderColor="border-neutral-200 dark:border-neutral-700"
            href="mailto:karl@kejk.tech?subject=Let's work together!"
          >
            <EnvelopeIcon className="mr-2" width={20} height={20} />
            Work with me
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const freelancesData = await bucket.getObjects({
    query: {
      type: "freelances",
    },
    props: "id,title,metadata",
    sort: "-created_at",
  });

  const clients = await freelancesData.objects;
  return {
    props: {
      clients,
    },
  };
}
