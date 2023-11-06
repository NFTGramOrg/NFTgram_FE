"use client";
import Leftbar from "@/components/Layout";
import Rightsection from "@/components/Rightsection";
import Notif from "@/components/Notif";
import React, { useState } from "react";
import { useLayoutContext } from "@/components/LayoutContext";
const noti = [
  {
    title: "New Follower",
    description: "@boredape791234 followed you",
    notitype: "follow",
  },
  {
    title: "New Follower",
    description: "@boredape794 followed you",
    notitype: "follow",
  },
  {
    title: "New Follower",
    description: "@boredape94 followed you",
    notitype: "follow",
  },
];
function Notification() {
  const { neoline, neolineN3 } = useLayoutContext();
  return (
    neoline != undefined &&
    neolineN3 != undefined && (
      <>
        <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
          <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0 border-b-[0.5px] text-white">
            Notifications
          </h1>
          {noti.map((item) => (
            <Notif
              title={item.title}
              description={item.description}
              notitype={item.notitype}
              key={item.description}
            />
          ))}
        </main>
        <Rightsection />
      </>
    )
  );
}

export default Notification;
