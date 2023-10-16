import React from "react";
import Image from "next/image";
function Eco() {
  return (
    <section className="pt-24 bg-gray-900 h-full  w-full pb-5">
      <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className=" text-4xl font-extrabold leading-none tracking-normal text-white md:text-6xl md:tracking-tight">
            <span>Ecosystem Partners</span>
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-15 px-8">
          <div className="px-6 mt-5">
            <Image
              alt="..."
              src="/neocast.webp"
              className="shadow-lg rounded-full mx-auto max-w-120-px"
              width={100}
              height={100}
            />
            <div className="pt-6 text-center">
              <h5 className="text-xl font-bold text-blueGray-700">NeoCast</h5>
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-15 px-8">
          <div className="px-6 mt-5">
            <Image
              alt="..."
              src="/neo.jpg"
              className="shadow-lg rounded-full mx-auto max-w-120-px"
              width={100}
              height={100}
            />
            <div className="pt-6 text-center">
              <h5 className="text-xl font-bold text-blueGray-700">Neo</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Eco;
