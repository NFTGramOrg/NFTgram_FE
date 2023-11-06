import Feed from "@/components/Feed";
import Leftbar from "@/components/Layout";
import { useLayoutContext } from "@/components/LayoutContext";
import NewPost from "@/components/NewPost";
import Rightsection from "@/components/Rightsection";
import Viewpost from "@/components/Viewpost";
import React from "react";

function Post() {
  const { neoline, neolineN3 } = useLayoutContext();

  return (
    <>
      <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
        <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
          Post
        </h1>
      </main>
      <Rightsection />
    </>
  );
}

export default Post;
