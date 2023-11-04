import Image from "next/image";
import React from "react";

function Rightsection() {
  const pokemons = [
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
  return (
    <section className="w-[700px] sticky hidden top-2 overflow-y-auto mt-2 xl:flex flex-col items-stretch h-[90vh] overflow-x-hidden px-3 ml-5">
      <div>
        <div className="relative w-full h-full group">
          <input
            id="searchBox"
            type="text"
            placeholder="Search NFTgram"
            className="outline-none peer focus:border-primary focus:border bg-neutral-900/90 w-full h-full rounded-xl py-4 pl-14 pr-4"
          />
          <label
            htmlFor="searchBox"
            className="absolute top-0 left-0 h-full flex items-center justify-center p-4 text-gray-500 peer-focus:text-primary"
          ></label>
        </div>
      </div>
      <div className="flex flex-col rounded-xl bg-secondary my-4 backdrop-blur-xl  ">
        <h3 className="font-bold text-xl my-4 px-4 text-white">Top NFTs now</h3>
        <div>
          {pokemons.map((pok, i) => (
            <div
              key={i}
              className="hover:bg-white/10 p-4 flex justify-between items-center last:rounded-b-xl transition duration-200"
            >
              <div className="flex items-center space-x-2">
                <Image
                  src={pok.image}
                  alt=""
                  width={35}
                  height={35}
                  className="w-10 h-10 bg-white rounded-full flex-none"
                />
                <div className="flex flex-col">
                  <div className="font-bold text-white">{pok.name}</div>
                  <div className="text-primary text-xs">@{pok.id}</div>
                </div>
              </div>

              <button className="rounded-full px-6 font-semibold py-2 bg-white text-neutral-950">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rightsection;
