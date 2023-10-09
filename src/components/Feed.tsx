import React from 'react'
import { BsDot } from 'react-icons/bs'

function Feed() {
  return (
    <div className='flex flex-col'>
          {
            Array.from({length:5}).map((_,i)=>(
              <div key={i} className='border-t-[0.5px] p-4 border-b-[0.5px] border-accent'>
                
              <div className='flex flex-col space-y-4'>
                <div className='flex items-center space-x-1'>
                <div>
                  <div className='w-10 h-10 bg-slate-200 rounded-full '></div>
                </div>
                  <div className='font-bold pl-2'>Bored Ape 1</div>
                  <div>@boredape791234</div>
                  <div>
                    <BsDot/>
                  </div>
                  <div>1 hour ago</div>
                </div>
                <div className='text-white text-sm'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequatur, quam quia vitae nihil mollitia! Explicabo perferendis eaque ex fuga atque? Voluptatum distinctio ad magni, optio minus aut vel quas!
                </div>
                <div className=' bg-slate-400 aspect-square w-full h-96 rounded-xl'></div>

              <div className='flex items-center space-x-2 w-full'>
                <div>C</div>
                <div>R</div>
                <div>L</div>
                <div>S</div>
                <div>SH</div>
              </div>
              </div>
              </div>
            ))
          }

          </div>
  )
}

export default Feed
