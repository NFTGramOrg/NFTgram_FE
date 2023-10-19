import createAccount from "@/utils/calls/setters/createAccount";
import { useWalletConnect } from "@cityofzion/wallet-connect-sdk-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Choose() {
  const wcSdk = useWalletConnect();
  const [newAccount, setNewAccount] = useState([]);
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
  return (
    <div className="overflow-x-hidden">
      <p className="text-2xl font-bold my-4">Your Accounts</p>
      {accounts.length == 0 ? (
        <p className="text-lg font-semibold text-gray-400 text-center">
          No Accounts
        </p>
      ) : (
        <div className="flex flex-row space-x-4">
          {accounts.map((account, id) => (
            <Link href={"/profile/" + account.id}>
              <div className="flex flex-col  bg-slate-200 rounded-l">
                <Image
                  src={account.image}
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
                  {account.id.substring(0, 4) +
                    "..." +
                    account.id.substring(account.id.length - 4)}
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
