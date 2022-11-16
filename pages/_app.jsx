import PlausibleProvider from "next-plausible";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { Archivo, JetBrains_Mono } from "@next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 800, 900],
  variable: "--font-archivo",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weights: [400, 700],
  variable: "--font-mono",
});

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="kejk.tech">
      <Layout>
        <main className={`${archivo.variable} ${mono.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
