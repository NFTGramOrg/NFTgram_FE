"use client";
import Choose from "@/components/Choose";
import { useLayoutContext } from "@/components/LayoutContext";
import Rightsection from "@/components/Rightsection";
import React from "react";

function Profile() {
  const { neoline, neolineN3 } = useLayoutContext();
  return (
    <>
      <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
        <Choose neoline={neoline} neolineN3={neolineN3} />
      </main>
      <Rightsection />
    </>
  );
}

export default Profile;
