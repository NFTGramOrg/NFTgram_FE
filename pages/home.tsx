import Feed from "@/components/Feed";
import Leftbar from "@/components/Leftbar";
import NewPost from "@/components/NewPost";
import Rightsection from "@/components/Rightsection";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";

const Home = () => {
  const [posts, setPosts] = React.useState<any>([]);
  const [neoline, setNeoLine] = useState();
  const [neolineN3, setNeoLineN3] = useState();
  React.useEffect(() => {
    console.log("TRYIG");
    window.addEventListener("NEOLine.NEO.EVENT.READY", () => {
      console.log("NEOLine.NEO.EVENT.READY");

      setNeoLine(new window.NEOLineN3.Init());
    });
    window.addEventListener("NEOLine.N3.EVENT.READY", () => {
      setNeoLineN3(new window.NEOLineN3.Init());
    });
  }, []);
  React.useEffect(() => {
    console.log("Creating client");
    const supabase = SUPABASE_URL
      ? createClient(SUPABASE_URL, SUPABASE_KEY)
      : null;

    (async function () {
      const { data, error } = supabase
        ? await supabase.from("tweets").select("*,profile(*)")
        : { data: null, error: new Error("supabase not initialized") };
      if (error) {
        console.log("ERROR!!");
        console.log(error);
      }
      console.log(data);
      setPosts(data || []);
    })();
  }, []);

  return (
    neoline != undefined &&
    neolineN3 != undefined && (
      <div className="w-full h-full flex justify-center items-center relative bg-bgcolor">
        <div className=" max-w-screen-2xl w-full h-full flex relative">
          <Leftbar neoline={neoline} neolineN3={neolineN3} />
          <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
            <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
              Home
            </h1>
            <NewPost neoline={neoline} neolineN3={neolineN3} />
            {posts.map((post: any, index: any) => (
              <Feed
                key={index}
                name={post.profile.username}
                postId={post.id}
                userId={post.userid}
                userImage={post.profile.profilepic}
                image={post.image}
                content={post.gen}
                createdAt={post.created_at}
                reactions={[post.happy, post.sad, post.angry, post.love]}
              />
            ))}
          </main>
          <Rightsection />
        </div>
      </div>
    )
  );
};

export default Home;
