"use client";
import Choose from "@/components/Choose";
import Leftbar from "@/components/Leftbar";
import Rightsection from "@/components/Rightsection";
import Viewpost from "@/components/Viewpost";
import React, { useState } from "react";

function Profile() {
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
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-bgcolor">
      <div className=" max-w-screen-2xl w-full h-full flex relative">
        <Leftbar neoline={neoline} neolineN3={neolineN3} />
        <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
          <Choose neoline={neoline} neolineN3={neolineN3} />
        </main>
        <Rightsection />
      </div>
    </div>
  );
}

export default Profile;
