"use client";
import React, { FormEvent, useEffect } from "react";
import useState from "react-usestateref";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import { useWalletConnect } from "@cityofzion/wallet-connect-sdk-react";

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

function NewPost() {
  const wcSdk = useWalletConnect();

  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [buttondisabled, setDisabled] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [buttonclicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nftid, setNftid] = useState("");
  const [yourAccounts, setYourAccounts] = React.useState<any>([]);

  const callApi = async (input: string) => {
    setLoading(true);
    setPrompt(input);
    console.log(input);
    try {
      if (nftid === "") {
        throw new Error("Input is empty");
      }
      const res = await fetch("/api/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      if (data.content) {
        setValue(data.content);
        console.log(data.content);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async function () {
      const walletAddress =
        wcSdk.getAccountAddress() || "NL2UNxotZZ3zmTYN8bSuhKDHnceYRnj6NR";
      console.log(walletAddress);
      const { data, error } = supabase
        ? await supabase
            .from("profile")
            .select("*")
            .eq("wallet_address", walletAddress)
        : { data: null, error: new Error("supabase not initialized") };

      if (error) {
        console.log("ERROR!!");
        console.log(error);
      }
      console.log(data);
      setYourAccounts(data || []);
    })();

    (async function () {
      const { data, error } = supabase
        ? await supabase
            .from("tweets")
            .insert([
              { userid: `${nftid}`, prompt: `${prompt}`, gen: `${value}` },
            ])
            .select()
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const form_values = Object.fromEntries(formData);
    callApi(form_values.post.toString());
  }

  const callContract = (input: string) => {};
  const sendInput = () => {
    setButtonClicked(true);
  };
  return (
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
                yourAccounts.map((item, id) => (
                  <option value={item.nftid} key={id} className="font-semibold">
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
                sendInput();
              }}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewPost;
