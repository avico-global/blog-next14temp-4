import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";

export default function Banner({ title, image, tagline }) {
  return (
    <FullContainer className="text-white">
      <Container className="relative rounded-lg overflow-hidden">
        <Image
          src={image}
          alt="Background Image"
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />

        <FullContainer className="gap-6 h-[50vh] bg-black/50 p-10 text-center">
          <h1 className="font-extrabold text-5xl md:text-7xl capitalize leading-10">
            {title}
          </h1>
          <p className="mt-10 text-lg">{tagline}</p>
        </FullContainer>
      </Container>
    </FullContainer>
  );
}
