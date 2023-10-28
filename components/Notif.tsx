import React from 'react'
function Notif({title,description,notitype }: { title:string,description:string,notitype:string }) {
  return (
    <div className="flex flex-col ">
      <div className=" p-2  hover:bg-black ">
        <div className="flex flex-col space-y-5">
          <a href="#" className="block max-w-full p-2  border  rounded-lg shadow  bg-gray-800 border-gray-700 hover:bg-gray-700">
            <div className='flex gap-5'>
            <div>
            {notitype=="follow"&&(<svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              className="w-7 h-7 text-gray-400 mb-3 mt-5"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M13 14.062V22H4a8 8 0 019-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm5.793 6.914l3.535-3.535 1.415 1.414-4.95 4.95-3.536-3.536 1.415-1.414 2.12 2.121z" />
            </svg>)}
            {notitype=="react"&&(
              <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
              className="w-7 h-7 text-gray-400 mb-3 mt-5"
            >
              <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
            </svg>

            )}
            
            
            </div>
            <div>
            <p className="mb-2 text-xl font-bold tracking-tight text-white">{title}</p>
            <p className="font-normal text-gray-400">{description}</p>
            </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Notif