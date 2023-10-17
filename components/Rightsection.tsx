import React from 'react'

function Rightsection() {
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
          >
          </label>
        </div>
      </div>
      <div className="flex flex-col rounded-xl bg-secondary my-4 backdrop-blur-xl  ">
        <h3 className="font-bold text-xl my-4 px-4">Top NFTs now</h3>
        <div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="hover:bg-white/10 p-4 flex justify-between items-center last:rounded-b-xl transition duration-200"
            >
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-neutral-600 rounded-full flex-none"></div>
                <div className="flex flex-col">
                  <div className="font-bold text-white">CryptoPunk{i}</div>
                  <div className="text-primary text-xs">@cryptopunk{i}</div>
                </div>
              </div>

              <button className="rounded-full px-6 py-2 bg-white text-neutral-950">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Rightsection
