import Head from "next/head";
import HeaderView from "../components/HeaderView";
import Button from "../components/Button";
import Markdown from "../components/Markdown";
import { CursorClickIcon, MailIcon } from "@heroicons/react/outline";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const bucket = api.bucket({
  slug: process.env.NEXT_PUBLIC_COSMIC_SLUG,
  read_key: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
});

export default function About({ about }) {
  const metaTitle = "KEJK | About";
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderView>{about.title}</HeaderView>
      <div className="px-4 lg:px-0">
        <Markdown content={about.metadata.content} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "about",
      slug: "about",
    },
    props: "title,content,metadata",
  });
  const about = await data.objects[0];
  return {
    props: {
      about,
    },
  };
}
