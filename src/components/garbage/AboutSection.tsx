import React from "react";

type Props = {};

export default function AboutSection({}: Props) {
  return (
    <div className="w-full flex items-start justify-between">
      <div className="rounded-xl border border-gray-200 px-3 py-1">
        <p className="text-stone-900 text-lg font-medium">About Sotexedge</p>
      </div>

      <p className="max-w-2xl text-stone-900 font-medium text-start text-xl">
        We help brands grow worldwide with original, high-impact strategies in
        Digital Marketing, Branding, Videography, and Development. Everything we
        create is built to convert.
      </p>
    </div>
  );
}
