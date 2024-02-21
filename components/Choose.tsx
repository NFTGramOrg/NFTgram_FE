import createAccount from "@/utils/calls/setters/createAccount";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import getAccount from "@/utils/calls/getters/getAccount";
import plus from "@/public/square-plus.svg"
type Value = {
  type: string;
  value: any;
};

type ByteStringValue = Value & {
  type: "ByteString";
  value: string;
};

type MapValue = Value & {
  type: "Map";
  value: Array<{
    key: Value;
    value: Value;
  }>;
};

type IntegerValue = Value & {
  type: "Integer";
  value: number;
};

type DataItem = ByteStringValue | MapValue | IntegerValue;

const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
function Choose({ neoline, neolineN3 }: { neoline: any; neolineN3: any }) {
  const [tranDone, setTranDone] = useState(false);
  const [newAccount, setNewAccount] = useState<DataItem[]>([]);
  const [yourAccounts, setYourAccounts] = useState<any>([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [txnid, setTxnid] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftTokenId, setNftTokenId] = useState("");
  const [nftContractAddress, setNftContractAddress] = useState("");



  const nfts = [ 
    {
    name: "bean",
    image:
      "https://deegrjwtmqprtizddphp.supabase.co/storage/v1/object/public/images/111.jpg?t=2023-11-06T16%3A09%3A36.046Z",
  },
  {
    name: "solrock",
    image: "https://randompokemon.com/sprites/normal/solrock.png",
  },
  {
    name: "horsea",
    image: "https://randompokemon.com/sprites/normal/horsea.png",
  },
  {
    name: "dragapult",
    image: "https://randompokemon.com/sprites/normal/dragapult.png",
  },
  ];

  useEffect(() => {
    (async function () {
      // const walletAddress =
      //   wcSdk.getAccountAddress() || "NL2UNxotZZ3zmTYN8bSuhKDHnceYRnj6NR";
      // console.log(walletAddress);
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
      console.log("Hindjndsnohi");
      const returnData = await getAccount(
        neolineN3,
        "ynTsgQbdk0dFAPeygUAZxvO8eJcC"
      );
      console.log(returnData);
    })();
  }, [tranDone]);
  const refreshpage = async () => {
    // setRefresh(false);
    const returnData = await getAccount(
      neolineN3,
      "ynTsgQbdk0dFAPeygUAZxvO8eJcJ"
    );
    setNewAccount(returnData);
    console.log(returnData);
    const { data, error } = supabase
      ? await supabase
          .from("profile")
          .insert([
            {
              id: 6,
              userid: returnData[0].value,
              username: `${nfts[0].name}`,
              profilepic: `${nfts[0].image}`,
              nftdesc: "talking green bean wearing a brown hoodie",
              desc: "I like Burrittoss <3!",
              wallet_address: "NL2UNxotZZ3zmTYN8bSuhKDHnceYRnj6NR",
              followers: 0,
              following: 0,
              kind: returnData[3].value[0].value.value,
              funny: returnData[3].value[1].value.value,
              sad: returnData[3].value[2].value.value,
              angry: returnData[3].value[3].value.value,
              popularity: 0,
            },
          ])
          .select()
      : {
          data: null,
          error: new Error("Supabase client is not initialized"),
        };
    console.log(error);
    console.log(data);
    setLoading(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(nftContractAddress);
    console.log(nftName);
    console.log(nftDescription  );
    console.log(nftTokenId);

  };
  return (
    <div className="overflow-x-hidden">
      <p className="text-2xl font-bold mt-4 mb-8 text-white">Your Accounts</p>
      {loading && (
        <div className="flex flex-col my-20 w-full h-11 text-2xl text-center justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className=" w-8 h-8 mr-2  animate-spin text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <div className="w-full max-w-[160px] flex-col mt-4">
            <button
              disabled={!refresh}
              className="rounded-full top bg-secondary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold disabled:bg-gray-500  "
              onClick={async () => {
                await refreshpage();
              }}
            >
              Refresh Page
            </button>
          </div>
          <div className="text-lg font-bold mt-5 justify-center">
            Txnid {txnid}
          </div>
        </div>
      )}
      {yourAccounts.length == 0 ? (
        <p className="text-lg font-semibold text-gray-400 text-center mb-16">
          No Accounts
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-16">
          {yourAccounts.map((account: any, id: any) => (
            <Link href={"/profile/" + account.userid} key={id}>
              <div className="flex flex-col  bg-slate-200 rounded-lg">
                <Image
                  src={account.profilepic}
                  height={200}
                  width={200}
                  alt=""
                  className=" g "
                ></Image>
                <div className="h-[1px] bg-black mx-1" />
                <p
                  className="font-bold pl-2 text-secondary text-center"
                  key={id}
                >
                  {account.name}
                </p>
                <p className="font-bold pl-2 text-black text-center">
                  {account.userid.substring(0, 4) +
                    "..." +
                    account.userid.substring(account.userid.length - 4)}
                </p>
              </div>
            </Link>
          ))}
          {newAccount.length > 0 && (
            <Link href={`/profile/${newAccount[0].value}`} key={6}>
              <div
                key={6}
                className="flex flex-col  bg-slate-200 rounded-lg cursor-pointer"
              >
                <Image
                  src={"./bean.jpg"}
                  height={200}
                  width={200}
                  alt=""
                ></Image>
                <div className="h-[1px] bg-black mx-1" />

                <p className="font-bold pl-2 text-black text-center">
                  {newAccount[0].value.substring(0, 4) +
                    "..." +
                    newAccount[0].value.substring(
                      newAccount[0].value.length - 4
                    )}
                </p>
              </div>
            </Link>
          )}
        </div>
      )}
      <p className="text-2xl font-bold my-4 text-white">
        Choose NFT to create Account For
      </p>
      
      {nfts.length == 0 ? (
        <div className="flex items-center justify-center mt-10">
        {/* <p className="text-lg font-semibold text-gray-400 text-center">
          No NFTs</p> */}
          <button className=" w-1/3  rounded-full bg-secondary px-2 py-4  text-xl font-semibold text-center hover:bg-opacity-70 transition duration-200 pb-6 text-white" onClick={()=>setShowModal(true)}>
            Import NFT
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {tranDone ? (
            <div
              key={1}
              className="flex flex-col  bg-slate-200 rounded-lg cursor-pointer"
              onClick={() => {
                (async function () {
                  try {
                    // const newAccount = await createAccount(wcSdk, nfts[1].name);
                    // console.log(newAccount);
                    setTranDone(true);
                  } catch (e) {
                    console.log(e);
                  }
                })();
              }}
            >
              <Image
                src={nfts[1].image}
                height={200}
                width={200}
                alt=""
              ></Image>
              <div className="h-[1px] bg-black mx-1" />
              <p className="font-bold pl-2 text-secondary text-center" key={1}>
                {nfts[1].name}
              </p>
            </div>
          ) : (
            nfts.map((nft, id) => (
              <div
                key={id}
                className="flex flex-col  bg-slate-200 rounded-lg cursor-pointer"
                onClick={() => {
                  (async function () {
                    try {
                      setLoading(true);
                      const txId = await createAccount(neolineN3, "CQ==");
                      setTxnid(txId);
                    } catch (e) {
                      console.log(e);
                    }
                  })();
                }}
              >
                <Image src={nft.image} height={200} width={200} alt=""></Image>
                <div className="h-[1px] bg-black mx-1" />
                <p
                  className="font-bold pl-2 text-secondary text-center"
                  key={id}
                >
                  {nft.name}
                </p>
              </div>
              
            ))
            
          )}
          <div>
            <Image src={plus} height={150} width={150} alt="" className={`ml-5 mt-10  justify-center transition-transform duration-300 transform ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
        ></Image>
        </div>
        
        </div>
      )}
      {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full backdrop-blur-sm opacity-40 bg-black"
                            onClick={() => setShowModal(false)}
                        ></div>
                         <div className="relative w-full max-w-xl  p-4 mx-auto bg-bgcolor rounded-xl shadow-lg my-60">
                          <h2 className=" text-lg font-bold text-center">Import Your NFT</h2>
                        <form className="max-w-md mx-auto pt-3 " 
                        onSubmit={handleSubmit}>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" onChange={(e)=>{setNftName(e.target.value)}} name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2   text-white border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NFT Name</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" onChange={(e)=>{setNftDescription(e.target.value)}}  name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                              <div className="relative z-0 w-full mb-5 group">
                                  <input onChange={(e)=>{setNftTokenId(e.target.value)}} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Token ID</label>
                              </div>
                              <div className="relative z-0 w-full mb-5 group">
                                  <input onChange={(e)=>{setNftContractAddress(e.target.value)}} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contract Address  </label>
                              </div>
                            </div>

                            <button onClick={()=>console.log("hello")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Import NFT</button>
                            <button onClick={()=>setShowModal(false)} className="text-white bg-red-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:hover:bg-red-800 dark:focus:ring-blue-800 ml-3">Close</button>

                          </form>
                          </div>
                    </div>
                </>
            ) : null}
    </div>
  );
}

export default Choose;
