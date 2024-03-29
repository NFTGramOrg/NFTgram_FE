import React from "react";
import Link from "next/link";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsEnvelope, BsThreeDots } from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import Image from "next/image";
import { useState, useEffect } from "react";
import getBalance from "@/utils/calls/getters/getBalance";
import getAccount from "@/utils/calls/getters/getAccount";
import { useLayoutContext } from "./LayoutContext";
import neolien from "@/public/neoline.jpeg"
const NAVIGATION_ITEMS = [
  {
    title: "Home",
    link: "home",
    icon: BiHomeCircle,
  },
  {
    title: "Profile",
    link: "profile",
    icon: BiUser,
  },
  {
    title: "Trending",
    link: "home",
    icon: HiOutlineHashtag,
  },
];
const refreshpage = () => {
  window.location.reload();
};
const Leftbar = () => {
  const { neoline, neolineN3 } = useLayoutContext();

  const [neoBalance, setNeoBalance] = useState<string>("0");
  const [gasBalance, setGasBalance] = useState<string>("0");

  useEffect(() => {
    (async function () {
      if (neolineN3) {
        const { gas, neo } = await getBalance(neolineN3);
        setNeoBalance(neo);
        setGasBalance(gas);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [neoline, neolineN3]);

  return (
    <section className="fixed w-72 flex flex-col items-stretch h-screen my-4 mr-5">
      <div className="flex-col items-stretch h-full space-y-4 my-4">
        <Link href={"/"} className="my-4">
          <div className="flex flex-row">
            <Image
              src="/nftgram.png"
              width={50}
              height={50}
              alt=""
              className="flex flex-col mx-3 rounded-full"
            />
            <div className="flex flex-col justify-center text-xl font-extrabold text-white  ">
              NFTGram
            </div>
          </div>
        </Link>
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            className="hover:bg-white/10 text-xl font-bold transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6"
            key={item.title}
            href={`/${item.link}`}
          >
            <div>
              <item.icon color="white" />
            </div>
            <div className="text-white">{item.title}</div>
          </Link>
        ))}
        <div className="pt-5">
          <Link href={"/home"}>
          <button className=" w-3/4  rounded-full bg-secondary px-2 py-4  text-xl font-semibold text-center hover:bg-opacity-70 transition duration-200 text-white" onClick={refreshpage}>
            Switch NFT
          </button>
          </Link>
        </div>
      </div>
      <button className="rounded-full flex items-center space-x-2 bg-transparent p-4 text-center hover:bg-white/10 transition duration-200 w-full justify-between mb-5">
        <div className="flex items-center space-x-2">
          <Image
            className="rounded-full  "
            src={neolien}
            width={40}
            height={40}
            alt=""
          ></Image>
          <div className="text-left text-sm">
            <div className="font-semibold ">
            <select className=" backdrop-blur-sm  bg-bgcolor ">
              <option value="0" className="">Testnet</option>
              <option value="1">Mainnet</option>
            </select>

            </div>
            <div className="text-white ml-1">NEO</div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="mx-6">
            <Image
              src={
                "https://cdn.neoline.io/logo/neo3/0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5.png"
              }
              width={25}
              height={25}
              alt=""
              className="flex align-items-center flex-col mx-auto rounded-lg bg-white p-1"
            ></Image>
            <p className="text-xs mt-1 text-white">
              {neoBalance}&nbsp;
              <span className="text-xs font-semibold">NEO</span>
            </p>
          </div>
          <div>
            <Image
              src={
                "https://cdn.neoline.io/logo/neo3/0xd2a4cff31913016155e38e474a2c06d08be276cf.png"
              }
              width={25}
              height={25}
              alt=""
              className="flex align-items-center flex-col mx-auto rounded-lg bg-white p-1"
            ></Image>
            <p className="text-xs mt-1 text-white">
              {gasBalance}&nbsp;
              <span className="text-xs font-semibold">GAS</span>
            </p>
          </div>
        </div>
      </button>
    </section>
  );
};

export default Leftbar;
