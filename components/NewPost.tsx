"use client";
import React, { FormEvent, useEffect } from "react";
import useState from "react-usestateref";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import createPost from "@/utils/calls/setters/createPost";
import uploadImageToBucket from "@/utils/imagetoURL";
import Image from "next/image";
const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
function NewPost({ neoline, neolineN3 ,nftid }: { neoline: any; neolineN3: any; nftid:any }) {
  const [txnid,setTxnid]=useState<String>(' ');
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState("0");
  const [content, setContent] = useState("");
  const [loading1, setLoading1] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [buttonclicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const [nftid, setNftid] = useState("");
  const [image, setImage] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageSelect, setImageSelect] = useState(false);
  const [image_url, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImageurl, setSelectedImageurl] = useState("");
  const [username, setUsername] = useState("");
  const [profilepic, setProfilepic] = useState("");

  function removeNonUTF8Characters(input: string) {
    var regex = /[^\x00-\x7F]+/g;

    var result = input.replace(regex, "");

    return result;
  }

  const callApi = async (input: string) => {
    setLoading(true);
    setPrompt(input);
    console.log(input);
    try {
      if (nftid === "") {
        throw new Error("Input is empty");
      }
      console.log(nftid);
      const { data: account, error } = supabase
        ? await supabase.from("profile").select("*").eq("userid", nftid)
        : { data: null, error: new Error("supabase not initialized") };
      if (account != null && account.length > 0) {
        const { kind, sad, funny, angry,nftdesc,profilepic,username } = account[0];
        setUsername(username);
        console.log(username);
        setProfilepic(profilepic);
        console.log(profilepic);
        setLoading1(false);
        const res = await fetch("/api/createpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: input,
            nft:profilepic,
            kind,
            sad,
            funny,
            angry,
            image,
            profile: nftdesc
          }),
        });
        if(res.ok){
          const imagineData = await res.json();
          const { messageId } = imagineData;
          setContent(imagineData.content);
          console.log(imagineData.content);
          await pollMessageProgress(messageId); 
        }
        else {
          console.error('Error calling /api/createpost endpoint:', res.statusText);
        }
      } else {
        console.log("Account not found ");
      }
    } catch (err) {
      console.log(err);
    }
    setRefresh(true);
  };

  // useEffect(() => {
  //   (async function () {
  //     const { data, error } = supabase
  //       ? await supabase
  //           .from("profile")
  //           .select("*")
  //           .eq("wallet_address", "NL2UNxotZZ3zmTYN8bSuhKDHnceYRnj6NR")
  //       : { data: null, error: new Error("supabase not initialized") };

  //     if (error) {
  //       console.log("ERROR!!");
  //       console.log(error);
  //     }
  //     console.log(data);
  //     setYourAccounts(data || []);
  //   })();
  // }, []);
  const pollMessageProgress = async (messageId:string) => {
    const startTime = Date.now();

    while (Date.now() - startTime < 120000) {
      try {
        // Call /api/message endpoint to check progress
        const messageResponse = await fetch(`/api/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"messageId": messageId}),
        });

        if (messageResponse.ok) {
          const messageData = await messageResponse.json();

          // Check if progress is 100%
          if (messageData.progress === 100||messageData.imageUrls) {
            setProgress("100");
            console.log(messageData.imageUrls);
            setImageUrls(messageData.imageUrls);
            setSelectedImageurl(messageData.imageUrls[0]);
            setLoading(false);
            setImageSelect(true);
            return;
          } else {
            console.log(`Progress: ${messageData.progress}`);
            setProgress(messageData.progress);
          }
        } else {
          console.error('Error calling /api/message endpoint:', messageResponse.statusText);
        }

        // Wait for a specified interval before making the next request (e.g., 5 seconds)
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // If the timeout is reached, set progress to indicate the timeout
    setProgress('Timeout: Progress not reached 100% within 2 minutes');
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const form_values = Object.fromEntries(formData);
    callApi(form_values.post.toString());
  }
  const refreshpage = () => {
    setRefresh(false);
    window.location.reload();
    setLoading(false);
  };
  const sendInput = async (prompt: string, gen: string, imgurl: string) => {
    const { data, error } = supabase
      ? await supabase
          .from("tweets")
          .insert([
            {
              userid: `${nftid}`,
              prompt: `${prompt}`,
              gen: `${gen}`,
              sad: 0,
              angry: 0,
              laugh: 0,
              happy: 0,
              image: `${imgurl}`,
            },
          ])
          .select()
      : {
          data: null,
          error: new Error("Supabase client is not initialized"),
        };
    setButtonClicked(true);
  };
  const saveimg = async () => {
    setImageUrl(`https://deegrjwtmqprtizddphp.supabase.co/storage/v1/object/public/images/${await uploadImageToBucket(selectedImageurl)}`)
  }
  const handletransaction = async () => {
            if (content!=null) {
          let fixedContent = removeNonUTF8Characters(content);
          setContent(fixedContent);
          console.log(fixedContent);
          await sendInput(input, fixedContent, image_url);
          console.log(neolineN3 != undefined);
          const tid=await createPost(neolineN3, nftid, encodeURIComponent(input));
          setTxnid(tid);
        } else {
          console.log("error");
        }
  }
  useEffect(() => {
    console.log("saved Image:",image_url);
    if(image_url!=""){
      handletransaction();
    }
    }, [image_url]);
  useEffect(() => {
    if(txnid.length>2){
      refreshpage();
    }
  },[txnid]);
  useEffect(()=>{
    getdet();
  },[])
  const getdet = async () => {
    const { data: account, error } = supabase
    ? await supabase.from("profile").select("*").eq("userid", nftid)
    : { data: null, error: new Error("supabase not initialized") };
  if (account != null && account.length > 0) {
    const {profilepic,username } = account[0];
    setUsername(username);
    console.log(username);
    setProfilepic(profilepic);
    console.log(profilepic);
    setLoading1(false);
  }
}
  return (
    neoline != undefined &&
    neolineN3 != undefined && (
      <>
      {loading&&(
        <div className="flex flex-col my-20 w-full h-11 text-2xl text-center justify-center items-center">
        <h4 className="text-2xl font-bold text-secondary mb-4">Generating Post</h4>

            <div className=" w-11/12 bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-6 ">
                <div
                className="bg-secondary p-0.5 text-center text-lg font-bold rounded-lg leading-none text-primary-100"
                style={{ width: `${progress}%` }}
                >
                {progress}%
                </div>
            </div>
          </div>
        )}{imageSelect&&(
            <div className="container  px-2 py-2 lg:px-16 pb-10">
              <h5 className="text-2xl font-bold text-secondary mb-4">Your Generated Caption</h5>
              <p className="text-lg text-white mb-4">{content}</p>
              <h6 className="text-2xl font-bold text-secondary mb-4">Select an Image</h6>
            <div className="-m-1 flex flex-wrap md:-m-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex w-1/2 flex-wrap">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt={`gallery-${index}`}
                      className={`block h-full w-full rounded-lg object-cover object-center cursor-pointer hover:opacity-80 transition-opacity ${selectedImage==index?"border-8 border-secondary":""}`}
                      src={url}
                      onClick={() => {
                      setSelectedImage(index)
                      setSelectedImageurl(url)
                      console.log(selectedImageurl);}}
                    />
                  </div>
                </div>
              ))}
              <button
                disabled={!refresh}
                className="rounded-full top bg-secondary px-4 mt-6 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold disabled:bg-gray-500  "
                onClick={() => {
                    saveimg();
                }}
              >
                Proceed With Post
              </button>
            </div>
          </div>
        )
        }
        {!loading &&!imageSelect&&!loading1&& (
          <div className="border-t-[0.5px] px-4 border-b-[0.2px] flex items-stretch py-6 space-x-2  relative border-slate-800">
              <div className=" w-24 h-24 items-center align-middle justify-center  "><Image className=" items-center align-middle justify-center ml-2 mt-1" width={100} height={100} src={profilepic} alt=""></Image></div>
            <form className="flex flex-col w-full h-full" onSubmit={onSubmit}>
              <input
                onChange={(ev: any) => {
                  setInput(ev.target.value);
                }}
                type="text"
                name="post"
                className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
                placeholder="Submit prompts to generate a post"
                id="post"
              />
              <div className="w-full justify-between items-center flex">
                <div className="relative flex flex-col items-center justify-center  overflow-hidden">
                    <div className="flex">
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={image}
                                readOnly
                            />
                            <div
                                onClick={() => {
                                    setImage(!image);
                                }}
                                className="w-12 h-8 bg-gray-500 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[2.5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                            ></div>
                            <span className="ml-2 text-lg font-medium text-white">
                                Image
                            </span>
                        </label>
                    </div>
                </div>
                <div className="w-full max-w-[250px] flex-col mt-4">
                  <button
                    type="submit"
                    disabled={nftid!=""?false:true}
                    className="text-white rounded-full top bg-secondary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold disabled:bg-gray-500  "
                    onClick={() => {
                    }}
                  >
                    Post with {username.charAt(0).toUpperCase() + username.slice(1)}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </>
    )
  );
}

export default NewPost;
