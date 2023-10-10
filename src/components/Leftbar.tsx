import React from 'react'
import Link from 'next/link';
import { BiHomeCircle, BiUser } from "react-icons/bi";
import {
  BsBell,
  BsEnvelope,
  BsThreeDots,
} from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "My NFT",
    icon: BiUser,
  },
  {
    title: "Trending",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    icon: BsBell,
  },
  ];
const Leftbar = () => {
  return (
    <section className="fixed w-72 flex flex-col items-stretch h-screen my-4">
        <div className='flex-col items-stretch h-full space-y-4 my-4'>
          <Link href={"/"} className='my-4'>
                  <div className=' justify-center text-xl font-extrabold'>NFTgram</div>
                </Link>
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                className="hover:bg-white/10 text-2xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6"
                key={item.title}
                href={`/${item.title.toLowerCase()}`}
                >
                    <div>
                      <item.icon/>
                    </div>
                    <div>
                      {item.title}
                    </div>
                  </Link>
              ))}
            <button className=' w-full rounded-full bg-secondary px-6 py-4  text-2xl text-center hover:bg-opacity-70 transition duration-200  '>
              Make Post
            </button>
        </div>
        <button className="rounded-full flex items-center space-x-2 bg-transparent p-4 text-center hover:bg-white/10 transition duration-200 w-full justify-between mb-5">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-slate-400 w-10 h-10"></div>
          <div className="text-left text-sm">
            <div className="font-semibold">
              Romario
            </div>
            <div className="">rk</div>
          </div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </button>
        </section>
  )
}

export default Leftbar
