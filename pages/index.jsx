import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
import { ArrowSmRightIcon, MailIcon, UserIcon } from "@heroicons/react/outline";
import Markdown from "../components/Markdown";
import WritingCard from "../components/WritingCard";
import AppCard from "../components/AppCard";
import HeaderView from "../components/HeaderView";
import FeatureCard from "../components/FeatureCard";
import AllCapsHeader from "../components/AllCapsHeader";
import PageHeader from "../components/PageHeader";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Home({
  home,
  writings,
  apps,
  albums,
  features,
  bookmarks,
}) {
  const metaTitle = "KEJK | Home";
  const metaImage =
    "https://imgix.cosmicjs.com/aa1741b0-9c8f-11ec-b20b-ad2fdaf5e1bc-2022meta.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech";

  return (
    <div
      className={"mx-auto flex max-w-5xl flex-col items-center justify-center"}
    >
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

      <main className="mt-12 md:mt-0">
        <div className="text-left md:mx-auto md:max-w-xl md:justify-center md:text-center">
          <AllCapsHeader>Karl Emil James Koch</AllCapsHeader>
          <PageHeader>{home.title}</PageHeader>
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
          href="mailto:karl@kejk.tech?subject=Let's chat!"
          >
            <MailIcon width={24} height={24} />
            Chat to me
          </Button>
          <Button
            bgColor="neutral-100"
            textColor="black"
            borderColor="neutral-200"
            darkBgColor="neutral-800"
            darkTextColor="white"
            darkBorderColor="neutral-700"
            href="/about"
          >
            <UserIcon width={24} height={24} />
            <Link href={"/about"}>
              More about me
            </Link>
          </Button>
        </div>
        <AllCapsHeader marginTop={16}>Writing</AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-3">
          {writings.map((writing) => {
            return (
              <Link key={writing.id} href={`/thoughts/${writing.slug}`}>
                <a>
                  <WritingCard
                    title={writing.title}
                    subtitle={writing.metadata.snippet}
                  />
                </a>
              </Link>
            );
          })}
        </div>
        <div className="mt-8">
          <Button
            bgColor="neutral-100"
            textColor="black"
            borderColor="neutral-200"
            darkBgColor="neutral-800"
            darkTextColor="white"
            darkBorderColor="neutral-700"
            href="/writing"
          >
            <Link href={"/writing"}>
               More thoughts
            </Link>
            <ArrowSmRightIcon className="h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
          </Button>
        </div>
        <AllCapsHeader marginTop={16}>Apps and projects</AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
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
        <AllCapsHeader marginTop={16}>Recent features</AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-3">
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
        <AllCapsHeader marginTop={16}>Albums</AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
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
        <AllCapsHeader marginTop={16}>Bookmarks</AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-3">
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
        <div className="mt-8">
          <Button
            bgColor="neutral-100"
            textColor="black"
            borderColor="neutral-200"
            darkBgColor="neutral-800"
            darkTextColor="white"
            darkBorderColor="neutral-700"
            href="/bookmarks"
          >
            <Link href={"/bookmarks"}>
              All bookmarks
            </Link>
            <ArrowSmRightIcon className="h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
          </Button>
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

  const bookmarkData = await bucket.getObjects({
    limit: 3,
    query: {
      type: "bookmarks",
    },
    props: "slug,title,metadata",
  });

  const home = await data.objects[0];
  const writings = await writingData.objects;
  const apps = await projectData.objects;
  const albums = await albumData.objects;
  const features = await featureData.objects;
  const bookmarks = await bookmarkData.objects;

  return {
    props: {
      home,
      writings,
      apps,
      albums,
      features,
      bookmarks,
    },
  };
}
