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
            "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700;1,800&Literata:ital,wght@0,400;0,700;1,400;1,700&JetBrains+Mono:ital@0;1&display=swap"
          }
        />
        <link
          href={
            "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700;1,800&Literata:ital,wght@0,400;0,700;1,400;1,700&JetBrains+Mono:ital@0;1&display=swap"
          }
          rel={"stylesheet"}
          media={"print"}
          onLoad={"this.media='all'"}
        />
        <noscript>
          <link
            rel={"stylesheet"}
            href={
              "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700;1,800&Literata:ital,wght@0,400;0,700;1,400;1,700&JetBrains+Mono:ital@0;1&display=swap"
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
