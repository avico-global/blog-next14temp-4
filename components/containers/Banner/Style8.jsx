import React from "react";
import FullContainer from "../../common/FullContainer";
import Image from "next/image";
import Link from "next/link";

export default function Style8({
  image,
  data,
  searchQuery,
  filteredBlogs,
  searchContainerRef,
}) {
  return (
    <div
      style={{
        backgroundColor: `rgba(0, 0, 0, ${data?.opacity})`,
        color: data.textColor || "white",
      }}
    >
      <FullContainer
        className="min-h-[60vh]    overflow-hidden p-4 mx-auto lg:max-w-[1550px] grid lg:grid-cols-3 items-center gap-6 lg:gap-20" // Updated to 3-column grid
        style={{
          color: data.textColor || "white",
        }}
      >
        {/* Title Column */}
        <div className="flex flex-col justify-center items-center lg:items-start space-y-5 py-14 lg:py-28 lg:px-6 lg:rounded-lg text-center lg:text-left">
          <div className="flex flex-col gap-4">
            <h1
              style={{ fontSize: data.titleFontSize || 48 }}
              className="font-bold capitalize text-white text-4xl lg:text-5xl" // Responsive text size
            >
              {data.title}
            </h1>
          </div>
        </div>

        {/* Image Column */}
        <div className="w-full flex justify-center lg:justify-center border-4 rounded-full ">
          <Image
            src={image}
            height={800} // Adjusted image size to be smaller
            width={800}
            alt="Image"
            className="rounded-full shadow-lg object-cover border-4 " // Rounded image style
          />
        </div>

        {/* Tagline Column */}
        <div className="flex flex-col justify-center items-center lg:items-end space-y-5 py-14 lg:py-28 lg:px-6 lg:rounded-lg text-center lg:text-right">
          {data.tagline && (
            <h2
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-tight text-white text-lg lg:text-xl" // Responsive tagline size
            >
              {data.tagline}
            </h2>
          )}
        </div>

        {/* Button Row */}
        <div className="lg:col-span-3 flex justify-center ">
          <Link
            href="/"
            className="inline-block text-black bg-white py-3 px-6 rounded-full text-lg lg:text-xl hover:text-white hover:bg-black transition-colors duration-300"
          >
            View Our Blogs
          </Link>
        </div>
      </FullContainer>
    </div>
  );
}
