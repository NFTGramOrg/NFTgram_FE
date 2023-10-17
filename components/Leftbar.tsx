import React from 'react'
import Link from 'next/link';
import { BiHomeCircle, BiUser } from "react-icons/bi";
import {
  BsBell,
  BsEnvelope,
  BsThreeDots,
} from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import Image from 'next/image';
const NAVIGATION_ITEMS = [
  {
    title: "Home",
    link:"home",
    icon: BiHomeCircle,
  },
  {
    title: "My NFT",
    link:"profile",
    icon: BiUser,
  },
  {
    title: "Trending",
    link:"trending",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    link:"notifications",
    icon: BsBell,
  },
  ];
const Leftbar = () => {
  return (
    <section className="fixed w-72 flex flex-col items-stretch h-screen my-4 mr-5">
        <div className='flex-col items-stretch h-full space-y-4 my-4'>
          <Link href={"/"} className='my-4'>
                <div className='flex flex-row'> 
                  <Image src="/nftgram.png" width={50} height={50} alt="" className='flex flex-col mx-3 rounded-full'/>
                  <div className='flex flex-col justify-center text-xl font-extrabold'>NFTgram</div>
                  </div>
                </Link>
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                className="hover:bg-white/10 text-xl font-bold transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6"
                key={item.title}
                href={`/${item.link}`}
                >
                    <div>
                      <item.icon/>
                    </div>
                    <div>
                      {item.title}
                    </div>
                  </Link>
              ))}
              <div className='pt-5'>
            <button className=' w-3/4  rounded-full bg-secondary px-2 py-4  text-xl font-semibold text-center hover:bg-opacity-70 transition duration-200  '>
              Make Post
            </button>
            </div>
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
