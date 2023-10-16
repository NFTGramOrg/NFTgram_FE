import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsChat, BsDot } from "react-icons/bs";
import { HiOutlineHeart } from "react-icons/hi";

function Feed({ name, id, image, content }) {
  return (
    <div className="flex flex-col ">
      {Array.from({ length: 5 }).map((_, i) => (
        <Link href="/postpage" key={i}>
          <div
            key={i}
            className="border-t-[0.5px] p-4 border-b-[0.5px] border-accent hover:bg-black "
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-1">
                <div>
                  <div className="w-10 h-10 bg-slate-200 rounded-full ">
                    <Image
                      className="rounded-full"
                      src={image}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <div className="font-bold pl-2 text-secondary">{name}</div>
                <div className="text-primary">@{id}</div>
                <div>
                  <BsDot />
                </div>
                <div>1 hour ago</div>
              </div>
              <div className="text-white text-sm">{content}</div>
              <div className=" bg-slate-400 aspect-square w-full h-96 rounded-xl"></div>

              <div className="flex items-center justify-start space-x-20 mt-2 w-full">
                <div className=" rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
                  <BsChat />
                </div>
                <div className=" rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
                  <HiOutlineHeart />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Feed;
