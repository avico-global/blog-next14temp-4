import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle5({ myblog, imagePath }) {
  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, ${myblog?.opacity || 0})`, // Black background with optional opacity
          color: myblog?.textColor || "white",
        }}
      >
        <FullContainer
          className="min-h-[63vh] overflow-hidden p-0  grid grid-cols-1 lg:grid-cols-2 items-center gap-0" // Removed padding from grid for flush layout
        >
          {/* Image Column (Left) */}
          <div className="relative w-full h-full">
            {" "}
            <Image
              src={`${imagePath}/${myblog?.file_name}`}
              alt={
                myblog?.value.imageAltText ||
                myblog?.value?.tagline ||
                "No Banner Found"
              }
              title={myblog?.value.imageTitle || myblog?.value.title}
              priority={true}
              fill={true}
              loading="eager"
              className="-z-10 w-full h-full object-cover absolute top-0"
            />
          </div>

          {/* Text Column (Right) */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-5 lg:h-full py-14 lg:py-0 px-10 bg-black text-center lg:text-left text-white">
            <div className="flex flex-col gap-4 w-full lg:max-w-[80%]">
              <div className="flex flex-col gap-4 py-28">
                <Badge className={`  justify-center lg:justify-start  lg:w-48 `} >{myblog?.value?.article_category}</Badge>
                <h1
                  style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
                  className="font-bold capitalize max-w-screen-md"
                >
                  {myblog?.value.title}
                </h1>
                <p
                  style={{
                    fontSize: myblog?.value?.taglineFontSize || 18,
                  }}
                  className="  text-white "
                >
                  {myblog?.value?.tagline}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <p className=" bg-slate-900 p-1 px-2 rounded-full  " >{myblog?.value.author}</p> -{" "}
                  <p className=" bg-slate-900 p-1 px-2 rounded-full  ">{myblog?.value.published_at}</p>
                </div>
              </div>
            </div>
          </div>
        </FullContainer>
      </div>
    </>
  );
}
