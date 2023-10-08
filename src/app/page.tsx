import Leftbar from '@/components/Leftbar';
import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-full flex justify-center items-center relative bg-bgcolor'>
      <div className=' max-w-screen-2xl w-full h-full flex relative'>
        <Leftbar/>
        <main className='ml-[295px] flex w-[600px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent'>
         <h1 className='text-xl font-bold'>Home</h1>
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
        <div></div>
        <div className="w-full max-w-[100px]">
          <button
            type="submit"
            className="rounded-full bg-secondary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold"
          >
            Post
          </button>
        </div>
      </div>
    </form>
          </div> 
        </main>
        {/* <section>Rightbar</section> */}
      </div>
    </div>
  )
}

export default Home
