import Leftbar from "@/components/Leftbar";
import Profile from "@/components/Profile";
import Rightsection from "@/components/Rightsection";
import Viewpost from "@/components/Viewpost";
import React from "react";

function page() {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-bgcolor">
      <div className=" max-w-screen-2xl w-full h-full flex relative">
        <Leftbar />
        <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
          {/* <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
            Profile
          </h1> */}
          <Profile />
        </main>
        <Rightsection />
      </div>
    </div>
  );
}

export default page;
