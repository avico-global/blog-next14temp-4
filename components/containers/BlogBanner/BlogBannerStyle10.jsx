import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function BlogBannerStyle10({ myblog, imagePath }) {
  return (
    <FullContainer className="min-h-[63vh] overflow-hidden p-0  grid grid-cols-1 lg:grid-cols-2 items-center gap-0">
      <div className="relative w-full h-full">
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
      <div className="flex flex-col justify-center items-center lg:items-start space-y-5 lg:h-full p-12 bg-gray-100 text-center lg:text-left">
        <div className="flex flex-col gap-4 w-full lg:max-w-[80%]">
          <div className="flex flex-col py-28">
            <Badge className="w-fit">{myblog?.value?.article_category}</Badge>
            <h1
              style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
              className="font-bold capitalize max-w-screen-md mt-5"
            >
              {myblog?.value.title}
            </h1>
            <p
              style={{
                fontSize: myblog?.value?.taglineFontSize || 18,
              }}
              className="text-gray-500 mt-2"
            >
              {myblog?.value?.tagline}
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 text-black mt-6">
              <p>{myblog?.value.author}</p> -<p>{myblog?.value.published_at}</p>
            </div>
          </div>
        </div>
      </div>
    </FullContainer>
  );
}
