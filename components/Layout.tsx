import React, { ReactNode } from "react";
import Head from "next/head";
import { LayoutProvider } from "./LayoutContext";
import { useRouter } from "next/router";
import Leftbar from "./LeftBar";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  React.useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");
    console.log("Has Reloaded WHAAAAAAAAAAT ", hasReloaded);

    if (hasReloaded == "false" || hasReloaded == null) {
      // Reload the page

      localStorage.setItem("hasReloaded", "true");
      console.log("reloadiong");
      window.location.reload();
    }
  }, []);
  return (
    <LayoutProvider>
      <Head>
        <title>
          {pathname == "/home"
            ? " Home"
            : pathname == "/notification"
            ? " Notifications"
            : pathname.includes("post")
            ? " Posts"
            : " Profile"}
        </title>
        <link rel="icon" href="/nftgram.png" />
      </Head>
      <div className="w-full h-full flex justify-center items-center relative bg-bgcolor">
        <div className=" max-w-screen-2xl w-full h-full flex relative">
          <Leftbar />
          {children}
        </div>
      </div>
    </LayoutProvider>
  );
};

export default Layout;
