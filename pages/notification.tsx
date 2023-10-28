'use client'
import Leftbar from '@/components/Leftbar'
import Rightsection from '@/components/Rightsection';
import Notif from '@/components/Notif';
import React, { useState } from 'react'
const noti = [
  {
      title:"New Follower",
      description:"@boredape791234 followed you",
      notitype:"follow"
  },
  {
    title:"New Follower",
    description:"@boredape794 followed you",
    notitype:"follow"
  },
  {
    title:"New Follower",
    description:"@boredape94 followed you",
    notitype:"follow"
}
]
function Notification() {
    const [neoline, setNeoLine] = useState(null);
    const [neolineN3, setNeoLineN3] = useState(null);
    const [loading,setLoading]=useState(false);
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
    neoline != undefined &&
    neolineN3 != undefined && (
      <div className="w-full h-full flex justify-center items-center relative bg-bgcolor">
        <div className=" max-w-screen-2xl w-full h-full flex relative">
        <Leftbar neoline={neoline} neolineN3={neolineN3} />
        <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
            <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0 border-b-[0.5px]">
              Notifications
            </h1>
            {noti.map((item) => (
            <Notif title={item.title} description={item.description} notitype={item.notitype} key={item.description}/>))}
        </main>
        <Rightsection/>
        </div>
    </div>
  )
)
}

export default Notification