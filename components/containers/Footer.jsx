import React from "react";
import Image from "next/image";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";

const footerList = [
  "Features",
  "Exclusives",
  "US TV",
  "Reality TV",
  "Soaps Spoilers",
  "Coronation Street",
  "EastEnders",
  "Emmerdale",
  "Home and Away",
  "Hollyoaks",
  "Casualty",
  "Neighbours",
  "Waterloo Road",
  "Doctors",
  "Black Friday",
  "Gaming",
  "Showbiz",
  "LGBTQ+ Spy",
  "Star Wars",
  "Marvel",
  "Anime",
  "Doctor Who",
  "WWE",
  "Netflix",
  "Disney+",
  "Apple TV+",
  "Prime Video",
  "NOW",
];

export default function Footer({ logo }) {
  return (
    <FullContainer className="bg-purple-950 text-white py-16">
      <Container>
        <div className="w-full grid grid-cols-3 gap-5">
          <Image height={70} width={100} src={logo} alt="logo" />
        </div>
      </Container>
    </FullContainer>
  );
}
