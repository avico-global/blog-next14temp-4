import React from "react";
import Image from "next/image";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";

export default function Style2({ image, data }) {
  return (
    <FullContainer className="min-h-[50vh]  overflow-hidden p-10  text-left ">
      <Image
        src={image}
        title={data.imageTitle || data.title || "Banner"}
        alt={data.altImage || data.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full  object-cover absolute top-0"
        objectFit="cover"
        sizes="(max-width: 320px) 320px,
               (max-width: 480px) 480px,
               (max-width: 768px) 768px,
               (max-width: 1024px) 1024px,
               (max-width: 1280px) 1280px,
               (max-width: 1600px) 1600px,
               (max-width: 1920px) 1920px,
               (max-width: 2560px) 2560px,
               (max-width: 3840px) 3840px,
               100vw"
      />
      <Container
        className="gap-5 text-left py-24  "
        style={{
          backgroundColor: `rgba(0, 0, 0, ${data?.opacity/50 })`,
          color: data.textColor || "white",
        }}
      >
        <h1
          style={{ fontSize: data.titleFontSize || 48 }}
          className="font-bold capitalize  text-left  "
        >
          {data.title}
        </h1>
        {data.tagline && (
          <p
            style={{ fontSize: data.taglineFontSize || 18 }}
            className="leading-tight md:leading-none"
          >
            {data.tagline}
          </p>
        )}
      </Container>
    </FullContainer>
  );
}
