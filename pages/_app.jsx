import { Analytics } from "@vercel/analytics/react";
import PlausibleProvider from "next-plausible";
import Layout from "../components/Layout";
import "../styles/globals.css";
import Mori from "next/font/local";
import Rader from "next/font/local";
import FraktionMono from "next/font/local";

const sans = Mori({
  src: [
    {
      path: "../fonts/PPMori-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/PPMori-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/PPMori-ExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-ExtraBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

const mono = FraktionMono({
  src: "../fonts/PPFraktionMono-Regular.woff2",
  variable: "--font-mono",
});

const serif = Rader({
  src: "../fonts/PPRader-BoldItalic.woff2",
  variable: "--font-serif",
});

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="kejk.tech">
      <Layout>
        <main
          className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans`}
        >
          <Component {...pageProps} />
          <Analytics />
        </main>
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
