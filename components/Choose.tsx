import createAccount from "@/utils/calls/setters/createAccount";
import { SUPABASE_KEY, SUPABASE_URL } from "@/utils/constants";
import { useWalletConnect } from "@cityofzion/wallet-connect-sdk-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
function Choose() {
  const wcSdk = useWalletConnect();
  const [newAccount, setNewAccount] = useState([]);
  const [yourAccounts, setYourAccounts] = useState<any>([]);
  const accounts = [
    {
      id: "ynTsgQbdk0dFAPeygUAZxvO8eJcD",
      name: "granbull",
      content:
        "🌟 Just discovered a hidden gem of a cafe in my neighborhood. The latte art here is on point, and the pastries are divine! 😍☕ #LocalEats #CoffeeLover",
      image: "https://randompokemon.com/sprites/normal/granbull.png",
    },
    {
      id: "ynTsgQbdk0dFAPeygUAZxvO8eJcC",
      name: "machop",
      content:
        "🚀 Exciting news! I've officially booked my tickets for that long-awaited vacation. Time to dust off the suitcase and get ready for some adventure! ✈️🌴 #Wanderlust",
      image: "https://randompokemon.com/sprites/normal/machop.png",
      contentimageurl: "https://randompokemon.com/sprites/normal/machop.png",
    },
    {
      id: "ynTsgQbdk0dFAPeygUAZxvO8eJcE",
      name: "pikachu",
      content:
        "🌟 Just discovered a hidden gem of a cafe in my neighborhood. The latte art here is on point, and the pastries are divine! 😍☕ #LocalEats #CoffeeLover",
      image: "https://randompokemon.com/sprites/normal/pikachu.png",
    },
  ];

  const nfts = [
    {
      name: "alcremie",
      image: "https://randompokemon.com/sprites/normal/alcremie.png",
    },
    {
      name: "solrock",
      image: "https://randompokemon.com/sprites/normal/solrock.png",
    },
  ];

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
  }, []);

  return (
    <div className="overflow-x-hidden">
      <p className="text-2xl font-bold mt-4 mb-8">Your Accounts</p>
      {yourAccounts.length == 0 ? (
        <p className="text-lg font-semibold text-gray-400 text-center mb-16">
          No Accounts
        </p>
      ) : (
        <div className="flex flex-row space-x-4 mb-16">
          {yourAccounts.map((account, id) => (
            <Link href={"/profile/" + account.userid} key={id}>
              <div className="flex flex-col  bg-slate-200 rounded-l">
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
        <div className="flex flex-row space-x-4">
          {nfts.map((nft, id) => (
            <div
              key={id}
              className="flex flex-col  bg-slate-200 rounded-l cursor-pointer"
              onClick={() => {
                (async function () {
                  const newAccount = await createAccount(wcSdk, nft.name);
                  console.log(newAccount);
                })();
              }}
            >
              <Image
                src={nft.image}
                height={200}
                width={200}
                alt=""
                className=" g "
              ></Image>
              <div className="h-[1px] bg-black mx-1" />
              <p className="font-bold pl-2 text-secondary text-center" key={id}>
                {nft.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Choose;
