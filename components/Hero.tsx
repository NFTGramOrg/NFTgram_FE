import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
function Hero() {
  const [response, setResponse] = useState("");
  const [dappUri, setDappUri] = useState("");
  const [neoline, setNeoLine] = useState<{
    getAccount: () => { address: string };
  }>();
  const [neolineN3, setNeoLineN3] = useState(null);
  const [account, setAccount] = useState("");
  const router = useRouter();

  async function signIn() {
    console.log("creating connection");
    // const { uri, approval } = await wcSdk.createConnection("neo3:testnet", [
    //   "invokeFunction",
    //   "testInvoke",
    // ]);

    // if (uri) {
    //   setDappUri(uri);
    //   console.log("URI: ", uri);
    //   window.open(`https://neon.coz.io/connect?uri=${uri}`, "_blank")?.focus();
    //   const session = await approval();
    //   console.log("Session: ", session);
    //   wcSdk.setSession(session);
    //   router.push("/home");
    // }
  }

  useEffect(() => {
    window.addEventListener("NEOLine.NEO.EVENT.READY", () => {
      setNeoLine(new window.NEOLineN3.Init());
    });
    window.addEventListener("NEOLine.N3.EVENT.READY", () => {
      setNeoLineN3(new window.NEOLineN3.Init());
    });
  }, []);

  const initNeolineAccount = async () => {
    try {
      if (neoline != null) {
        const { address } = await neoline.getAccount();
        setAccount(address);
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="pt-10   bg-gray-900 h-full  w-full">
      <div className="flex flex-row ">
        <div className=" pl-5">
          <Image
            src="/nftgram.png"
            width={100}
            height={100}
            alt=""
            className=" rounded-full shadow-xl"
          />
        </div>
        <div className=" px-9 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-white md:text-6xl md:tracking-tight">
              <span>Social Identity for NFTs</span>

              <div className=" text-8xl ">
                <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline ">
                  NFTGram
                </span>
              </div>
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-400 md:text-xl lg:px-24">
              Give life to your NFTs with the magic of AI
            </p>
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
              <button
                className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-secondary rounded-2xl sm:w-auto sm:mb-0"
                onClick={() => {
                  initNeolineAccount();
                }}
              >
                <Image
                  src="/neoline.jpeg"
                  width={40}
                  height={40}
                  alt=""
                  className="mt-1 mx-2 rounded-lg"
                />
                Sign in with NeoLine
                <svg
                  className="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full mx-auto mt-20 text-center md:w-10/12">
            <div className="relative z-0 w-full mt-8">
              <div className="relative overflow-hidden shadow-2xl">
                <div className="flex items-center flex-none px-4 bg-secondary rounded-b-none h-11 rounded-xl">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  </div>
                </div>
                <Image
                  src="/ss1.jpg"
                  className="[mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
                  alt=""
                  width={1901}
                  height={921}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
