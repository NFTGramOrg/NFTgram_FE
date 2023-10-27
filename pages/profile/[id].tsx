import Leftbar from "@/components/Leftbar";
import Profile from "@/components/Profile";
import Rightsection from "@/components/Rightsection";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Account() {
  const router = useRouter();
  const [neoline, setNeoLine] = useState();
  const [neolineN3, setNeoLineN3] = useState();
  const [accid ,setAccid] = useState("");
  const [loading,setLoading]=useState(true)
  React.useEffect(() => {
    window.addEventListener("NEOLine.NEO.EVENT.READY", () => {
      console.log("NEOLine.NEO.EVENT.READY");
      if (window != null) {
        setNeoLine(new window.NEOLineN3.Init());
      }
    });
    window.addEventListener("NEOLine.N3.EVENT.READY", () => {
      setNeoLineN3(new window.NEOLineN3.Init());
    });
  }, []);
  useEffect(() => {
    console.log("wok")
    if (router.isReady) {
        if(router.query!=undefined)
        {
          console.log(router.query.id)
            setAccid(router.query.id as string)

            setLoading(false)
        }
    }
  }, [router.isReady,router.query.id]);

  return (
    <div className="w-full h-full flex justify-center items-center relative bg-bgcolor">
      <div className=" max-w-screen-2xl w-full h-full flex relative">
        <Leftbar neoline={neoline} neolineN3={neolineN3} />
      {!loading && (<main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
        <Profile neoline={neoline} neolineN3={neolineN3} accountId={accid as string} changePage={setAccid} />
      </main>)}
        {/* <Rightsection /> */}
      </div>
    </div>
  );
}
