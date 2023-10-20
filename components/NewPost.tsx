"use client";
import React, { FormEvent, useEffect } from "react";
import useState from "react-usestateref";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import createPost from "@/utils/calls/setters/createPost";

const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
// const NFTS = [
//   {
//     id: 1,
//     nftname: "pikachu",
//     nftid: "ynTsgQbdk0dFAPeygUAZxvO8eJcC",
//   },
//   {
//     id: 2,
//     nftname: "dragonite",
//     nftid: "ynTsgQbdk0dFAPeygUAZxvO8eJcD",
//   },
// ];

function NewPost({ neoline, neolineN3 }: { neoline: any; neolineN3: any }) {
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [buttondisabled, setDisabled] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [buttonclicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nftid, setNftid] = useState("");
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
        const { kind, sad, funny, angry } = account[0];
        const res = await fetch("/api/createpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: input, kind, sad, funny, angry }),
        });
        const data = await res.json();
        if (data.content) {
          let fixedContent = removeNonUTF8Characters(data.content);
          setContent(fixedContent);
          console.log(fixedContent);
          await sendInput(input, fixedContent);
          console.log(neolineN3 != undefined);
          await createPost(neolineN3, nftid, input);
        } else {
          console.log("error");
        }
      } else {
        console.log("Account not found ");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
    callApi(form_values.post.toString().toLowerCase());
  }

  const sendInput = async (prompt: string, gen: string) => {
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
              image: null,
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
    )
  );
}

export default NewPost;
