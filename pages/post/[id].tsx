import Feed from "@/components/Feed";
import Leftbar from "@/components/Leftbar";
import NewPost from "@/components/NewPost";
import Rightsection from "@/components/Rightsection";
import Viewpost from "@/components/Viewpost";
import { useRouter } from "next/router";
import React, { useState,useEffect } from "react";

function Post() {
  const router = useRouter();
  const [id,setId]=useState<string>('')
  const [loading,setLoading]=useState<boolean>(true)
  const [neoline, setNeoLine] = useState();
  const [neolineN3, setNeoLineN3] = useState();
  useEffect(() => {
    if (router.isReady) {
        if(router.query!=undefined)
        {
            console.log("This is the id before the tweets: "+router.query.id)
            setId(router.query.id as string)
            setLoading(false)
        }
    }
  }, [router.isReady]);

  React.useEffect(() => {
    console.log("This is the id before the tweets: "+id)
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
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-bgcolor">
      <div className=" max-w-screen-2xl w-full h-full flex relative">
        <Leftbar neoline={neoline} neolineN3={neolineN3} />
        <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
          <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
            Post
          </h1>
          {!loading && (
          <><Viewpost id={id as string} neoline={neoline} neolineN3={neolineN3} /></>)}
        </main>
        <Rightsection />
      </div>
    </div>
  );
}

export default Post;
