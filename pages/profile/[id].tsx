import Leftbar from "@/components/Layout";
import { useLayoutContext } from "@/components/LayoutContext";
import Profile from "@/components/Profile";
import Rightsection from "@/components/Rightsection";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Account() {
  const router = useRouter();
  const { neoline, neolineN3 } = useLayoutContext();
  const [accid, setAccid] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("wok");
    if (router.isReady) {
      if (router.query != undefined) {
        console.log(router.query.id);
        setAccid(router.query.id as string);

        setLoading(false);
      }
    }
  }, [router.isReady, router.query.id]);

  return (
    <>
      {!loading && (
        <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
          <Profile
            neoline={neoline}
            neolineN3={neolineN3}
            accountId={accid as string}
            changePage={setAccid}
          />
        </main>
      )}
      {/* <Rightsection /> */}
    </>
  );
}
