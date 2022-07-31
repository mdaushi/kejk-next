import Head from "next/head";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { useRouter } from "next/router";
import Markdown from "../../components/Markdown";
import Button from "../../components/Button";
import AllCapsHeader from "../../components/AllCapsHeader";
import Moment from "react-moment";
import { ArrowSmLeftIcon } from "@heroicons/react/outline"; 

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return;
  }
  const metaTitle = `KEJK | Writing`;
  return (
    <div className={"mt-12"}>
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-3xl">
        {router.isFallback ? (
          <PageHeader>Loading...</PageHeader>
        ) : (
          <>
          <Button
            bgColor="neutral-100"
            textColor="black"
            borderColor="neutral-200"
            darkBgColor="neutral-800"
            darkTextColor="white"
          darkBorderColor="neutral-700"
          className="w-max"
          >
          <ArrowSmLeftIcon className="h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
            <Link href={"/writing"}>
              <a>All thoughts</a>
            </Link>
          </Button>
            <AllCapsHeader>
              <Moment fromNow>{post.modified_at}</Moment>
            </AllCapsHeader>
            <PageHeader>{post.title}</PageHeader>
            <h2 className="mb-4 text-left text-2xl font-medium text-neutral-700 dark:text-neutral-400 md:text-2xl">
              {post.metadata.snippet}
            </h2>
            {/* <Markdown content={post.metadata.content} /> */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await bucket.getObjects({
    query: {
      slug: params.slug,
    },
    props: "id,slug,content,title,metadata,modified_at",
  });
  const post = await data.objects[0];
  return {
    props: { post: post },
  };
}

export async function getStaticPaths() {
  const data = await bucket.getObjects({
    query: {
      type: "writings",
    },
    props: "id,slug,content,title,metadata",
  });
  const allPosts = await data.objects;
  return {
    paths: allPosts.map((post) => `/thoughts/${post.slug}`),
    fallback: true,
  };
}
