import type { Metadata } from "next";
import { Html, Head, Main, NextScript } from "next/document";

export const metadata: Metadata = {
  title: "NFTGram",
  description: "Social Profiles for NFTs in the Neo Blockchain.",
};

export default function Document() {
  return (
    <Html
      lang="en"
      className="h-full bg-white"
      style={{ scrollBehavior: "smooth" }}
    >
      <Head />
      <body className={"h-full"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
