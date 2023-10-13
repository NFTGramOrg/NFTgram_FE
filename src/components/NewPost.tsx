import React, { useEffect, useState } from 'react'
const NFTS = [
  {
    nftname :"Bored Ape 1",
    nftid:"0"
  },
  {
    nftname :"Bored Ape 2",
    nftid:"3"
  }
]
function NewPost() {
  return (
    <div className='border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-6 space-x-2 border-accent relative'>
         <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
         <form className="flex flex-col w-full h-full">
          <input
            type="text"
            name="post"
            className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
            placeholder="Submit prompts to generate a post"
          />
          <div className="w-full justify-between items-center flex">
            <div><label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Your NFT</label>
            <select id="countries" className=" text-sm rounded-lg focus:border-accent block w-[300px] p-2.5 bg-secondary border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-accent">
              <option selected>Choose Your NFT</option>
              {NFTS.map((item) => (
              <option value={item.nftid}>{item.nftname}</option>))}
            </select></div>
            <div className="w-full max-w-[100px] flex-col mt-4">
              <button
                type="submit"
                className="rounded-full top bg-secondary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
  )
}

export default NewPost
