import Head from "next/head";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { useRouter } from "next/router";
import TextButton from "../../components/TextButton";
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
  const metaTitle = `KEJK | ${post.title}`;
  const metaImage = `${post.metadata.hero?.imgix_url}`;
  const metaDescription = "Designer, developer, writer and musician";
  const url = `https://kejk.tech/${post.slug}`;

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
      <main className="mx-auto max-w-3xl">
        {router.isFallback ? (
          <PageHeader>Loading...</PageHeader>
        ) : (
          <>
            <div className="group mb-8 flex w-full justify-start">
              <TextButton textColor="black" darkTextColor="white">
                <ArrowSmLeftIcon className="h-6 w-6 flex-shrink-0 text-neutral-500 group-hover:text-teal-500 dark:text-neutral-400" />
                <Link href={"/writing"}>
                  <a>All thoughts</a>
                </Link>
              </TextButton>
            </div>
            <AllCapsHeader>
              <Moment fromNow>{post.modified_at}</Moment>
            </AllCapsHeader>
            <PageHeader>{post.title}</PageHeader>
            <h2 className="mb-4 text-left text-2xl font-medium text-neutral-700 dark:text-neutral-400 md:text-2xl">
              {post.metadata.snippet}
            </h2>
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
