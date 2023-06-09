import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import {
  RssIcon,
  SparklesIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import Button from "../../components/Button";
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
import Mori from "next/font/local";

const sans = Mori({
  src: [
    {
      path: "../../fonts/PPMori-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/PPMori-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/PPMori-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/PPMori-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../fonts/PPMori-ExtraBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

const { createBucketClient } = require("@cosmicjs/sdk");

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Post({ allPosts, post, output }) {
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState(false);
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
            <div
              className={`group ${
                response ? "mb-4" : "mb-8"
              } flex w-full items-center justify-between`}
            >
              {post.status !== "published" ? <AlertPreview /> : null}
              <Link href={"/thoughts"}>
                <TextButton textColor="black" darkTextColor="white">
                  <ArrowLeftIcon className="mr-2 h-4 w-4 flex-shrink-0 text-zinc-500 group-hover:text-lime-500 dark:text-zinc-400" />
                  All thoughts
                </TextButton>
              </Link>
              <Button
                bgColor="bg-zinc-100 dark:bg-zinc-900 !mb-0"
                textColor="text-black dark:text-white"
                borderColor="border-zinc-200 dark:border-zinc-700"
                onClick={() => {
                  setResponse(!response);
                }}
              >
                View summary
                {response ? (
                  <ChevronUpIcon width={16} height={16} className="ml-2" />
                ) : (
                  <ChevronDownIcon width={16} height={16} className="ml-2" />
                )}
              </Button>
            </div>
            <div>
              {response ? (
                <div className="mb-8 flex flex-col items-start justify-start italic text-zinc-600 dark:text-zinc-300">
                  <div className="flex items-center justify-start space-x-2">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center  rounded-full bg-gradient-to-tr from-purple-600 to-cyan-600 dark:from-purple-500 dark:to-cyan-500">
                      <SparklesIcon
                        width={20}
                        height={20}
                        className="text-white"
                      />
                    </div>
                    <p className="bg-gradient-to-tr from-purple-600 to-cyan-500 bg-clip-text pt-2 font-mono text-sm text-transparent dark:from-purple-400 dark:to-cyan-400">
                      Generated by{" "}
                      <a
                        href="https://apps.apple.com/gb/app/arti/id1659936985"
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold underline decoration-cyan-500 decoration-2 underline-offset-4"
                      >
                        Arti
                      </a>
                    </p>
                  </div>
                  {output}
                  <hr className="mt-8 w-full border-zinc-300 dark:border-zinc-700" />
                </div>
              ) : undefined}
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
        <div className="flex w-full items-center justify-center space-x-2">
          <Toast.Provider
            swipeDirection="right"
            className="mt-12 flex w-full justify-center"
          >
            <Button
              bgColor="bg-zinc-100 dark:bg-zinc-900 mb-4"
              textColor="text-black dark:text-white"
              borderColor="border-zinc-200 dark:border-zinc-700"
              onClick={() => {
                setOpen(false);
                window.clearTimeout(timerRef.current);
                timerRef.current = window.setTimeout(() => {
                  setOpen(true);
                }, 100);
              }}
            >
              Copy link to clipboard
            </Button>
            <Toast.Root
              open={open}
              onOpenChange={setOpen}
              className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-100 p-4 shadow-lg data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Toast.Title className="flex items-center text-black dark:text-white">
                <CheckCircleIcon className="mr-2 h-6 w-6 flex-shrink-0 text-lime-500 dark:text-lime-400" />
                Copied to clipboard!
              </Toast.Title>
              <Toast.Description asChild>
                <span className="pt-1 font-mono text-xs leading-tight text-zinc-600 dark:text-zinc-400">
                  {"https://www.kejk.tech/thoughts/" + post?.slug}
                </span>
              </Toast.Description>
            </Toast.Root>
            <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[12px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_24px]" />
          </Toast.Provider>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                bgColor="bg-zinc-100 dark:bg-zinc-900 mb-4"
                textColor="text-black dark:text-white"
                borderColor="border-zinc-200 dark:border-zinc-700"
              >
                <RssIcon className="mr-2" width={20} height={20} />
                Subscribe
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
              <Dialog.Content className="fixed left-[50%] top-[25%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-25%] rounded-lg bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow dark:border dark:border-zinc-700 dark:bg-zinc-800 md:top-[50%] md:translate-y-[-50%]">
                <Dialog.Title
                  className={`m-0 text-lg font-bold text-black dark:text-white ${sans.variable}`}
                >
                  Subscribe
                </Dialog.Title>
                <Dialog.Description
                  className={`mb-2 mt-2 text-sm leading-normal text-zinc-500 dark:text-zinc-300 ${sans.variable}`}
                >
                  Get an email whenever I publish a new thought.
                </Dialog.Description>
                <form
                  action="https://buttondown.email/api/emails/embed-subscribe/karl"
                  method="post"
                  target="popupwindow"
                  onSubmit={() => {
                    window.open("https://buttondown.email/karl", "popupwindow");
                    return true;
                  }}
                  className="embeddable-buttondown-form"
                >
                  <fieldset
                    className={`mb-4 flex flex-col items-start gap-2 ${sans.variable}`}
                  >
                    <label
                      className={`text-right font-sans text-sm text-zinc-500 dark:text-zinc-400 ${sans.variable}`}
                      htmlFor="bd-email"
                    >
                      Your email
                    </label>
                    <div className="flex w-full items-center gap-4">
                      <input
                        className={`inline-flex h-10 w-full flex-1 items-center justify-center rounded-xl bg-zinc-50 px-2 font-sans leading-none text-zinc-800 shadow-[0_0_0_1px] shadow-zinc-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-lime-500 dark:bg-zinc-900 dark:text-zinc-200 ${sans.variable}`}
                        type="email"
                        name="email"
                        id="bd-email"
                        placeholder="e.g. hello@email.com"
                        required
                      />
                      <input type="hidden" value="1" name="embed" />
                      <button
                        type="submit"
                        className={`inline-flex h-10 items-center justify-center rounded-xl bg-lime-400 px-4 font-sans font-semibold leading-none text-lime-950 hover:bg-lime-400 focus:shadow-[0_0_0_2px] focus:shadow-lime-500 focus:outline-none dark:bg-lime-500 ${sans.variable}`}
                      >
                        Subscribe
                      </button>
                    </div>
                  </fieldset>
                  <div
                    className={`mt-4 flex items-center justify-between font-sans ${sans.variable}`}
                  >
                    <div>
                      <span className=" text-zinc-600 dark:text-zinc-300">
                        Or you can subscribe via{" "}
                      </span>
                      <a
                        href="https://kejk.tech/rss.xml"
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                        className="font-bold text-lime-700 underline decoration-2 underline-offset-2 dark:text-lime-500"
                      >
                        RSS
                      </a>
                    </div>
                  </div>
                </form>
                <Dialog.Close asChild>
                  <button
                    className="absolute right-2 top-2 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full  hover:bg-lime-400 focus:shadow-[0_0_0_2px] focus:shadow-lime-500 focus:outline-none dark:hover:bg-lime-800"
                    aria-label="Close"
                  >
                    <XMarkIcon
                      height={16}
                      width={16}
                      className="text-zinc-600 hover:text-lime-500 dark:text-zinc-400 dark:hover:text-lime-50"
                    />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <hr className="my-4 border-zinc-300 dark:border-zinc-700" />
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

export async function getStaticProps({ params }) {
  const data = await cosmic.objects
    .findOne({
      type: "writings",
      slug: params.slug,
    })
    .status("any")
    .props("id,slug,title,metadata,modified_at,created_at,status");

  const post = await data.object;

  const allWritingData = await cosmic.objects
    .find({
      type: "writings",
    })
    .props("id,slug,title,metadata")
    .limit(4);

  const allPosts = await allWritingData.objects;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Summarize this: ${post.metadata.content}`,
    temperature: 0.7,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  const output = response.data.choices[0].text;

  return {
    props: { post, allPosts, output },
    revalidate: 10,
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
