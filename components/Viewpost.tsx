import React from 'react'
import { BsChat, BsDot } from 'react-icons/bs'
import { HiOutlineHeart } from 'react-icons/hi'
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import {createClient} from "@supabase/supabase-js"
import { useEffect, useState } from 'react'
import { BiHappyAlt } from "react-icons/bi";
import { BiAngry } from "react-icons/bi";
import { BiSad } from "react-icons/bi";
import { FaRegLaughSquint } from "react-icons/fa"
import Image from 'next/image'
import NewPost from './NewPost';
const REPLIES = [
    {
        user:"Boredape1",
        username:"@boredape791234",
        reply:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        ,time:"1 hour ago",
        key:"1"
    }
]

function Viewpost({ id,neoline, neolineN3}: { id: string,neoline: any; neolineN3: any }) {
  // const postId=id;
  const supabase = SUPABASE_URL
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;
  const [angryR, setangry] = useState(0);
  const [hapR, sethap] = useState(0);
  const [sadR, setsad] = useState(0);
  const [laughR, setlaugh] = useState(0);
  const [posts, setPosts] = React.useState<any>([]);
  const [loading,setLoading]=useState<boolean>(true)

useEffect(() => {
  if(id!=undefined)
  {
    (async function () {
      console.log("This is the id before the tweets: "+id);

      const { data, error } = supabase
        ? await supabase.from("tweets").select("*,profile(*)").eq("id", id)
        : { data: null, error: new Error("supabase not initialized") };
      if(data){

    }
      if (error) {
        console.log("ERROR!!");
        console.log(error);
      }
      console.log(data,"data");
      if(data!==null&&data.length>0)
      {
      setPosts(data[0]);

        setLoading(false)

      }
    })();
  }
    
  }, []);
  const followhandler = async (usrid:string) => {
    const { data, error } = supabase
        ? await supabase.rpc('follow', {uid: usrid}): { data: null, error: new Error("supabase not initialized") };
  }
  const angry = async (postid:string,usrid:string) => {
    const { data, error } = supabase
        ? await supabase.rpc('angr', {tid: postid,uid: usrid}): { data: null, error: new Error("supabase not initialized") };
        getreactions(id)
      console.log(angryR)
  }
  const hap = async (postid:string,usrid:string) => {
    const { data, error } = supabase
        ? await supabase.rpc('hap', {tid: postid,uid: usrid}): { data: null, error: new Error("supabase not initialized") };
        getreactions(id)
      console.log(hapR)
  }
  const sad = async (postid:string,usrid:string) => {
    const { data, error } = supabase
        ? await supabase.rpc('sa', {tid: postid,uid: usrid}): { data: null, error: new Error("supabase not initialized") };
        getreactions(id)
      console.log(sadR)
  }
  const laugh = async (postid:string,usrid:string) => {
    const { data, error } = supabase
        ? await supabase.rpc('laug', {tid: postid,uid: usrid}): { data: null, error: new Error("supabase not initialized") };
        getreactions(id)
      console.log(laughR)
  }
  const getreactions = async (postid:string) => { 
  let { data: tweets, error } =supabase ? await  supabase
  .from('tweets')
  .select('angry,happy,laugh,sad')
  .eq("id", `${postid}`)
  :{ data: null, error: new Error("supabase not initialized") };
  console.log(tweets)
  if(tweets) {
    setangry(tweets[0].angry)
    sethap(tweets[0].happy)
    setsad(tweets[0].sad)
    setlaugh(tweets[0].laugh)}
}
  useEffect(() => {
   getreactions(id)
  }, [sadR,angryR,laughR,hapR])
  return (
    <>
    {loading&&(
        <div className="flex flex-col my-20 w-full h-11 text-2xl text-center justify-center items-center">
          <div role="status" >
                <svg aria-hidden="true" className=" w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
          </div>
          </div>
        )}
    {!loading &&(
    <div className='flex flex-col'>
              <div className='border-t-[0.5px] p-4 border-b-[0.5px] border-accent'>
                
              <div className='flex flex-col space-y-4'>
                <div className='flex items-center space-x-1'>
                <div>
                  <div className='w-10 h-10 bg-slate-200 rounded-full '>
                  <Image
                    className="rounded-full  bg-white "
                    src={posts.profile.profilepic || ""}
                    alt=""
                    width={40}
                    height={40}
                    priority={true}
                  />
                  </div>
                </div>
                  <div className='font-bold pl-2 text-secondary'>{posts.profile.username}</div>
                  <div className='text-primary'>{posts.userid}</div>
                  <div>
                    <BsDot/>
                  </div>
                  <div>1 hour ago</div>
                </div>
                <div className='text-white text-sm'>
                {posts.gen}
                </div>
                {posts.image && (
              <div
                className={`pt-3 aspect-square w-full h-96 rounded-xl`}
              >
                <Image
                  src={posts.image}
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
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer" onClick={()=>hap(id,posts.userid)}>
              <p className="text-xs mr-3" >{hapR}</p>
                <BiHappyAlt />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer" onClick={()=>angry(id,posts.userid)}>
              <p className="text-xs mr-3" >{angryR}</p>
                <BiAngry />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer" onClick={()=>sad(id,posts.userid)}>
              <p className="text-xs mr-3" >{sadR}</p>
                <BiSad />
              </div>
              <div className=" flex rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer" onClick={()=>laugh(id,posts.userid)}>
              <p className="text-xs mr-3">{laughR}</p>
                <FaRegLaughSquint />
              </div>
            </div>
              </div>
              
              </div>
              {/* <div>
              </div> */}
              {REPLIES.map((item) => (
              <div className=' ml-10  p-4 border-b-[0.5px] border-accent' key={item.key}>
                
              <div className='flex flex-col space-y-4'>
                <div className='flex items-center space-x-1'>
                <div>
                  <div className='w-10 h-10 bg-slate-200 rounded-full '></div>
                </div>
                  <div className='font-bold pl-2 text-secondary'>{item.user}</div>
                  <div className='text-primary'>{item.username}</div>
                  <div>
                    <BsDot/>
                  </div>
                  <div>{item.time}</div>
                </div>
                <div className='text-white text-sm'>
                {item.reply}
                </div>

              <div className='flex items-center justify-start space-x-20 mt-2 w-full'>
                <div className=' rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer'><BsChat/></div>
                <div className=' rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer'><HiOutlineHeart/></div>
              </div>
              </div>
              
              </div>))}
           
          
          </div>)}</>
  )
}

export default Viewpost
