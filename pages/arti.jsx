import Head from "next/head";
import Image from "next/image";
import classNames from "classnames";
import PageHeader from "../components/PageHeader";
import { ArrowDownIcon, ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TextButton from "../components/TextButton";
import Markdown from "../components/Markdown";
import { useRouter } from "next/router";

const { createBucketClient } = require("@cosmicjs/sdk");

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

export default function Arti({ arti }) {
  const metaTitle = "KEJK | Arti";
  const metaImage =
    "https://imgix.cosmicjs.com/9bcfeeb0-8cdd-11ed-bac9-7fe1734a16aa-prompt-ai.png";
  const metaDescription = "Interface directly with the OpenAI beta, natively.";
  const url = "https://kejk.tech/prompt-ai";
  const downloadURL = "https://apps.apple.com/us/app/promptai/id1659936985";

  const router = useRouter();
  const goBack = (e) => {
    e.preventDefault();
    router.back();
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
          <Link href={"#"} onClick={goBack}>
            <TextButton textColor="black" darkTextColor="white">
              <ArrowLongLeftIcon className="mr-2 h-6 w-6 flex-shrink-0 text-neutral-500 group-hover:text-teal-500 dark:text-neutral-400" />
              Go back
            </TextButton>
          </Link>
        </div>
        <PageHeader>{arti.title}</PageHeader>
        <h2 className="mb-4 text-left text-2xl font-medium text-neutral-700 dark:text-neutral-400 md:text-2xl">
          {arti.metadata.subtitle}
        </h2>
        <div className="h-auto w-full max-w-3xl">
          <Image
            className="rounded-md"
            src={arti.metadata.hero?.imgix_url}
            width={1000}
            height={700}
            quality={100}
            placeholder="blur"
            blurDataURL={`${arti.metadata.hero?.imgix_url}?auto=format,compress&q=1&blur=500&w=2`}
            alt="Image of the app icon"
            priority
          />
        </div>
        <div className="mt-12 flex w-full items-center justify-between gap-2">
          <div className="flex flex-col space-y-4">
            <div className="flex w-full flex-col gap-2 md:w-2/3">
              <Markdown content={arti.metadata.subheader} />
            </div>
            <a href={downloadURL} download className="">
              <button
                className={classNames(
                  `mb-4 flex items-center justify-center space-x-2 rounded-md border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-black transition ease-in-out hover:border-teal-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white md:w-max md:text-base`
                )}
              >
                <ArrowDownIcon className="mr-2 h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
                Download
              </button>
            </a>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-max">
              <Image
                className="rounded-[28px]"
                width={150}
                height={150}
                src={arti.metadata.icon?.imgix_url}
                alt="Image of the app icon"
                quality={100}
              />
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: arti.content }} />
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
}

export async function getStaticProps() {
  const data = await cosmic.objects
    .findOne({
      type: "arti",
      id: "641b3f98d0ab1034f24698a9",
    })
    .props("title,content,metadata");

  const arti = await data.object;

  return {
    props: {
      arti,
    },
  };
}
