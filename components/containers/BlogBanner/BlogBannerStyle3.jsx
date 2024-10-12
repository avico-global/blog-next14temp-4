import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function BlogBannerStyle3({ myblog, imagePath }) {
  return (
    <FullContainer>
      <Container className="overflow-hidden relative">
        <Image
          fill={true}
          loading="eager"
          priority={true}
          alt={
            myblog?.value.imageAltText ||
            myblog?.value?.tagline ||
            "No Banner Found"
          }
          src={`${imagePath}/${myblog?.file_name}`}
          title={myblog?.value.imageTitle || myblog?.value.title}
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
        <FullContainer
          style={{
            backgroundColor: `rgba(10, 0, 0, ${myblog?.opacity / 100})`,
            color: myblog?.textColor || "white",
          }}
          className="gap-3 flex flex-col items-center justify-center py-28 text-center"
        >
          <Badge>{myblog?.value?.article_category}</Badge>
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
          <div className="flex items-center justify-center gap-4">
            <p>{myblog?.value.author}</p> - <p>{myblog?.value.published_at}</p>
          </div>
        </FullContainer>
      </Container>
    </FullContainer>
  );
}
