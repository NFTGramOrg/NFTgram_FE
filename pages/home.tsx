import Feed from "@/components/Feed";
// import Leftbar from "@/components/LeftBar";
import NewPost from "@/components/NewPost";
import Rightsection from "@/components/Rightsection";
import React from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import { useLayoutContext } from "@/components/LayoutContext";

const Home = () => {
  const [posts, setPosts] = React.useState<any>([]);
  const { neoline, neolineN3 } = useLayoutContext();
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
      shuffleArray(data || []);
    })();
  }, []);
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setPosts(array);
  }
  return (
    <>
      {neoline != undefined && neolineN3 != undefined && (
        <>
          <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
            <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0 text-white">
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
        </>
      )}
    </>
  );
};

export default Home;
