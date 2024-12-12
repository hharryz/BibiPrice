"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import getSuggestion from "@/lib/crawler/suggestion";
import DDPic from "@/static/img/dd.png";
import JDPic from "@/static/img/jd.png";
import KFZPic from "@/static/img/kfz.png";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (query.trim()) {
        router.push(`/compare/${encodeURIComponent(query)}`);
      }
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      getSuggestion(value)
        .then(
          data => {
            setSuggestions(data)
          }
        );
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="h-full">
      <div
        className="-z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full
                      has-[:focus]:bg-opacity-40 has-[:focus]:backdrop-blur-sm has-[:focus]:-z-0"
      >
        <div className="sr-only">INPUT BOX</div>
      </div>
      <div className="absolute pt-16 h-screen w-full">
        <div className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <input
          placeholder="Search..."
          className="peer input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-80 h-12 transition-all focus:w-96 outline-none"
          name="search"
          type="search"
          onKeyDown={handleKeyDown}
          onChange={handleInput}
          value={query}
        />
        {suggestions.length > 0 && (
            <ul className="absolute z-10 w-80 mt-1 bg-white rounded-lg shadow-lg peer-focus:w-96">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setQuery(suggestion);
                    router.push(`/compare/${encodeURIComponent(suggestion)}`);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#a0ae9d] rounded-[5rem] grid grid-cols-2">
          <div className="flex flex-col ml-14 mt-14 w-full">
            <div className="font-staatliches text-8xl lg:text-9xl text-[#fefefe]">
              BIBI PRICE
            </div>
            <div className="font-staatliches text-4xl text-[#fefefe] hidden lg:flex">
              fancy price tracker for e-commerce websites
            </div>
          </div>
          <div className="absolute bottom-14 right-20 flex-col items-end hidden md:flex">
            <div className="sr-only">website logos</div>
            <div className="gap-6 p-2 flex flex-row items-end">
              <Image src={DDPic} alt="dd-logo" height={40} />
              <Image src={JDPic} alt="jd-logo" height={50}/>
            </div>
            <Image src={KFZPic} alt="kfz-logo" height={30}/>
          </div>
        </div>
      </div>
    </div>
  );
}
