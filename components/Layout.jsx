import React from "react";
import Nav from "./Nav";
import { CommandPalette } from "../components/CommandPalette";

const { createBucketClient } = require("@cosmicjs/sdk");

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

const fetchWritingData = await cosmic.objects
  .find({
    type: "writings",
  })
  .props("id,type,slug,title,metadata");
const writingData = fetchWritingData.objects;

const fetchAppData = await cosmic.objects
  .find({
    type: "apps",
  })
  .props("id,type,slug,title,metadata");
const appData = fetchAppData.objects;

const fetchUtilitiesData = await cosmic.objects
  .find({
    type: "utilities",
  })
  .props("id,type,slug,title,metadata");
const utilitiesData = fetchUtilitiesData.objects;

const fetchStacksData = await cosmic.objects
  .find({
    type: "stacks",
  })
  .props("id,type,slug,title,metadata");
const stacksData = fetchStacksData.objects;

const fetchFeaturesData = await cosmic.objects
  .find({
    type: "features",
  })
  .props("id,type,slug,title,metadata");
const featuresData = fetchFeaturesData.objects;

const fetchAlbumsData = await cosmic.objects
  .find({
    type: "albums",
  })
  .props("id,type,slug,title,metadata");
const albumsData = fetchAlbumsData.objects;

const fetchWorksData = await cosmic.objects
  .find({
    type: "works",
  })
  .props("id,type,slug,title,metadata");
const worksData = fetchWorksData.objects;

const contactDetails = [
  {
    type: "Contact",
    title: "Email",
    url: "mailto:karl@kejk.tech",
  },
  {
    type: "Contact",
    title: "GitHub",
    url: "https://github.com/kemiljk",
  },
  {
    type: "Contact",
    title: "Figma",
    url: "https://www.figma.com/@_kejk",
  },
  {
    type: "Contact",
    title: "Twitter",
    url: "https://www.twitter.com/_kejk",
  },
];

const Layout = ({
  writings,
  apps,
  utilities,
  contacts,
  stacks,
  features,
  albums,
  works,
  children,
}) => {
  writings = writingData;
  apps = appData;
  utilities = utilitiesData;
  contacts = contactDetails;
  stacks = stacksData;
  features = featuresData;
  albums = albumsData;
  works = worksData;

  return (
    <>
      <div className="mb-24 md:mb-4 lg:mb-12">
        <CommandPalette
          writings={writings}
          apps={apps}
          utilities={utilities}
          contacts={contacts}
          stacks={stacks}
          features={features}
          albums={albums}
          works={works}
        />
        <Nav />
        <main className="mx-auto h-full w-full max-w-5xl justify-center px-4 font-sans md:mt-32 md:px-12 lg:px-0">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
