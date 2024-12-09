"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DDPic from '@/static/img/dd.png';

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Search...");
      if (query.trim()) {
        router.push(`/compare/${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div className="h-full">
      <div
        className="-z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full
                      has-[:focus]:bg-opacity-40 has-[:focus]:backdrop-blur-sm has-[:focus]:-z-0"
      >
        <input
          placeholder="Search..."
          className="z-10 input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-80 h-12 transition-all focus:w-96 outline-none"
          name="search"
          type="search"
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </div>
      <div className="-z-40 absolute pt-16 h-screen w-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#a0ae9d] rounded-[5rem] grid grid-cols-2">
          <div className="flex flex-col ml-14 mt-14 w-full">
            <div className="font-staatliches text-9xl text-[#fefefe]">
              BIBI PRICE
            </div>
            <div className="font-staatliches text-4xl text-[#fefefe]">
              fancy price tracker for e-commerce websites
            </div>
          </div>
          <div className="absolute bottom-14 right-14 flex flex-row gap-8 items-end">
            <div className="w-80 h-60 bg-[#fefefe] rounded-3xl"></div>
            <div className="w-80 h-40 bg-[#fefefe] rounded-3xl p-4 flex flex-col justify-end">
              <div className="font-semibold">ZJU B/S Project</div>
              <div className="font-semibold">2024-10</div>
              {/* <Image src={DDPic} alt="dd-logo" width={96} height={96}></Image> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="-z-20 absolute pt-16 top-0 left-0 w-full h-full min-h-screen grid grid-rows-2 justify-center">
        <div></div>
      </div> */}
      {/* <div className="font-banner">BibiPrice</div> */}
    </div>
  );
}
