import React from "react";
import Image from "next/image";
import Feed from "./Feed";
import GaugeChart from 'react-gauge-chart'

const NFTS = [
  {
    nftname: "Bored Ape 1",
    nftid: "0",
  },
  {
    nftname: "Bored Ape 2",
    nftid: "3",
  },
];
const placeholderContent = [
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
  },
  {
    id: "knTsgQbdk0dFAPeagUAZxxvO8eJcl",
    name: "geodude",
    content:
      "Yo check this pic out",
    image: "https://randompokemon.com/sprites/normal/geodude.png",
    contentimageurl: "https://randompokemon.com/sprites/normal/machop.png",
  },
];
const user =
{uname:"Boredape1",
  uprofilepic:"/pp.png",
  uhandle:"@ynTsgQbdk0dFAPeygUAZxvO8eJcC",
  udesc:"I'm just chilling in the jungle.",
  uweb:"https://iambored.com",
  ujoined:"December, 2022",
  ufollowing:"520",
  ufollowers:"234",
  popularity:"2",
  kind:0.39,
  funny:0.89,
  sad:0.59,
  angry:0.09
}
function Profile() {
  return (
    <div>
      <div className="w-full bg-cover bg-no-repeat bg-center height: 200px;background-image: url(https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200);">
        <Image className=" w-full h-full" width={1080} height={200} src="/nftgram_cover.jpg" alt=""/>
      </div>
      
      <div className="p-4">
        <div className="relative flex w-full">
          <div className="flex flex-1">
            <div className=" mt-[-4rem]">
              <div className="height:9rem width:9rem md rounded-full relative avatar">
                <Image
                  className="md rounded-full relative border-4 border-gray-200"
                  src={user.uprofilepic}
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
                className=" text-sm rounded-lg focus:border-accent block w-[300px] p-2.5 bg-secondary border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-accent"
              >
                <option defaultValue={1}>Choose Your NFT</option>
                {NFTS.map((item) => (
                  <option value={item.nftid} key={item.nftid}>
                    {item.nftname}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex">
                 
        <div className="mb-4 space-y-1 justify-center w-full mt-3 ml-3">
          <div>
            <h2 className="text-xl leading-6 font-bold text-white">
              {user.uname}
            </h2>
            <p className="text-sm leading-6 font-medium text-gray-600">
              {user.uhandle}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-white leading-tight mb-2 ml-5">
              {user.udesc}
            </p>
            <div className="text-gray-600 flex">
              <span className="flex mr-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon" fill="#ffffff">
                  <g>
                    <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
                    <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
                  </g>
                </svg>{" "}
                <a
                  href={user.uweb}
                  target="#"
                  className="leading-5 ml-1 text-blue-400"
                >
                  {user.uweb}
                </a>
              </span>
              <span className="flex mr-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon" fill="#ffffff">
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
                <span className="leading-5 ml-1">{user.ujoined}</span>
              </span>
            </div>
          </div>
          <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
            <div className="text-center pr-3">
              <span className="font-bold text-white">{user.ufollowing}</span>
              <span className="text-gray-500"> Following</span>
            </div>
            <div className="text-center px-3">
              <span className="font-bold text-white">{user.ufollowers} </span>
              <span className="text-gray-500"> Followers</span>
            </div>
            <div className="text-center px-3">
              <span className="font-bold text-white">{user.popularity} </span>
              <span className="text-gray-500"> Popularity</span>
            </div>
          </div>
        </div>
        <div className="w-1/5 mr-32 mt-4">
            <div className="flex">
            <GaugeChart id="gauge-chart1" nrOfLevels={1} colors={["#865DFF","#FFA3FD"]} needleColor="#865DFF" needleBaseColor="#865DFF"percent={user.kind} formatTextValue={(value)=>value+"% Kind"} />
            <GaugeChart id="gauge-chart1" nrOfLevels={1} colors={["#865DFF","#FFA3FD"]}needleColor="#865DFF" needleBaseColor="#865DFF" percent={user.funny} formatTextValue={(value)=>value+"% Funny"}/>
            </div>
            <div className="flex">
            <GaugeChart id="gauge-chart1" nrOfLevels={1} colors={["#865DFF","#FFA3FD"]} needleColor="#865DFF" needleBaseColor="#865DFF" percent={user.sad} formatTextValue={(value)=>value+"% Sad"}/>
            <GaugeChart id="gauge-chart1" nrOfLevels={1} colors={["#865DFF","#FFA3FD"]} needleColor="#865DFF" needleBaseColor="#865DFF" percent={user.angry} formatTextValue={(value)=>value+"% Angry"}/>
            </div>
          </div>  
        </div>
        {placeholderContent.map((post, index) => (
            <Feed
              key={index}
              id={post.id}
              name={post.name}
              content={post.content}
              image={post.image}
              contentimageurl={post.contentimageurl}
            />
          ))}
      </div>
      <hr className="border-gray-800" />
    </div>
  );
}

export default Profile;
