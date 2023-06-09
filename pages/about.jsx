import Head from "next/head";
import Link from "next/link";
import HeaderView from "../components/HeaderView";
import Markdown from "../components/Markdown";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import { RectangleStackIcon } from "@heroicons/react/20/solid";

const { createBucketClient } = require("@cosmicjs/sdk");

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

export default function About({ about, principles, allJobs }) {
  const metaTitle = "KEJK | About";
  const metaImage = `${about.metadata.meta.imgix_url}`;
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/about";

  const text = `This site, and all of my work, is dedicated to my hero, my
  inspiration, and the strongest man I've ever known. My father. I love
  you Dad.`;

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
      <div className="mx-auto w-full max-w-3xl">
        <div>
          <PageHeader>{about.title}</PageHeader>
          <Markdown content={about.metadata.content} />
        </div>
        <div className="mx-auto mt-8 flex w-full justify-center">
          <Button
            bgColor="bg-zinc-100 dark:bg-zinc-900"
            textColor="text-black dark:text-white"
            borderColor="border-zinc-200 dark:border-zinc-700"
            href="/uses"
          >
            <RectangleStackIcon width={20} height={20} className="mr-2" />
            My site stack
          </Button>
        </div>
        <HeaderView className="mt-16">Principles</HeaderView>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {principles.map((principle, idx) => {
            return (
              <div
                key={idx}
                className="rounded-md bg-zinc-50 p-3 dark:bg-zinc-900"
              >
                <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                  {principle.title}
                </span>
              </div>
            );
          })}
        </div>
        <HeaderView className="mt-16">Job history</HeaderView>
        <div className="mt-8 flex w-full flex-col gap-4">
          {allJobs.metadata.job.map((job, idx) => {
            return (
              <div key={idx} className="flex w-full items-center space-x-4">
                <span className="w-max whitespace-nowrap text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                  {job.company}
                  {job.url != null && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link cursor-pointer pl-2"
                    >
                      ⤴
                    </a>
                  )}
                </span>
                <hr className="my-auto w-full border-dashed border-zinc-300 dark:border-zinc-600" />
                <span className="flex w-max justify-end whitespace-nowrap text-right text-sm text-zinc-600 dark:text-zinc-400">
                  {job.date_range}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex w-full items-center justify-center px-4 pt-16">
          <p className="w-full rounded-xl bg-zinc-100 p-4 text-center text-black dark:bg-zinc-900 dark:text-white md:w-2/3">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await cosmic.objects
    .findOne({
      id: "641b3fa0d0ab1034f24698d2",
    })
    .props("title,metadata");

  const principlesData = await cosmic.objects
    .find({ type: "principles" })
    .props("title");

  const jobsData = await cosmic.objects
    .find({
      id: "641b3fa4d0ab1034f24698e6",
    })
    .props("metadata");

  const about = await data.object;
  const principles = await principlesData.objects;
  const allJobs = await jobsData.objects[0];

  return {
    props: {
      about,
      principles,
      allJobs,
    },
  };
}
