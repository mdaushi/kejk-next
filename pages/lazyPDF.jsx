import Head from "next/head";
import Image from "next/image";
import PageHeader from "../components/PageHeader";
import classNames from "classnames";
import { ArrowDownIcon } from "@heroicons/react/outline";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

const LazyPDF = ({ lazyPDF }) => {
  const metaTitle = "KEJK | Lazy PDF";
  const metaImage =
    "https://imgix.cosmicjs.com/483f5be0-94eb-11ec-96f2-43bdd99faa64-Lazy-PDF.png";
  const metaDescription =
    "Effortlessly create a PDF from a set of selected images through an interfaceless system with only the Finder selection UI.";
  const url = "https://kejk.tech/lazyPDF";
  const downloadURL =
    "https://cdn.cosmicjs.com/27efc530-9722-11ec-8bb7-91577e4f4933-Lazy-PDF.zip";

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
      <main>
        <PageHeader>{lazyPDF.title}</PageHeader>
        <h2 className="mb-4 text-left text-2xl font-medium text-neutral-700 dark:text-neutral-400 md:text-2xl">
          {lazyPDF.metadata.subtitle}
        </h2>
        <div className="h-auto w-full max-w-3xl">
          <Image
            className="rounded-md"
            src={lazyPDF.metadata.hero?.imgix_url}
            alt="Image of the app icon"
            width={1000}
            height={700}
            quality={100}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="mt-12 flex w-full items-center justify-between">
          <div className="flex flex-col space-y-4">
            <div
              className="flex w-2/3 flex-col"
              dangerouslySetInnerHTML={{ __html: lazyPDF.metadata.subheader }}
            />
            <a href={downloadURL} download>
              <button
                className={classNames(
                  `mb-4 flex items-center justify-center space-x-2 rounded-md border border-neutral-200 bg-neutral-100 py-2 px-4 text-sm font-medium text-black transition ease-in-out hover:border-teal-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white md:w-max md:text-base`
                )}
              >
                <ArrowDownIcon className="mr-2 h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
                Download
              </button>
            </a>
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
        <div dangerouslySetInnerHTML={{ __html: lazyPDF.content }} />
        <div className="mt-12 inline-flex w-full justify-center">
          <a href={downloadURL} download>
            <button
              className={classNames(
                `mb-4 flex items-center justify-center space-x-2 rounded-md border border-neutral-200 bg-neutral-100 py-2 px-4 text-sm font-medium text-black transition ease-in-out hover:border-teal-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white md:w-max md:text-base`
              )}
            >
              <ArrowDownIcon className="mr-2 h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
              Download
            </button>
          </a>
        </div>
      </main>
    </div>
  );
};

export default LazyPDF;

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "lazy-pdf",
      slug: "lazy-pdf-page",
    },
    props: "title,content,metadata",
  });

  const lazyPDF = await data.objects[0];
  return {
    props: {
      lazyPDF,
    },
  };
}
