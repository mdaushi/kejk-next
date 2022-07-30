import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import { MailIcon, UserIcon } from "@heroicons/react/outline";
import Markdown from "../components/Markdown";
import WritingCard from "../components/WritingCard";
import AppCard from "../components/AppCard";
import HeaderView from "../components/HeaderView";
import FeatureCard from "../components/FeatureCard";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Home({ home, writings, apps, albums, features }) {
  const metaTitle = "KEJK | Home";
  return (
    <div
      className={"mx-auto flex max-w-5xl flex-col items-center justify-center"}
    >
      <Head>
        <title>{metaTitle}</title>
        <meta
          name="description"
          content="Designer, developer, writer and musician"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-12 md:mt-0">
        <div className="text-left md:mx-auto md:max-w-xl md:justify-center md:text-center">
          <p className="mb-1 font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Karl Emil James Koch
          </p>
          <h1 className="pb-4 text-4xl font-bold text-gray-700 dark:text-gray-200">
            {home.title}
          </h1>
          <Markdown content={home.metadata.content} className="-mt-8" />
        </div>
        <div className="mx-auto mt-8 flex w-full justify-center space-x-4">
          <Button
            bgColor="neutral-100"
            textColor="black"
            borderColor="neutral-200"
            darkBgColor="neutral-800"
            darkTextColor="white"
            darkBorderColor="neutral-700"
          >
            <MailIcon width={24} height={24} />
            <a href="mailto:karl@kejk.tech?subject=Let's chat!">Chat to me</a>
          </Button>
          <Button
            bgColor="neutral-100"
            textColor="black"
            borderColor="neutral-200"
            darkBgColor="neutral-800"
            darkTextColor="white"
            darkBorderColor="neutral-700"
          >
            <UserIcon width={24} height={24} />
            <Link href={"/about"}>
              <a>More about me</a>
            </Link>
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
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
        <HeaderView className="mt-16">Apps and projects</HeaderView>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {apps.map((app) => {
            return (
              <AppCard
                key={app.id}
                link={app.metadata.url}
                image={app.metadata.cover.imgix_url}
                title={app.title}
                subtitle={app.metadata.subtitle}
              />
            );
          })}
        </div>
        <HeaderView className="mt-16">Features</HeaderView>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => {
            return (
              <FeatureCard
                key={feature.id}
                link={feature.metadata.url}
                title={feature.title}
                type={feature.metadata.type}
              />
            );
          })}
        </div>
        <HeaderView className="mt-16">Albums</HeaderView>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {albums.map((album) => {
            return (
              <AppCard
                key={album.id}
                link={album.metadata.url}
                image={album.metadata.cover.imgix_url}
                title={album.title}
                subtitle={album.metadata.subtitle}
              />
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
      type: "home",
      slug: "home",
    },
    props: "title,metadata",
  });

  const writingData = await bucket.getObjects({
    limit: 3,
    query: {
      type: "writings",
    },
    props: "slug,title,metadata",
  });

  const projectData = await bucket.getObjects({
    limit: 3,
    query: {
      type: "apps",
    },
    props: "title,content,metadata",
  });

  const albumData = await bucket.getObjects({
    limit: 3,
    query: {
      type: "albums",
    },
    props: "title,content,metadata",
  });

  const featureData = await bucket.getObjects({
    limit: 3,
    query: {
      type: "features",
    },
    props: "slug,title,metadata",
  });

  const home = await data.objects[0];
  const writings = await writingData.objects;
  const apps = await projectData.objects;
  const albums = await albumData.objects;
  const features = await featureData.objects;

  return {
    props: {
      home,
      writings,
      apps,
      albums,
      features,
    },
  };
}
