import React from "react";
import Nav from "./Nav";
import { CommandPalette } from "../components/CommandPalette";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

const Layout = ({ writings, children }) => {
  return (
    <>
      <div className="mb-24 md:mb-4 lg:mb-12">
        <Nav />
        <main className="mx-auto h-full w-full max-w-5xl justify-center px-4 md:mt-32 md:px-12 lg:px-0">
          {/* <CommandPalette content={writings} /> */}
          {children}
        </main>
      </div>
    </>
  );
};

// export async function getStaticProps() {
//   const writingData = await bucket.getObjects({
//     limit: 3,
//     query: {
//       type: "writings",
//     },
//     props: "slug,title,metadata",
//   });

//   const writings = await writingData.objects;

//   return {
//     props: {
//       writings,
//     },
//   };
// }

export default Layout;
