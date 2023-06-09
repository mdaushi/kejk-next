import Head from "next/head";
import Image from "next/image";
import PageHeader from "../components/PageHeader";
import classNames from "classnames";
import { ArrowLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import {
  ArrowDownIcon,
  HeartIcon as SolidHeartIcon,
  ArrowDownIcon as SolidArrowDownIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import TextButton from "../components/TextButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const { createBucketClient } = require("@cosmicjs/sdk");

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;
const WRITE_KEY = process.env.NEXT_PUBLIC_COSMIC_WRITE_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
  writeKey: WRITE_KEY,
});

const LazyPDF = ({ lazyPDF, stats }) => {
  let currentLikes = stats.metadata.likes;
  let currentDownloads = stats.metadata.downloads;
  const [likes, setLikes] = useState(currentLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [downloads, setDownloads] = useState(currentDownloads);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    cosmic.objects
      .updateOne("641b3f98d0ab1034f24698aa", {
        metadata: {
          likes: likes,
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [likes, isLiked]);

  useEffect(() => {
    cosmic.objects
      .updateOne("641b3f98d0ab1034f24698aa", {
        metadata: {
          downloads: downloads,
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [downloads, isDownloaded]);

  const metaTitle = "KEJK | Lazy PDF";
  const metaImage =
    "https://imgix.cosmicjs.com/483f5be0-94eb-11ec-96f2-43bdd99faa64-Lazy-PDF.png";
  const metaDescription =
    "Effortlessly create a PDF from a set of selected images through an interfaceless system with only the Finder selection UI.";
  const url = "https://kejk.tech/lazy-pdf";
  const downloadURL =
    "https://cdn.cosmicjs.com/27efc530-9722-11ec-8bb7-91577e4f4933-Lazy-PDF.zip";

  const router = useRouter();
  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const updateLikes = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikes(likes + 1);
    } else {
      setIsLiked(false);
      setLikes(likes - 1);
    }
  };

  const updateDownloads = () => {
    if (!isDownloaded) {
      setIsDownloaded(true);
      setDownloads(downloads + 1);
    } else {
      setIsDownloaded(false);
      setDownloads(downloads - 1);
    }
  };

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  return (
    <div className={"mx-auto mt-12 max-w-3xl"}>
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
        <div className="group mb-8 flex w-full justify-start">
          <Link legacyBehavior href={"#"}>
            <a className="" onClick={goBack}>
              <TextButton textColor="black" darkTextColor="white">
                <ArrowLeftIcon className="mr-2 h-4 w-4 flex-shrink-0 text-zinc-500 group-hover:text-lime-500 dark:text-zinc-400" />
                Go back
              </TextButton>
            </a>
          </Link>
        </div>
        <PageHeader>{lazyPDF.title}</PageHeader>
        <h2 className="mb-4 text-left text-2xl font-semibold text-zinc-700 dark:text-zinc-400 md:text-2xl">
          {lazyPDF.metadata.subtitle}
        </h2>
        <div className="h-auto w-full max-w-3xl">
          <Image
            className="rounded-md"
            src={lazyPDF.metadata.hero?.imgix_url}
            width={1000}
            height={700}
            quality={100}
            placeholder="blur"
            blurDataURL={`${lazyPDF.metadata.hero?.imgix_url}?auto=format,compress&q=1&blur=500&w=2`}
            alt="Image of the app icon"
            priority
          />
        </div>
        <div className="mt-12 flex w-full items-center justify-between gap-2">
          <div className="flex flex-col space-y-4">
            <div
              className="flex w-full flex-col gap-2 md:w-2/3"
              dangerouslySetInnerHTML={{ __html: lazyPDF.metadata.subheader }}
            />
            <a
              href={downloadURL}
              download
              className=""
              onClick={updateDownloads}
            >
              <button
                className={classNames(
                  `mb-4 flex items-center justify-center space-x-2 rounded-md border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-semibold text-black transition ease-in-out hover:border-lime-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white md:w-max md:text-base`
                )}
                id="downloads"
              >
                <ArrowDownIcon className="mr-2 h-4 w-4 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
                Download
              </button>
            </a>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div
                className="flex w-max items-center justify-center rounded-full border border-lime-300 bg-lime-50 px-3 py-1 font-mono text-xs font-normal uppercase leading-tight text-lime-700 hover:cursor-pointer dark:border-lime-900 dark:bg-lime-900/30 dark:text-lime-300"
                onClick={updateDownloads}
              >
                {!isDownloaded ? (
                  <ArrowDownIcon className="mr-2 h-3 w-3 text-lime-700  dark:text-lime-300" />
                ) : (
                  <SolidArrowDownIcon className="mr-2 h-3 w-3 text-lime-700  dark:text-lime-300" />
                )}
                {kFormatter(downloads)}
              </div>
              <div
                className="flex w-max items-center justify-center rounded-full border border-pink-200 bg-pink-50 px-3 py-1 font-mono text-xs font-normal uppercase leading-tight text-pink-700 hover:cursor-pointer dark:border-pink-900 dark:bg-pink-900/30 dark:text-pink-200"
                onClick={updateLikes}
              >
                {!isLiked ? (
                  <HeartIcon className="mr-2 h-3 w-3 text-pink-700  dark:text-pink-200" />
                ) : (
                  <SolidHeartIcon className="mr-2 h-3 w-3 text-pink-700  dark:text-pink-200" />
                )}
                {kFormatter(likes)}
              </div>
            </div>
            <div className="w-max">
              <Image
                className="rounded-[28px]"
                width={150}
                height={150}
                src={lazyPDF.metadata.icon?.imgix_url}
                alt="Image of the app icon"
                quality={100}
              />
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: lazyPDF.content }} />
        <div className="mt-12 inline-flex w-full justify-center">
          <a href={downloadURL} download className="" onClick={updateDownloads}>
            <button
              className={classNames(
                `mb-4 flex items-center justify-center space-x-2 rounded-md border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-semibold text-black transition ease-in-out hover:border-lime-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white md:w-max md:text-base`
              )}
              id="downloads"
            >
              <ArrowDownIcon className="mr-2 h-4 w-4 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
              Download
            </button>
          </a>
        </div>
        <a
          rel="me"
          href="https://mastodon.design/@kejk"
          className="cursor-none opacity-0"
        >
          Mastodon
        </a>
      </div>
    </div>
  );
};

export default LazyPDF;

export async function getStaticProps() {
  const data = await cosmic.objects
    .findOne({
      id: "641b3faed0ab1034f2469919",
    })
    .props("title,content,metadata");

  const getStats = await cosmic.objects
    .findOne({
      id: "641b3f98d0ab1034f24698aa",
    })
    .props("title,metadata");

  const stats = await getStats.object;

  const lazyPDF = await data.object;
  return {
    props: {
      lazyPDF,
      stats,
    },
  };
}
