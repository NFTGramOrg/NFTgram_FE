"use client";
import React, { FormEvent, useEffect } from "react";
import useState from "react-usestateref";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import createPost from "@/utils/calls/setters/createPost";
const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
function NewPost({ neoline, neolineN3 }: { neoline: any; neolineN3: any }) {
  const [txnid,setTxnid]=useState<String>(' ');
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [buttondisabled, setDisabled] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [buttonclicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [nftid, setNftid] = useState("");
  const [image, setImage] = useState(false);
  const [image_url, setImageUrl] = useState("");
  const [yourAccounts, setYourAccounts] = React.useState<any>([]);
  

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
        const data = await res.json();
        if (data.image_url) {
          setImageUrl(data.image_url);
        }
        if (data.content) {
          let fixedContent = removeNonUTF8Characters(data.content);
          let image = data.image_url;
          setContent(fixedContent);
          console.log(fixedContent);
          await sendInput(input, fixedContent, image);
          console.log(neolineN3 != undefined);
          const tid=await createPost(neolineN3, nftid, encodeURIComponent(input));
          setTxnid(tid);
        } else {
          console.log("error");
        }
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
  return (
    neoline != undefined &&
    neolineN3 != undefined && (
      <>
      {loading&&(
        <div className="flex flex-col my-20 w-full h-11 text-2xl text-center justify-center items-center">
          <div role="status" >
                <svg aria-hidden="true" className=" w-8 h-8 mr-2  animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
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
        )}
        {!loading && (
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
