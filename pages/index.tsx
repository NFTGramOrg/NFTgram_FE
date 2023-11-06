import Landing from "@/components/Landing";
import Head from "next/head";
import React, { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    console.log("Has Reloaded false");
    localStorage.setItem("hasReloaded", "false");
  }, []);
  return (
    <>
      <Head>
        <title>NFTGram </title>
        <link rel="icon" href="/nftgram.png" />
      </Head>
      <Landing />
    </>
  );
};
export default Home;
