import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsChat, BsDot } from "react-icons/bs";
import { BiHappyAlt } from "react-icons/bi";
import { BiAngry } from "react-icons/bi";
import { BiSad } from "react-icons/bi";
import { FaRegLaughSquint } from "react-icons/fa";

interface FeedProps {
  name: string;
  id: string;
  image: string;
  content: string;
  contentimageurl?: string;
}

function Feed({ name, id, image, content, contentimageurl }: FeedProps) {
  return (
    <div className="flex flex-col ">
      <Link href={"/post/" + id}>
        <div className="border-t-[0.5px] p-4 border-b-[0.5px] border-accent hover:bg-black ">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-1">
              <div>
                <div className="w-10 h-10 bg-slate-200 rounded-full ">
                  <Image
                    className="rounded-full"
                    src={image || ""}
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
            {/* <div className={`bg-slate-400 aspect-square w-full h-96 rounded-xl`}></div> */}
            {contentimageurl && (
              <div
                className={`bg-slate-400 aspect-square w-full h-96 rounded-xl`}
              >
                <Image
                  className="rounded-xl"
                  src={contentimageurl}
                  alt=""
                  width={500}
                  height={500}
                />
              </div>
            )}
            <div className="flex items-center mx-auto justify-between  mt-2 w-[90%]">
              <div className=" rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer ">
                <BsChat />
              </div>
              <div className=" rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
                <BiHappyAlt />
              </div>
              <div className=" rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
                <BiAngry />
              </div>
              <div className=" rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
                <BiSad />
              </div>
              <div className=" rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
                <FaRegLaughSquint />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Feed;
