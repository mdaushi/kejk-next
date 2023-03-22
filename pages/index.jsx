import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import {
  EnvelopeIcon,
  UserIcon,
  PencilIcon,
  SquaresPlusIcon,
  FlagIcon,
  MusicalNoteIcon,
  BookmarkIcon,
} from "@heroicons/react/20/solid";
import Markdown from "../components/Markdown";
import WritingCard from "../components/WritingCard";
import AppCard from "../components/AppCard";
import FeatureCard from "../components/FeatureCard";
import AllCapsHeader from "../components/AllCapsHeader";
import HomeHeader from "../components/HomeHeader";
import SocialLink from "../components/SocialLink";
import Cosmic from "cosmicjs";

const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const BOOKMARKS_SLUG = process.env.NEXT_PUBLIC_BOOKMARKS_SLUG;
const BOOKMARKS_READ_KEY = process.env.NEXT_PUBLIC_BOOKMARKS_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

const bookmarksBucket = api.bucket({
  slug: BOOKMARKS_SLUG,
  read_key: BOOKMARKS_READ_KEY,
});

export default function Home({
  home,
  writings,
  apps,
  albums,
  features,
  bookmarks,
  socials,
}) {
  const metaTitle = "KEJK | Home";
  const metaImage =
    "https://imgix.cosmicjs.com/27bc5e70-ba80-11ed-9435-5306e8ef93bc-image.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech";

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center">
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="KEJK | Writing"
          href="/rss.xml"
        />
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

      <div className="mt-12 md:mt-0">
        <div className="flex w-full flex-col text-left md:mx-auto md:max-w-xl md:justify-center md:text-center">
          <AllCapsHeader
            marginTop={0}
            justify={"justify-start md:justify-center"}
          >
            Karl Emil James Koch
          </AllCapsHeader>
          <HomeHeader>{home.title}</HomeHeader>
          <Markdown content={home.metadata.content} className="-mt-4" />
        </div>
        <div className="mx-auto mt-8 flex w-full justify-center space-x-4">
          <Link href="mailto:karl@kejk.tech?subject=Let's chat!">
            <Button
              bgColor="bg-neutral-100 dark:bg-neutral-800"
              textColor="text-black dark:text-white"
              borderColor="border-neutral-200 dark:border-neutral-700"
            >
              <EnvelopeIcon width={20} height={20} className="mr-2" />
              Chat to me
            </Button>
          </Link>
          <Link href={"/about"}>
            <Button
              bgColor="bg-neutral-100 dark:bg-neutral-800"
              textColor="text-black dark:text-white"
              borderColor="border-neutral-200 dark:border-neutral-700"
            >
              <UserIcon width={20} height={20} className="mr-2" />
              More about me
            </Button>
          </Link>
        </div>
        <AllCapsHeader
          marginTop={16}
          justify={"justify-start"}
          className="items-end"
        >
          <PencilIcon className="mr-2 h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
          Writing
        </AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-3">
          {writings.map((writing, idx) => {
            return (
              <Link key={idx} href={`/thoughts/${writing.slug}`}>
                <WritingCard
                  title={writing.title}
                  subtitle={writing.metadata.snippet}
                  tag={writing.metadata.tag}
                />
              </Link>
            );
          })}
        </div>
        <div className="mx-auto mt-8 flex w-full justify-center">
          <Link href={"/thoughts"}>
            <Button
              bgColor="bg-neutral-100 dark:bg-neutral-800"
              textColor="text-black dark:text-white"
            >
              More thoughts
              <ArrowLongRightIcon className="ml-2 h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
            </Button>
          </Link>
        </div>
        <AllCapsHeader marginTop={16} justify={"justify-start"}>
          <SquaresPlusIcon className="mr-2 h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
          Apps and projects
        </AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
          {apps.map((app, idx) => {
            return (
              <AppCard
                key={idx}
                link={app.metadata.url}
                image={app.metadata.cover.imgix_url}
                title={app.title}
                subtitle={app.metadata.subtitle}
              />
            );
          })}
        </div>
        <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <Link href={"/playground"}>
            <Button
              bgColor="bg-neutral-100 dark:bg-neutral-800"
              textColor="text-black dark:text-white"
            >
              Playground
              <ArrowLongRightIcon className="ml-2 h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
            </Button>
          </Link>
          <Link href={"/projects"}>
            <Button
              bgColor="bg-neutral-100 dark:bg-neutral-800"
              textColor="text-black dark:text-white"
            >
              Client projects
              <ArrowLongRightIcon className="ml-2 h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
            </Button>
          </Link>
        </div>
        <AllCapsHeader marginTop={16} justify={"justify-start"}>
          <FlagIcon className="mr-2 h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
          Recent features
        </AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, idx) => {
            return (
              <FeatureCard
                key={idx}
                link={feature.metadata.url}
                title={feature.title}
                type={feature.metadata.type}
              />
            );
          })}
        </div>
        <div className="mx-auto mt-8 flex w-full justify-center">
          <Link href={"/features"}>
            <Button
              bgColor="bg-neutral-100 dark:bg-neutral-800"
              textColor="text-black dark:text-white"
            >
              All features
              <ArrowLongRightIcon className="ml-2 h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
            </Button>
          </Link>
        </div>
        <AllCapsHeader marginTop={16} justify={"justify-start"}>
          <MusicalNoteIcon className="mr-2 h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
          Releases
        </AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
          {albums.map((album, idx) => {
            return (
              <AppCard
                key={idx}
                link={album.metadata.url}
                image={album.metadata.cover.imgix_url}
                title={album.title}
                subtitle={album.metadata.subtitle}
              />
            );
          })}
        </div>
        <AllCapsHeader marginTop={16} justify={"justify-start"}>
          <BookmarkIcon className="mr-2 h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
          Bookmarks
        </AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-3">
          {bookmarks.map((bookmark, idx) => {
            return (
              <a
                key={idx}
                href={`${bookmark.metadata.url}`}
                target="_blank"
                rel="noreferrer"
                className=""
              >
                <WritingCard
                  title={bookmark.title}
                  subtitle={bookmark.metadata.snippet}
                />
              </a>
            );
          })}
        </div>
        <div className="mx-auto mt-8 flex w-full justify-center">
          <Link href={"/bookmarks"}>
            <Button
              bgColor="bg-neutral-100 dark:bg-neutral-800"
              textColor="text-black dark:text-white"
            >
              All bookmarks
              <ArrowLongRightIcon className="ml-2 h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
            </Button>
          </Link>
        </div>
        <div className="mt-8 grid w-full grid-cols-3 items-center justify-between gap-4 md:mt-16 md:flex md:grid-cols-none md:justify-center md:gap-8">
          {socials.map((social, idx) => {
            return (
              <SocialLink
                key={idx}
                href={social.metadata.url}
                title={social.title}
              />
            );
          })}
          <SocialLink href="/rss/feed.xml" title="RSS" />
          <SocialLink
            href="https://plausible.io/data-policy"
            title="Privacy and Data Policy"
          />
          <a
            rel="me"
            href="https://mastodon.design/@kejk"
            className="cursor-none opacity-0"
          >
            Mastodon
          </a>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const homeData = await bucket.getObjects({
    query: {
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
    sort: "-created_at",
  });

  const bookmarkData = await bookmarksBucket.getObjects({
    limit: 3,
    query: {
      type: "bookmarks",
    },
    props: "slug,title,metadata,created_at",
    sort: "-created_at",
  });

  const socialData = await bucket.getObjects({
    limit: 4,
    query: {
      type: "socials",
    },
    props: "title,metadata",
  });

  const home = await homeData.objects[0];
  const writings = await writingData.objects;
  const apps = await projectData.objects;
  const albums = await albumData.objects;
  const features = await featureData.objects;
  const bookmarks = await bookmarkData.objects;
  const socials = await socialData.objects;

  return {
    props: {
      home,
      writings,
      apps,
      albums,
      features,
      bookmarks,
      socials,
    },
    revalidate: 10,
  };
}
