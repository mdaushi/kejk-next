/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL("../../fonts/PPMori-SemiBold.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fontData = await font;
    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "KEJK | Thoughts";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#141516",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "left",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              paddingLeft: "24px",
              paddingTop: "40px",
            }}
          >
            <img
              alt="KEJK"
              src="https://imgix.cosmicjs.com/e14553d0-b7a4-11ed-80d4-cdbe55252435-logo.svg"
              height={100}
              width={100}
            />
          </div>
          <div
            style={{
              fontFamily: "PP Mori",
              fontSize: 88,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "white",
              marginTop: 30,
              padding: "40px",
              lineHeight: 1.1,
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "PP Mori",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
