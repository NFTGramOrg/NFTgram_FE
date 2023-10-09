import Feed from '@/components/Feed';
import Leftbar from '@/components/Leftbar';
import NewPost from '@/components/NewPost';
import React from 'react'
const Home = () => {
  return (
    <div className='w-full h-full flex justify-center items-center relative bg-bgcolor'>
      <div className=' max-w-screen-2xl w-full h-full flex relative'>
        <Leftbar/>
        <main className='ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent'>
         <h1 className='text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0'>Home</h1>
          <NewPost/>
          <Feed/>
        </main>
        {/* <section>Rightbar</section> */}
      </div>
    </div>
  )
}

export default Home
