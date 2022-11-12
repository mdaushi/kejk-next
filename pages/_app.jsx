import PlausibleProvider from "next-plausible";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="kejk.tech">
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
