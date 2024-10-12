import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/common/Container";

export default function BlogBannerStyle2({ myblog, imagePath }) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center gap-5 py-10">
        <Badge>{myblog?.value?.article_category}</Badge>
        <h1
          style={{ fontSize: myblog?.value?.titleFontSize || 48 }}
          className="font-bold text-black capitalize max-w-screen-md"
        >
          {myblog?.value.title}
        </h1>

        <div className="flex text-gray-500 items-center justify-center gap-4">
          <p>{myblog?.value.author}</p> - <p>{myblog?.value.published_at}</p>
        </div>
      </div>
      <Container className="h-[550px] mx-auto overflow-hidden relative text-left">
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
      </Container>
    </div>
  );
}
