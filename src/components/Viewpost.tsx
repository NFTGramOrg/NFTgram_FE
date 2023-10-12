import React from 'react'
import { BsChat, BsDot } from 'react-icons/bs'
import { HiOutlineHeart } from 'react-icons/hi'
const REPLIES = [
    {
        user:"Boredape1",
        username:"@boredape791234",
        reply:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        ,time:"1 hour ago",
        key:"1"
    },
    {
        user:"Boredape2",
        username:"@boredape7914",
        reply:"aaaaaaaaaaaaaaaaaaaaaaaaaaLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        ,time:"1 hour ago",
        key:"2"
    },
    {
        user:"Boredape2",
        username:"@boredape7914",
        reply:"aaaaaaaaaaaaaaaaaaaaaaaaaaLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        ,time:"1 hour ago",
        key:"3"
    },
    {
        user:"Boredape2",
        username:"@boredape7914",
        reply:"aaaaaaaaaaaaaaaaaaaaaaaaaaLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        ,time:"1 hour ago",
        key:"4"
    },
    {
        user:"Boredape2",
        username:"@boredape7914",
        reply:"aaaaaaaaaaaaaaaaaaaaaaaaaaLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        ,time:"1 hour ago",
        key:"5"
    }
]
function Viewpost() {
  return (
    <div className='flex flex-col'>
         
              <div key="1" className='border-t-[0.5px] p-4 border-b-[0.5px] border-accent'>
                
              <div className='flex flex-col space-y-4'>
                <div className='flex items-center space-x-1'>
                <div>
                  <div className='w-10 h-10 bg-slate-200 rounded-full '></div>
                </div>
                  <div className='font-bold pl-2 text-secondary'>Bored Ape 1</div>
                  <div className='text-primary'>@boredape791234</div>
                  <div>
                    <BsDot/>
                  </div>
                  <div>1 hour ago</div>
                </div>
                <div className='text-white text-sm'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequatur, quam quia vitae nihil mollitia! Explicabo perferendis eaque ex fuga atque? Voluptatum distinctio ad magni, optio minus aut vel quas!
                </div>
                <div className=' bg-slate-400 aspect-square w-full h-96 rounded-xl'></div>

              <div className='flex items-center justify-start space-x-20 mt-2 w-full'>
                <div className=' rounded-full bg-white/10 transition duraition-200 p-3 cursor-pointer'><BsChat/></div>
                <div className=' rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer'><HiOutlineHeart/></div>
              </div>
              </div>
              
              </div>
              {REPLIES.map((item) => (
              <div key="1" className=' ml-10  p-4 border-b-[0.5px] border-accent'>
                
              <div className='flex flex-col space-y-4'>
                <div className='flex items-center space-x-1'>
                <div>
                  <div className='w-10 h-10 bg-slate-200 rounded-full '></div>
                </div>
                  <div className='font-bold pl-2 text-secondary'>{item.user}</div>
                  <div className='text-primary'>{item.username}</div>
                  <div>
                    <BsDot/>
                  </div>
                  <div>{item.time}</div>
                </div>
                <div className='text-white text-sm'>
                {item.reply}
                </div>

              <div className='flex items-center justify-start space-x-20 mt-2 w-full'>
                <div className=' rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer'><BsChat/></div>
                <div className=' rounded-full hover:bg-white/10 transition duraition-200 p-3 cursor-pointer'><HiOutlineHeart/></div>
              </div>
              </div>
              
              </div>))}
           
          
          </div>
  )
}

export default Viewpost
