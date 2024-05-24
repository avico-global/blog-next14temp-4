import React from "react";
import Image from "next/image";

export default function Banner({ image }) {
  return (
    <div className="h-[50vh] overflow-hidden relative w-full flex flex-col justify-between p-10">
      <Image
        src={image}
        alt="Background Image"
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0"
      />
    </div>
  );
}
