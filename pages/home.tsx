import Feed from "@/components/Feed";
import Leftbar from "@/components/Leftbar";
import NewPost from "@/components/NewPost";
import Rightsection from "@/components/Rightsection";
import React from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";

const Home = () => {
  const [posts, setPosts] = React.useState<any>([]);
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
  // const placeholderContent = [
  //   {
  //     id: "ynTsgQbdk0dFAPeygUAZxvO8eJcD",
  //     name: "granbull",
  //     content:
  //       "🌟 Just discovered a hidden gem of a cafe in my neighborhood. The latte art here is on point, and the pastries are divine! 😍☕ #LocalEats #CoffeeLover",
  //     image: "https://randompokemon.com/sprites/normal/granbull.png",
  //   },
  //   {
  //     id: "ynTsgQbdk0dFAPeygUAZxvO8eJcC",
  //     name: "machop",
  //     content:
  //       "🚀 Exciting news! I've officially booked my tickets for that long-awaited vacation. Time to dust off the suitcase and get ready for some adventure! ✈️🌴 #Wanderlust",
  //     image: "https://randompokemon.com/sprites/normal/machop.png",
  //     contentimageurl: "https://randompokemon.com/sprites/normal/machop.png",
  //   },
  //   {
  //     id: "ynTsgQbdk0dFAPeygUAZxvO8eJcD",
  //     name: "granbull",
  //     content:
  //       "🌟 Just discovered a hidden gem of a cafe in my neighborhood. The latte art here is on point, and the pastries are divine! 😍☕ #LocalEats #CoffeeLover",
  //     image: "https://randompokemon.com/sprites/normal/granbull.png",
  //   },
  //   {
  //     id: "ynTsgQbdk0dFAPeygUAZxvO8eJcC",
  //     name: "machop",
  //     content:
  //       "🚀 Exciting news! I've officially booked my tickets for that long-awaited vacation. Time to dust off the suitcase and get ready for some adventure! ✈️🌴 #Wanderlust",
  //     image: "https://randompokemon.com/sprites/normal/machop.png",
  //     contentimageurl: "https://randompokemon.com/sprites/normal/machop.png",
  //   },
  //   {
  //     id: "ynTsgQbdk0dFAPeygUAZxvO8eJcD",
  //     name: "granbull",
  //     content:
  //       "🌟 Just discovered a hidden gem of a cafe in my neighborhood. The latte art here is on point, and the pastries are divine! 😍☕ #LocalEats #CoffeeLover",
  //     image: "https://randompokemon.com/sprites/normal/granbull.png",
  //   },
  //   {
  //     id: "ynTsgQbdk0dFAPeygUAZxvO8eJcC",
  //     name: "machop",
  //     content:
  //       "🚀 Exciting news! I've officially booked my tickets for that long-awaited vacation. Time to dust off the suitcase and get ready for some adventure! ✈️🌴 #Wanderlust",
  //     image: "https://randompokemon.com/sprites/normal/machop.png",
  //     contentimageurl: "https://randompokemon.com/sprites/normal/machop.png",
  //   },
  // ];
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-bgcolor">
      <div className=" max-w-screen-2xl w-full h-full flex relative">
        <Leftbar />
        <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
          <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
            Home
          </h1>
          <NewPost />
          {posts.map((post, index) => (
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
  );
};

export default Home;
