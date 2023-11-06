import React from "react";
import Image from "next/image";
import Feed from "./Feed";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import getAccount from "@/utils/calls/getters/getAccount";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { SUPABASE_URL, SUPABASE_KEY } from "@/utils/constants";
import Link from "next/link";
import follow from "@/utils/calls/setters/follow";
import getIsFollowing from "@/utils/calls/getters/getIsFollowing";
import unfollow from "@/utils/calls/setters/unfollow";
const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function Profile({
  neoline,
  neolineN3,
  accountId,
  changePage,
}: {
  neoline: any;
  neolineN3: any;
  accountId: string;
  changePage: any;
}) {
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);
  const [txHash, setTxHash] = useState<string>("");
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mynft, setMynft] = useState<boolean>(false);
  const followhandler = async (follow: string, by: string) => {
    const { data, error } = supabase
      ? await supabase.rpc("follow", { follow: follow, by: by })
      : { data: null, error: new Error("supabase not initialized") };
  };
  const unfollowhandler = async (unfollow: string, by: string) => {
    const { data, error } = supabase
      ? await supabase.rpc("unfollow", { follow: unfollow, by: by })
      : { data: null, error: new Error("supabase not initialized") };
  };

  async function updateIsFollowing(selectedAccount: string) {
    const retData = await getIsFollowing(
      neoline,
      selectedAccount == "" ? account : selectedAccount,
      accountId
    );
    setIsFollowing(retData);
  }

  useEffect(() => {
    (async function () {
      await updateIsFollowing("");
    })();
  }, []);
  useEffect(() => {
    (async function () {
      const { data, error } = supabase
        ? await supabase
            .from("profile")
            .select(`*`)
            .eq("userid", accountId || "ynTsgQbdk0dFAPeygUAZxvO8eJcC")
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };
      if (error) {
        console.log(error);
      } else if (data.length > 0) {
        console.log(data[0]);
        setSelectedAccount(data[0]);
        if (data[0].wallet_address == "NL2UNxotZZ3zmTYN8bSuhKDHnceYRnj6NR") {
          setMynft(true);
          console.log(mynft);
        }
      } else {
        console.log("Seleceted Account not fetched");
        // router.push("/404");
      }
      // if (wcSdk.isConnected()) {
      //   console.log("is connected");
      //   const fetchedAccount = await getAccount(wcSdk, accountId);
      //   console.log(fetchedAccount);
      //   setAccount(fetchedAccount);
      // } else {
      //   console.log("Not connected");
      // }
    })();

    (async function () {
      const { data, error } = supabase
        ? await supabase
            .from("tweets")
            .select("*")
            .eq("userid", accountId || "ynTsgQbdk0dFAPeygUAZxvO8eJcC")
        : { data: null, error: new Error("supabase not initialized") };
      if (error) {
        console.log("ERROR!!");
        console.log(error);
      }
      console.log(data);
      setPosts(data || []);
    })();

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
      setAccounts(data || []);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  console.log(accountId, "accountid");

  return (
    selectedAccount &&
    accounts.length > 0 && (
      <div>
        <div className="w-full bg-cover bg-no-repeat bg-center height: 200px;background-image: url(https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200);">
          <Image
            className=" w-full h-full"
            width={1080}
            height={200}
            src="/nftgram_cover.jpg"
            alt=""
          />
        </div>

        <div className="p-4">
          <div className="relative flex w-full">
            <div className="flex flex-1">
              <div className=" mt-[-4rem]">
                <div className="height:9rem width:9rem md rounded-full relative avatar">
                  <Image
                    className="md rounded-full relative border-4 border-gray-200 bg-gray-100"
                    src={selectedAccount && selectedAccount.profilepic}
                    alt=""
                    width={100}
                    height={100}
                  />
                  <div className="absolute"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <div>
                <select
                  id="countries"
                  className={
                    !mynft
                      ? "hidden"
                      : `text-sm rounded-lg focus:border-accent block w-[300px] p-2.5 bg-secondary border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-accent`
                  }
                  onChange={(e) => {
                    console.log("HEYYY" + e.target.value);
                    changePage(e.target.value);
                    setAccount(e.target.value);
                  }}
                >
                  <option defaultValue={0} className="font-semibold">
                    Choose Your Account
                  </option>
                  {accounts.map((item: any, index: any) => (
                    <option
                      value={item.userid}
                      key={index}
                      className="font-semibold"
                    >
                      {item.username}&nbsp;({item.userid})
                    </option>
                  ))}
                </select>
                <div className="flex">
                  <select
                    id="countries"
                    className={
                      mynft
                        ? "hidden"
                        : `text-sm mr-5 rounded-lg focus:border-accent block w-[300px] p-2.5 bg-secondary border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-accent`
                    }
                    onChange={async (e) => {
                      console.log("HEYYY" + e.target.value);
                      if (e.target.value == "Choose Your Account") {
                        setAccount("");
                        await updateIsFollowing("");
                      } else {
                        setAccount(e.target.value);
                        await updateIsFollowing(e.target.value);
                      }
                    }}
                  >
                    <option defaultValue={0} className="font-semibold">
                      Choose Your Account
                    </option>
                    {accounts.map((item: any, index: any) => (
                      <option
                        value={item.userid}
                        key={index}
                        className="font-semibold"
                      >
                        {item.username}&nbsp;({item.userid})
                      </option>
                    ))}
                  </select>
                  <button
                    className={
                      mynft
                        ? "hidden"
                        : "rounded-full top bg-secondary px-8 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold disabled:bg-gray-500 -mr-2 "
                    }
                    disabled={account == ""}
                    onClick={async () => {
                      if (!isFollowing) {
                        const hash = await follow(
                          neolineN3,
                          account,
                          accountId
                        );
                        setTxHash(hash);
                        followhandler(accountId, account);
                      } else {
                        const hash = await unfollow(
                          neolineN3,
                          account,
                          accountId
                        );
                        setTxHash(hash);
                        unfollowhandler(accountId, account);
                      }

                      // sendInput();
                    }}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
                {txHash != "" && (
                  <p className="mt-2 font-semibold">Tx hash: {txHash}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="mb-4 space-y-1 justify-center w-full mt-3 ml-3">
              <div>
                <h2 className="text-xl leading-6 font-bold text-white">
                  {selectedAccount && selectedAccount.username}
                </h2>
                <p className="text-sm leading-6 font-medium text-gray-600">
                  @{selectedAccount && selectedAccount.userid}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-white leading-tight mb-2 ml-5">
                  {selectedAccount && selectedAccount.desc}
                </p>
                <div className="text-gray-600 flex">
                  <span className="flex mr-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 paint-icon"
                      fill="#ffffff"
                    >
                      <g>
                        <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
                        <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
                      </g>
                    </svg>{" "}
                    <a
                      href="https://nftgram.in/"
                      target="#"
                      className="leading-5 ml-1 text-blue-400"
                    >
                      https://nftgram.in/
                    </a>
                  </span>
                  <span className="flex mr-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 paint-icon"
                      fill="#ffffff"
                    >
                      <g>
                        <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                        <circle cx="7.032" cy="8.75" r="1.285"></circle>
                        <circle cx="7.032" cy="13.156" r="1.285"></circle>
                        <circle cx="16.968" cy="8.75" r="1.285"></circle>
                        <circle cx="16.968" cy="13.156" r="1.285"></circle>
                        <circle cx="12" cy="8.75" r="1.285"></circle>
                        <circle cx="12" cy="13.156" r="1.285"></circle>
                        <circle cx="7.032" cy="17.486" r="1.285"></circle>
                        <circle cx="12" cy="17.486" r="1.285"></circle>
                      </g>
                    </svg>{" "}
                    <span className="leading-5 ml-1">
                      {selectedAccount && selectedAccount.created_at}
                    </span>
                  </span>
                </div>
              </div>
              <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                <div className="text-center pr-3">
                  <span className="font-bold text-white">
                    {selectedAccount && selectedAccount.following}
                  </span>
                  <span className="text-gray-500"> Following</span>
                </div>
                <div className="text-center px-3">
                  <span className="font-bold text-white">
                    {selectedAccount && selectedAccount.followers}
                  </span>
                  <span className="text-gray-500"> Followers</span>
                </div>
                <div className="text-center px-3">
                  <span className="font-bold text-white">
                    {selectedAccount && selectedAccount.popularity}
                  </span>
                  <span className="text-gray-500"> Popularity</span>
                </div>
              </div>
            </div>
            <div className="w-1/5 mr-32 mt-4">
              <div className="flex">
                <GaugeChart
                  id="gauge-chart1"
                  nrOfLevels={3}
                  colors={["#865DFF", "#FFA3FD"]}
                  needleColor="#865DFF"
                  needleBaseColor="#865DFF"
                  percent={selectedAccount && selectedAccount.kind / 100}
                  formatTextValue={(value) => value + "% Kind"}
                />
                <GaugeChart
                  id="gauge-chart1"
                  nrOfLevels={3}
                  colors={["#865DFF", "#FFA3FD"]}
                  needleColor="#865DFF"
                  needleBaseColor="#865DFF"
                  percent={selectedAccount && selectedAccount.funny / 100}
                  formatTextValue={(value) => value + "% Funny"}
                />
              </div>
              <div className="flex">
                <GaugeChart
                  id="gauge-chart1"
                  nrOfLevels={3}
                  colors={["#865DFF", "#FFA3FD"]}
                  needleColor="#865DFF"
                  needleBaseColor="#865DFF"
                  percent={selectedAccount && selectedAccount.sad / 100}
                  formatTextValue={(value) => value + "% Sad"}
                />
                <GaugeChart
                  id="gauge-chart1"
                  nrOfLevels={3}
                  colors={["#865DFF", "#FFA3FD"]}
                  needleColor="#865DFF"
                  needleBaseColor="#865DFF"
                  percent={selectedAccount && selectedAccount.angry / 100}
                  formatTextValue={(value) => value + "% Angry"}
                />
              </div>
            </div>
          </div>
          {posts.map((post: any, index: any) => (
            <Feed
              key={index}
              name={selectedAccount.username}
              postId={post.id}
              userId={post.userid}
              userImage={selectedAccount.profilepic}
              image={post.image}
              content={post.gen}
              createdAt={post.created_at}
              reactions={[post.happy, post.sad, post.angry, post.love]}
            />
          ))}
        </div>
        <hr className="border-gray-800" />
      </div>
    )
  );
}

export default Profile;
