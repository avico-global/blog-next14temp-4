import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle6({ myblog, imagePath }) {
  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, ${myblog?.opacity || 0.55})`,
          color: myblog?.textColor || "white",
        }}
      >
        <FullContainer className="min-h-[63vh] flex flex-col justify-start items-start p-10">
          <Image
            src={`${imagePath}/${myblog?.file_name}`}
            alt={
              myblog?.value.imageAltText ||
              myblog?.value?.tagline ||
              "No Banner Found"
            }
            title={myblog?.value.imageTitle || myblog?.value?.title}
            priority={true}
            fill={true}
            loading="eager"
            className="-z-10 w-full h-full object-cover absolute top-0"
          />
          {/* Text Column */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-5 lg:h-full">
            <div className="flex flex-col gap-4 py-28">
              <Badge className={` w-48 `}>
                {myblog?.value?.article_category}
              </Badge>
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
              >
                {myblog?.value.tagline}
              </p>
              <div className="flex  gap-4">
                <p>{myblog?.value.author}</p> -{" "}
                <p>{myblog?.value.published_at}</p>
              </div>
            </div>
          </div>
        </FullContainer>
      </div>
    </>
  );
}
