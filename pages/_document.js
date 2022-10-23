import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel={"preconnect"}
          href={"https://fonts.gstatic.com"}
          crossOrigin={"true"}
        />
        <link
          rel={"preload"}
          as={"style"}
          href={
            "https://fonts.googleapis.com/css2?family=Archivo:wght@900&family=Spline+Sans:wght@400;500;600;700&family=JetBrains+Mono:ital@0;1&display=swap"
          }
        />
        <link
          href={
            "https://fonts.googleapis.com/css2?family=Archivo:wght@900&family=Spline+Sans:wght@400;500;600;700&family=JetBrains+Mono:ital@0;1&display=swap"
          }
          rel={"stylesheet"}
          media={"print"}
          onLoad={"this.media='all'"}
        />
        <noscript>
          <link
            rel={"stylesheet"}
            href={
              "https://fonts.googleapis.com/css2?family=Archivo:wght@900&family=Spline+Sans:wght@400;500;600;700&family=JetBrains+Mono:ital@0;1&display=swap"
            }
          />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
