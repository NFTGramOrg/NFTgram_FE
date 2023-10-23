import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsChat, BsDot } from "react-icons/bs";
import { BiHappyAlt } from "react-icons/bi";
import { BiAngry } from "react-icons/bi";
import { BiSad } from "react-icons/bi";
import { FaRegLaughSquint } from "react-icons/fa";
import timeAgo from "@/utils/timeAgo";

interface FeedProps {
  name: string;
  postId: string;
  userId: string;
  userImage: string;
  image: string;
  content: string;
  reactions: string[];
  createdAt: string;
}

function Feed({
  name,
  postId,
  userId,
  userImage,
  image,
  content,
  createdAt,
}: FeedProps) {
  return (
    <div className="flex flex-col ">
      <Link href={"/post/" + postId}>
        <div className="border-t-[0.5px] p-4 border-b-[0.5px] border-accent hover:bg-black ">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-1">
              <div>
                <div className="w-10 h-10 bg-slate-200 rounded-full ">
                  <Image
                    className="rounded-full"
                    src={userImage || ""}
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div className="font-bold pl-2 text-secondary">{name}</div>
              <div className="text-primary">@{userId}</div>
              <div>
                <BsDot />
              </div>
              <div>{timeAgo(createdAt)}</div>
            </div>
            <div className="text-white text-sm">{content}</div>
            {/* <div className={`bg-slate-400 aspect-square w-full h-96 rounded-xl`}></div> */}
            {image && (
              <div
                className={`bg-slate-400 aspect-square w-full h-96 rounded-xl`}
              >
                <Image
                  src={image}
                  alt=""
                  width={500}
                  height={500}
                  className="rounded-xl image max-w-full max-h-full mx-auto"
                />
              </div>
            )}
            <div className="flex items-center mx-auto justify-between  mt-2 w-[90%]">
              <div className=" rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer ">
                
                <BsChat />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
              <p className="text-xs mr-3">0</p>
                <BiHappyAlt />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
              <p className="text-xs mr-3">0</p>
                <BiAngry />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
              <p className="text-xs mr-3">0</p>
                <BiSad />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer">
              <p className="text-xs mr-3">0</p>
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
