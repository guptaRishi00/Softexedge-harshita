"use client";

import { MdArrowOutward } from "react-icons/md";

export default function ConnectButtonTwo({ onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      className={`group flex h-16 w-fit cursor-pointer items-center justify-between gap-5 rounded-xl bg-white pl-6 pr-2  transition-colors duration-300 hover:bg-black ${className}`}
    >
      <span className="text-[17px] font-bold tracking-tight text-black transition-colors duration-300 group-hover:text-white">
        Connect With Us
      </span>

      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-black text-white transition-transform duration-300 ease-out group-hover:scale-90">
        <div className="absolute inset-0 bg-linear-to-r from-[#2E5BFF] to-[#149CCB] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <MdArrowOutward className="absolute z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-8 group-hover:translate-x-8" />

        <MdArrowOutward className="absolute z-10 h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
    </button>
  );
}
