import React from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Button } from "@/components/ui/button";

export default function Style4({ image, data }) {
  return (
    <FullContainer>
      <Container>
        <div className="grid grid-cols-2 gap-10 w-full py-10">
          <div className="flex flex-col gap-4 py-28">
            <h1
              style={{ fontSize: data.titleFontSize || 48 }}
              className="font-bold capitalize text-4xl lg:text-5xl"
            >
              {data.title}
            </h1>
            {data.tagline && (
              <h2
                style={{ fontSize: data.taglineFontSize || 18 }}
                className="leading-tight text-lg lg:text-xl"
              >
                {data.tagline}
              </h2>
            )}
            <Button className="w-fit">Explore</Button>
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src={image}
              title={data.imageTitle || data.title || "Banner"}
              alt={data.altImage || data.tagline || "No Banner Found"}
              priority={true}
              fill={true}
              loading="eager"
              className="-z-10 w-full object-cover absolute top-0"
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
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
