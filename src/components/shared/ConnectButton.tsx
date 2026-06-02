"use client";

import React from "react";
import { MdArrowOutward } from "react-icons/md";

export default function ConnectButton({ onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      className={`group flex h-12 cursor-pointer w-fit items-center justify-between gap-4 rounded-lg bg-white pl-5 pr-1.5 shadow-lg transition-all duration-300 ${className}`}
    >
      <span className="text-[15px] font-medium tracking-tight text-black">
        Connect with us
      </span>

      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-black text-white transition-transform duration-300 ease-out group-hover:scale-90">
        <MdArrowOutward className="absolute h-4 w-4 transition-transform duration-300 group-hover:-translate-y-6 group-hover:translate-x-6" />

        <MdArrowOutward className="absolute h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
    </button>
  );
}
