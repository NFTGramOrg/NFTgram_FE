import Feed from "@/components/Feed";
// import Leftbar from "@/components/LeftBar";
import NewPost from "@/components/NewPost";
import Rightsection from "@/components/Rightsection";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import { useLayoutContext } from "@/components/LayoutContext";

const Home = () => {
  const [posts, setPosts] = React.useState<any>([]);
  const { neoline, neolineN3 } = useLayoutContext();
  const [yourAccounts, setYourAccounts] = React.useState<any>([]);
  const [nftid, setNftid] = useState("");
  const [buttondisabled, setDisabled] = useState(true);
  React.useEffect(() => {
    console.log("Creating client");
    const supabase = SUPABASE_URL
      ? createClient(SUPABASE_URL, SUPABASE_KEY)
      : null;

    (async function () {
      const { data: data1, error:error1 } = supabase
        ? await supabase
            .from("profile")
            .select("*")
            .eq("wallet_address", "NL2UNxotZZ3zmTYN8bSuhKDHnceYRnj6NR")
        : { data: null, error: new Error("supabase not initialized") };

      if (error1) {
        console.log("ERROR!!");
        console.log(error1);
      }
      console.log(data1);
      setYourAccounts(data1 || []);
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
          <main className="ml-[295px] flex w-[900px]  min-h-screen g-full flex-col border-l-[0.2px] border-r border-slate-800">
            <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0 text-white border-b-[0.2px] border-slate-800">
              Home
            </h1>
            
            {!buttondisabled?
            (<>
            <NewPost neoline={neoline} neolineN3={neolineN3} nftid={nftid}/>
            <div className="pt-2 mt-2 border-t border-slate-800"></div>
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
            </>):<>
            <div>
                  <h1 className="block mb-2 text-xl font-medium text-white text-center mt-10">
                    Select Your Account
                  </h1>
                  <select
                    id="countries"
                    
                    className=" text-lg rounded-xl pr-10 focus:border-accent block w-[400px] p-2.5 bg-[#1E293B] border-accent placeholder-gray-400 text-white focus:ring-accent justify-center items-center mx-auto "
                    onChange={(e) => {
                      e.target.value != "Choose Your NFT" &&
                      e.target.value != "No accounts"
                        ? setDisabled(false)
                        : setDisabled(true);
                      console.log(e.target.value);
                      setNftid(e.target.value);
                    }}
                  >
                    <option defaultValue={0} className="font-semibold">
                      Choose Your NFT
                    </option>
                    {yourAccounts.length == 0 ? (
                      <option className="font-semibold text-gray-300">
                        No accounts
                      </option>
                    ) : (
                      yourAccounts.map((item: any, id: any) => (
                        <option
                          value={item.userid}
                          key={id}
                          className="font-semibold"
                        >
                          {item.username}&nbsp;({item.userid})
                        </option>
                      ))
                    )}
                  </select>
                </div>
            </>}
          </main>
          <Rightsection />
        </>
      )}
    </>
  );
};

export default Home;
