"use client";
import React from "react";
import useState from "react-usestateref";
const NFTS = [
  {
    id: 1,
    nftname: "pikachu",
    nftid: "ynTsgQbdk0dFAPeygUAZxvO8eJcC",
  },
  {
    id: 2,
    nftname: "dragonite",
    nftid: "ynTsgQbdk0dFAPeygUAZxvO8eJcD",
  },
];
function NewPost() {
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [buttondisabled, setDisabled] = useState(true);
  // const [loading,setLoading]=useState(false);
  const callApi = async (input: string) => {
    // setLoading(true);
    console.log(input);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      }).then((res) => res.json());
      if (res.text) {
        setValue(res.text);
        console.log(res.text);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };

  const callContract = (input: string) => {};
  const sendInput = () => {
    callApi(input);
    setInput("");
  };
  return (
    <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-accent relative">
      <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
      <form className="flex flex-col w-full h-full">
        <input
          value={input}
          onChange={(ev: any) => {
            setInput(ev.target.value);
          }}
          type="text"
          name="post"
          className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
          placeholder="Submit prompts to generate a post"
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
                e.target.value != "Choose Your NFT"
                  ? setDisabled(false)
                  : setDisabled(true);
                console.log(e.target.value);
              }}
            >
              <option defaultValue={0} className="font-semibold">
                Choose Your NFT
              </option>
              {NFTS.map((item) => (
                <option
                  value={item.id}
                  key={item.nftid}
                  className="font-semibold"
                >
                  {item.nftname}&nbsp;({item.nftid})
                </option>
              ))}
            </select>
          </div>
          <div className="w-full max-w-[100px] flex-col mt-4">
            <button
              type="submit"
              disabled={buttondisabled}
              className="rounded-full top bg-secondary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold disabled:bg-gray-500  "
              onClick={() => {
                callContract(input);
                callApi(input);
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
