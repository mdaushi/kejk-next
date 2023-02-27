import { Analytics } from "@vercel/analytics/react";
import PlausibleProvider from "next-plausible";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { Inter, JetBrains_Mono } from "@next/font/google";
import Telegraf from "@next/font/local";
import Gambarino from "@next/font/local";

// const inter = Inter({
//   subsets: ["latin"],
//   weights: [400, 500, 600, 700, 800, 900],
//   variable: "--font-inter",
// });

const sans = Telegraf({
  src: "../fonts/PPTelegraf-Regular.woff2",
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
