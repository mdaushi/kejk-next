import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import {
  ArrowLongLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Prism from "prismjs";
import "prismjs/components/prism-json.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-regex.min";
import Moment from "react-moment";
import AllCapsHeader from "../../components/AllCapsHeader";
import Markdown from "../../components/Markdown";
import PageHeader from "../../components/PageHeader";
import Tag from "../../components/Tag";
import TextButton from "../../components/TextButton";
import WritingCard from "../../components/WritingCard";
import AlertPreview from "../../components/AlertPreview";

const { createBucketClient } = require("@cosmicjs/sdk");

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

export default function Post({ allPosts, post }) {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return;
  }

  const metaTitle = `KEJK | ${post?.title}`;
  const postTitle = post?.title.replaceAll(" ", "%20");
  const metaImage = `https://kejk.tech/api/og?title=${postTitle}`;
  const metaDescription = "Designer, developer, writer and musician";
  const url = `https://kejk.tech/${post?.slug}`;

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
      <div className="mx-auto max-w-3xl">
        {router.isFallback ? (
          <PageHeader>Loading...</PageHeader>
        ) : (
          <>
            <div className="group mb-8 flex w-full justify-start">
              {post.status === "draft" ? (
                <AlertPreview preview={true} />
              ) : undefined}
              <Link href={"/thoughts"}>
                <TextButton textColor="black" darkTextColor="white">
                  <ArrowLongLeftIcon className="mr-2 h-6 w-6 flex-shrink-0 text-neutral-500 group-hover:text-teal-500 dark:text-neutral-400" />
                  All thoughts
                </TextButton>
              </Link>
            </div>
            <article>
              <div className="flex flex-row items-center justify-center">
                <AllCapsHeader marginTop={0} justify={"justify-start"}>
                  Last updated:&nbsp;<Moment fromNow>{post.modified_at}</Moment>
                </AllCapsHeader>
                {post.metadata.tag !== undefined && (
                  <div className="pb-4 md:mb-1">
                    <Tag>{post.metadata.tag}</Tag>
                  </div>
                )}
              </div>
              <PageHeader>{post.title}</PageHeader>
              <Markdown content={post.metadata.content} />
              <AllCapsHeader marginTop={16} justify={"justify-start"}>
                First published:&nbsp;<Moment fromNow>{post.created_at}</Moment>
              </AllCapsHeader>
            </article>
          </>
        )}
        <Toast.Provider
          swipeDirection="right"
          className="mt-12 flex w-full justify-center"
        >
          <button
            className={classNames(
              `mb-4 flex items-center justify-center space-x-2 rounded-md border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-black transition ease-in-out hover:border-teal-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white md:w-max md:text-base`
            )}
            onClick={() => {
              setOpen(false);
              window.clearTimeout(timerRef.current);
              timerRef.current = window.setTimeout(() => {
                setOpen(true);
              }, 100);
            }}
          >
            <span className="w-max text-neutral-500 dark:text-neutral-400">
              Copy link to clipboard
            </span>
          </button>
          <Toast.Root
            open={open}
            onOpenChange={setOpen}
            className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-100 p-4 shadow-lg data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:border-neutral-700 dark:bg-neutral-900"
          >
            <Toast.Title className="flex items-center text-black dark:text-white">
              <CheckCircleIcon className="mr-2 h-6 w-6 flex-shrink-0 text-teal-500 dark:text-teal-400" />
              Copied to clipboard!
            </Toast.Title>
            <Toast.Description
              asChild
            >
            <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 leading-tight pt-1">
              {"https://www.kejk.tech/thoughts/" + post?.slug}
              </span>
            </Toast.Description>
          </Toast.Root>
          <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[12px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_24px]" />
        </Toast.Provider>
        <hr className="my-4 border-neutral-300 dark:border-neutral-700" />
        <AllCapsHeader marginTop={0} justify={"justify-start"}>
          More to explore
        </AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2">
          {allPosts !== undefined &&
            allPosts
              .filter((nextPost) => nextPost?.id !== post?.id)
              .map((nextPost, idx) => (
                <Link key={idx} href={`/thoughts/${nextPost?.slug}`}>
                  <WritingCard
                    title={nextPost.title}
                    subtitle={nextPost.metadata.snippet}
                  />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const data = await cosmic.objects
    .findOne({
      type: "writings",
      slug: params.slug,
    })
    .status("any")
    .props(["id,slug,title,metadata,modified_at,created_at", preview]);

  const post = await data.object;

  const allWritingData = await cosmic.objects
    .find({
      type: "writings",
    })
    .props("id,slug,title,metadata")
    .limit(4);

  const allPosts = await allWritingData.objects;

  return {
    props: { post, allPosts, preview },
  };
}

export async function getStaticPaths() {
  const data = await cosmic.objects
    .find({
      type: "writings",
    })
    .props("id,slug,title,metadata");

  const allPosts = await data.objects;

  return {
    paths: allPosts.map((post) => `/thoughts/${post.slug}`),
    fallback: true,
  };
}
