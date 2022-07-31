import Head from "next/head";
import Link from "next/link";
import HeaderView from "../components/HeaderView";
import Markdown from "../components/Markdown";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import { CollectionIcon } from "@heroicons/react/outline";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function About({ about, principles }) {
  const metaTitle = "KEJK | About";
  return (
    <div className={"mt-12"}>
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto w-full max-w-5xl">
        <div>
          <PageHeader>{about.title}</PageHeader>
          <Markdown content={about.metadata.content} />
        </div>
        <div className="mx-auto mt-8 flex w-full justify-center">
          <Button
            bgColor="neutral-100"
            textColor="black"
            borderColor="neutral-200"
            darkBgColor="neutral-800"
            darkTextColor="white"
            darkBorderColor="neutral-700"
          >
            <CollectionIcon width={24} height={24} />
            <Link href="/uses">
              <a>My site stack</a>
            </Link>
          </Button>
        </div>
        <HeaderView className="mt-16">Principles</HeaderView>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {principles.map((principle, idx) => {
            return (
              <div
                key={idx}
                className="rounded bg-neutral-50 p-3 dark:bg-neutral-900"
              >
                <span className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
                  {principle.title}
                </span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "about",
      slug: "about",
    },
    props: "title,content,metadata",
  });

  const principlesData = await bucket.getObjects({
    query: {
      type: "principles",
    },
    props: "title",
  });

  const about = await data.objects[0];
  const principles = await principlesData.objects;
  return {
    props: {
      about,
      principles,
    },
  };
}
