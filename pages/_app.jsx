import { Analytics } from "@vercel/analytics/react";
import PlausibleProvider from "next-plausible";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { JetBrains_Mono } from "@next/font/google";
import Telegraf from "@next/font/local";
import Gambarino from "@next/font/local";

const sans = Telegraf({
  src: [
    {
      path: "../fonts/PPTelegraf-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPTelegraf-RegularSlanted.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/PPTelegraf-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/PPTelegraf-BoldSlanted.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/PPTelegraf-UltraBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/PPTelegraf-UltraBoldSlanted.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weights: [400, 700],
  variable: "--font-mono",
});

const gambarino = Gambarino({
  src: "../fonts/Gambarino-Regular.woff2",
  variable: "--font-gambarino",
});

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="kejk.tech">
      <Layout>
        <main
          className={`${sans.variable} ${mono.variable} ${gambarino.variable} font-sans`}
        >
          <Component {...pageProps} />
          <Analytics />
        </main>
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
