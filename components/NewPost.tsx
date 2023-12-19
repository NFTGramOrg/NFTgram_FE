"use client";
import React, { FormEvent, useEffect } from "react";
import useState from "react-usestateref";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import createPost from "@/utils/calls/setters/createPost";
import uploadImageToBucket from "@/utils/imagetoURL";
const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
function NewPost({ neoline, neolineN3 }: { neoline: any; neolineN3: any }) {
  const [txnid,setTxnid]=useState<String>(' ');
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState("0");
  const [content, setContent] = useState("");
  const [buttondisabled, setDisabled] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [buttonclicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [nftid, setNftid] = useState("");
  const [image, setImage] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageSelect, setImageSelect] = useState(false);
  const [image_url, setImageUrl] = useState("");
  const [yourAccounts, setYourAccounts] = React.useState<any>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImageurl, setSelectedImageurl] = useState("");


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
        const { kind, sad, funny, angry,nftdesc } = account[0];
        const res = await fetch("/api/createpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: input,
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
        // if (data.image_url) {
        //   setImageUrl(data.image_url);
        // }
        // if (data.content) {
        //   let fixedContent = removeNonUTF8Characters(data.content);
        //   let image = data.image_url;
        //   setContent(fixedContent);
        //   console.log(fixedContent);
        //   await sendInput(input, fixedContent, image);
        //   console.log(neolineN3 != undefined);
        //   const tid=await createPost(neolineN3, nftid, encodeURIComponent(input));
        //   setTxnid(tid);
        // } else {
        //   console.log("error");
        // }
      } else {
        console.log("Account not found ");
      }
    } catch (err) {
      console.log(err);
    }
    setRefresh(true);
  };

  useEffect(() => {
    (async function () {
      const { data, error } = supabase
        ? await supabase
            .from("profile")
            .select("*")
            .eq("wallet_address", "NL2UNxotZZ3zmTYN8bSuhKDHnceYRnj6NR")
        : { data: null, error: new Error("supabase not initialized") };

      if (error) {
        console.log("ERROR!!");
        console.log(error);
      }
      console.log(data);
      setYourAccounts(data || []);
    })();
  }, []);
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
          <div className="w-full max-w-[160px] flex-col mt-4">
              <button
                disabled={!refresh}
                className="rounded-full top bg-secondary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold disabled:bg-gray-500  "
                onClick={() => {
                  refreshpage();
                }}
              >
                Refresh Page
              </button>
              
            </div>
            <div className="text-xl font-bold mt-5 justify-center">
              Txnid:{txnid}
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
        {!loading &&!imageSelect&& (
          <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-accent relative">
            <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
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
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Select Your Account
                  </label>
                  <select
                    id="countries"
                    className=" text-sm rounded-lg focus:border-accent block w-[300px] p-2.5 bg-secondary border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-accent"
                    onChange={(e) => {
                      e.target.value != "Choose Your NFT" &&
                      e.target.value != "No accounts"
                        ? setDisabled(false)
                        : setDisabled(true);
                      console.log(e.target.value);
                      setNftid(e.target.value);
                    }}
                  >
                    <option defaultValue={0} className="font-semibold">
                      Choose Your NFT
                    </option>
                    {yourAccounts.length == 0 ? (
                      <option className="font-semibold text-gray-300">
                        No accounts
                      </option>
                    ) : (
                      yourAccounts.map((item: any, id: any) => (
                        <option
                          value={item.userid}
                          key={id}
                          className="font-semibold"
                        >
                          {item.username}&nbsp;({item.userid})
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="w-full max-w-[100px] flex-col ml-5 pt-5">
                  <input
                    id="image-checkbox"
                    type="checkbox"
                    onClick={() => setImage(true)}
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-50"
                  />
                  <label
                    htmlFor="image-checkbox"
                    className="ml-2 text-sm font-medium  text-white"
                  >
                    Image
                  </label>
                </div>
                <div className="w-full max-w-[100px] flex-col mt-4">
                  <button
                    type="submit"
                    disabled={buttondisabled}
                    className="rounded-full top bg-secondary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold disabled:bg-gray-500  "
                    onClick={() => {
                      // sendInput();
                    }}
                  >
                    Post
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
