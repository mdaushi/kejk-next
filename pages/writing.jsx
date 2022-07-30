import Head from "next/head";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import WritingCard from "../components/WritingCard";
import fs from "fs";
import { Feed } from "feed";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Writing({ writings }) {
  const metaTitle = "KEJK | Writing";
  return (
    <div className={"mt-12"}>
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto w-full max-w-5xl">
          <PageHeader>Writing</PageHeader>
          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
            {writings.map((writing) => {
              return (
                <Link key={writing.id} href={`/posts/${writing.slug}`}>
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
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "writings",
    },
    props: "id,slug,title,metadata,published_at",
  });
  const writings = await data.objects;

  const generateRssFeed = async () => {
    const posts = writings;
    const siteURL = "https://kejk.tech";
    const date = new Date();
    const author = {
      name: "Karl Emil James Koch",
      email: "karl@kejk.tech",
      link: "https://twitter.com/_SreetamDas",
    };
    const feed = new Feed({
      title: "KEJK | Writing",
      description: "Thoughts on design, development and career progression",
      id: siteURL,
      link: siteURL,
      image: `${siteURL}/logo.svg`,
      favicon: `${siteURL}/favicon.ico`,
      copyright: `All rights reserved ${date.getFullYear()}, Karl Emil James Koch`,
      updated: date,
      generator: "Feed for Node.js",
      feedLinks: {
        rss2: `${siteURL}/rss/feed.xml`,
        json: `${siteURL}/rss/feed.json`,
        atom: `${siteURL}/rss/atom.xml`,
      },
      author,
    });
    posts.forEach((post) => {
      const url = `${siteURL}/posts/${post.slug}`;
      feed.addItem({
        title: post.title,
        id: post.id,
        link: url,
        description: post.metadata.snippet,
        image: post.metadata.hero.imgix_url,
        content: post.content,
        author: [author],
        contributor: [author],
        date: new Date(post.published_at),
      });
    });
    fs.mkdirSync("./public/rss", { recursive: true });
    fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
    fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
    fs.writeFileSync("./public/rss/feed.json", feed.json1());
  };

  await generateRssFeed();

  return {
    props: {
      writings,
    },
  };
}
