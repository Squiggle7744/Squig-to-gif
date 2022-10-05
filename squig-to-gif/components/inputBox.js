import React, { createContext } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const InputBox = () => {
  
  const [tokenID, setID] = useState(3659);
  const router = useRouter()


  async function handleSubmit(event) {
    event.preventDefault(); 
    router.push("/" + tokenID)
  }
  
  function handleInput(event) {
    setID(event.target.value);
  }

  return (
    <>
    
    <div className="relative grid min-h-screen flex-row justify-center 
     bg-white p-6 sm:py-12">
      <div className="left-0 right-0 top-0 bottom-0 self-end">
        <div className="sm:w-[300px] lg:w-[600px] rounded-2xl">
        <h1 id="CTA" className="w-full order-1 text-6xl rounded-2xl text-center font-bold font-helveticaBlack py-4">
          SQUIG ➡️ GIF
        </h1>
        <h2 className="text-center font-helveticaRoman text-xl pt-4 pb-8">
          Save any Chromie Squiggle as a .gif 
        </h2>
        </div>
      </div>


      {/* Input Form */}
      <div className="relative h-32 justify-self-center place-items-center align-items-center rounded-2xl bg-white px-6 pt-10 pb-8 shadow-2xl ring-1 
      ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10 z-10 order-2 border-4 border-black">
        <div className="mx-auto align-center max-w-md">
          <form onSubmit={handleSubmit} className="relative mx-auto w-max">
            <input
              type="search"
              onChange={handleInput}
              value={tokenID}
              className="peer cursor-pointer relative z-10 h-12 rounded-full 
              border bg-transparent outline-none w-full focus:cursor-text 
              focus:border-stone-900 pl-16 pr-4 font-helveticaRoman italic"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent 
              stroke-gray-500 px-3.5 peer-focus:border-black 
              peer-focus:stroke-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default InputBox;
