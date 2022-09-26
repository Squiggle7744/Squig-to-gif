import React, { useEffect } from "react";
import { useState } from "react";
import { SquigLookup } from "../GraphQL/queries";
import { checkSquig } from "../squigChecker";
import graphQLClient from "../GraphQL/graphQLClient"
import dynamic from "next/dynamic";
import { setup, draw } from '../p5/sketch.js';

const Sketch = dynamic(() => import('../p5/p5Component'), { ssr: false });

// const SquigFrame = ({ tokenID }) => {
//   const validatedTokenID = checkSquig(tokenID)

//   return (
//     <iframe
//       title="Live Squiggle View"
//       className="w-full h-full rounded-xl shadow-2xl"
//       src={`https://generator.artblocks.io/${validatedTokenID}`}
//     />
//   );
// };

const InputBox = () => {
  const [tokenID, setID] = useState(3659);
  const [squig, setSquig] = useState();

  async function handleSubmit(event) {
    event.preventDefault(); 
    const validatedTokenID = checkSquig(tokenID)
    const gotSquig = await graphQLClient.request(SquigLookup(validatedTokenID))
    setSquig(gotSquig)
  }
  
  function handleInput(event) {
    setID(event.target.value);
  }

  return (
    // Background
    <>
    
    <div className="relative grid min-h-screen flex-row justify-center 
    bg-gradient-to-br from-stone-200 to-stone-500 p-6 sm:py-12">
      <div className="left-0 right-0 top-0 bottom-0 self-end">
        <div className="w-96 h-64 order-1 mb-12">
        <Sketch setup={setup} draw={draw}></Sketch>
        </div>
      </div>


      {/* Input Form */}
      <div className="relative h-32 justify-self-center rounded-2xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 
      ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10 z-10 order-2">
        <div className="mx-auto max-w-md">
          <form onSubmit={handleSubmit} className="relative mx-auto w-max">
            <input
              type="search"
              onChange={handleInput}
              value={tokenID}
              className="peer cursor-pointer relative z-10 h-12 rounded-full 
              border bg-transparent outline-none w-full focus:cursor-text 
              focus:border-stone-900 pl-16 pr-4"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent 
              stroke-gray-500 px-3.5 peer-focus:border-stone-300 
              peer-focus:stroke-stone-800"
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
