import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChat, BsDot } from "react-icons/bs";
import { BiHappyAlt } from "react-icons/bi";
import { BiAngry } from "react-icons/bi";
import { BiSad } from "react-icons/bi";
import { FaRegLaughSquint } from "react-icons/fa"
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";;
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
  const supabase = SUPABASE_URL
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;
  const [angryR, setangry] = useState(0);
  const [hapR, sethap] = useState(0);
  const [sadR, setsad] = useState(0);
  const [laughR, setlaugh] = useState(0);

  const angry = async (postid:string,usrid:string) => {
    const { data, error } = supabase
        ? await supabase.rpc('angr', {tid: postid,uid: usrid}): { data: null, error: new Error("supabase not initialized") };
        getreactions(postId)
      console.log(angryR)
  }
  const hap = async (postid:string,usrid:string) => {
    const { data, error } = supabase
        ? await supabase.rpc('hap', {tid: postid,uid: usrid}): { data: null, error: new Error("supabase not initialized") };
        getreactions(postId)
      console.log(hapR)
  }
  const sad = async (postid:string,usrid:string) => {
    const { data, error } = supabase
        ? await supabase.rpc('sa', {tid: postid,uid: usrid}): { data: null, error: new Error("supabase not initialized") };
        getreactions(postId)
      console.log(sadR)
  }
  const laugh = async (postid:string,usrid:string) => {
    const { data, error } = supabase
        ? await supabase.rpc('laug', {tid: postid,uid: usrid}): { data: null, error: new Error("supabase not initialized") };
        getreactions(postId)
      console.log(laughR)
  }
  const getreactions = async (postid:string) => { 
  let { data: tweets, error } =supabase ? await  supabase
  .from('tweets')
  .select('angry,happy,laugh,sad')
  .eq("id", `${postId}`)
  :{ data: null, error: new Error("supabase not initialized") };
  console.log(tweets)
  if(tweets) {
    setangry(tweets[0].angry)
    sethap(tweets[0].happy)
    setsad(tweets[0].sad)
    setlaugh(tweets[0].laugh)}
}
  useEffect(() => {
   getreactions(postId)
  }, [sadR,angryR,laughR,hapR])
  
  return (
    <div className="flex flex-col  ">
        <div className="border-t-[0.5px] p-4 border-b-[0.5px] border-accent hover:bg-black ">
          <div className="flex flex-col space-y-5">
            <div className="flex items-center space-x-1 ">
              <div>
                <div className="w-10 h-10 bg-black rounded-full ">
                  <Image
                    className="rounded-full  bg-white "
                    src={userImage || ""}
                    alt=""
                    width={40}
                    height={40}
                    priority={true}
                  />
                </div>
              </div>
              <Link href={"/profile/" + userId}>
              <div className="font-bold pl-2 text-secondary">{name}</div>
              </Link>
              <div className="text-primary">@{userId}</div>
              
              <div>
                <BsDot />
              </div>
              <div>{timeAgo(createdAt)}</div>

            </div>
          <Link href={"/post/" + postId}>
            <div className="text-white text-sm">{content}</div>
            {image && (
              <div
                className={`pt-3 aspect-square w-full h-96 rounded-xl`}
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
            </Link>
            <div className="flex items-center mx-auto justify-between  mt-2 w-[90%]">
              <div className=" rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer ">
                
                <BsChat />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer" onClick={()=>hap(postId,userId)}>
              <p className="text-xs mr-3" >{hapR}</p>
                <BiHappyAlt />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer" onClick={()=>angry(postId,userId)}>
              <p className="text-xs mr-3" >{angryR}</p>
                <BiAngry />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer" onClick={()=>sad(postId,userId)}>
              <p className="text-xs mr-3" >{sadR}</p>
                <BiSad />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer" onClick={()=>laugh(postId,userId)}>
              <p className="text-xs mr-3">{laughR}</p>
                <FaRegLaughSquint />
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}

export default Feed;
