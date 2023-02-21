import { Analytics } from "@vercel/analytics/react";
import PlausibleProvider from "next-plausible";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { Archivo, Inter, JetBrains_Mono } from "@next/font/google";
import Gambarino from "@next/font/local";

// const archivo = Archivo({
//   subsets: ["latin"],
//   weights: [400, 500, 600, 700, 800, 900],
//   variable: "--font-inter",
// });

const inter = Inter({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 800, 900],
  variable: "--font-inter",
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
          className={`${inter.variable} ${mono.variable} ${gambarino.variable} font-sans`}
        >
          <Component {...pageProps} />
          <Analytics />
        </main>
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
