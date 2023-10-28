import createAccount from "@/utils/calls/setters/createAccount";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import getAccount from "@/utils/calls/getters/getAccount";
type Value = {
    type: string;
    value: any;
};

type ByteStringValue = Value & {
    type: 'ByteString';
    value: string;
};

type MapValue = Value & {
    type: 'Map';
    value: Array<{
        key: Value;
        value: Value;
    }>;
};

type IntegerValue = Value & {
    type: 'Integer';
    value: number;
};

type DataItem = ByteStringValue | MapValue | IntegerValue;

const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
function Choose({ neoline, neolineN3 }: { neoline: any; neolineN3: any }) {
  const [tranDone, setTranDone] = useState(false);
  const [newAccount, setNewAccount] = useState<DataItem[]>([]);
  const [yourAccounts, setYourAccounts] = useState<any>([]);
  const [refresh,setRefresh]=useState(true)
  const [loading, setLoading] = useState(false);
  const [txnid, setTxnid] = useState("");
  
  const nfts = [
    
    {
      name: "bean",
      image: "https://send.fs.neo.org/gate/get/GtQYvGLzvi2GiV4WeR8iYyq4D4H9uAkfgEX7CS7zrpQ9",
    },
    {
      name: "solrock",
      image: "https://randompokemon.com/sprites/normal/solrock.png",
    },
    {
      name: "horsea",
      image: "https://send.fs.neo.org/gate/get/9PhC4JqN7yFQ1mZXrQ6drYJmQDNM13WrytKqw19TNQcL",
    },
    {
      name: "dragapult",
      image: "https://send.fs.neo.org/gate/get/BvhBYdBpahvUv5d6wqfPokZi2xeZwpDNJF6xjUMSZjsD",
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
      console.log("Hindjndsnohi")
   const returnData=await getAccount(neolineN3,"ynTsgQbdk0dFAPeygUAZxvO8eJcC")
      console.log(returnData)
    })();
  }, [tranDone]);
  const refreshpage = async() => {
    // setRefresh(false);
   const returnData=await getAccount(neolineN3,"ynTsgQbdk0dFAPeygUAZxvO8eJcJ")
   setNewAccount(returnData)
    console.log(returnData)
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
                                wallet_address:
                                  "NL2UNxotZZ3zmTYN8bSuhKDHnceYRnj6NR",
                                followers: 0,
                                following: 0,
                                kind: returnData[3].value[0].value.value,
                                funny: returnData[3].value[1].value.value,
                                sad:  returnData[3].value[2].value.value,
                                angry:  returnData[3].value[3].value.value,
                                popularity: 0,
                              },
                            ])
                            .select()
                        : {
                            data: null,
                            error: new Error(
                              "Supabase client is not initialized"
                            ),
                          };
                          console.log(error)
                      console.log(data);
    setLoading(false);
  };
  return (
    <div className="overflow-x-hidden">
      <p className="text-2xl font-bold mt-4 mb-8">Your Accounts</p>
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
                onClick={async() => {
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
          {newAccount.length>0 &&   (
              <Link href={`/profile/${newAccount[0]}`} key={6}>
                <div
                  key={6}
                  className="flex flex-col  bg-slate-200 rounded-lg cursor-pointer"
                >
                  <Image
                    src={"https://send.fs.neo.org/gate/get/GtQYvGLzvi2GiV4WeR8iYyq4D4H9uAkfgEX7CS7zrpQ9"}
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
      <p className="text-2xl font-bold my-4">
        Choose NFT to create Account For
      </p>
      {nfts.length == 0 ? (
        <p className="text-lg font-semibold text-gray-400 text-center">
          No NFTs
        </p>
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
                      const txId= await createAccount(neolineN3, "CQ==");
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
        </div>
      )}
    </div>
  );
}

export default Choose;
