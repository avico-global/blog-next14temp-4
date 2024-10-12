import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle8({ myblog, imagePath }) {
  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, ${myblog?.opacity})`,
          color: myblog?.value?.textColor || "white",
        }}
      >
        <FullContainer
          className="overflow-hidden p-4 mx-auto lg:max-w-[1200px] grid lg:grid-cols-2 items-center "
          style={{
            color: myblog?.value?.textColor || "white",
          }}
        >
          {/* Text Column */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-5 py-14 lg:py-28 lg:px-6 lg:rounded-lg text-center lg:text-left">
            <div className="flex flex-col gap-4 text-center justify-center items-center ">
              <Badge>{myblog?.value?.article_category}</Badge>
              <h1
                style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
                className="font-bold capitalize max-w-screen-md  text-black text-center"
              >
                {myblog?.value.title}
              </h1>
              <p
                style={{
                  fontSize: myblog?.value?.taglineFontSize || 18,
                }}
                className=" text-black"
              >
                {myblog?.value.tagline}
              </p>
              <div className="text-black flex items-center justify-center gap-4">
                <p>{myblog?.value?.author}</p> -{" "}
                <p>{myblog?.value.published_at}</p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] border-4 rounded-full">
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
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </FullContainer>
      </div>
    </>
  );
}
