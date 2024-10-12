import React from "react";
import FullContainer from "../../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { Divide, Search } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style5({
  image,
  data,
  searchQuery,
  filteredBlogs,
  searchContainerRef,
  handleSearchChange,
}) {
  return (
    <div
      style={{
        backgroundColor: `rgba(0, 0, 0, ${data?.opacity || 0.85})`, // Black background with optional opacity
        color: data.textColor || "white",
      }}
    >
      <FullContainer
        className="min-h-[63vh] overflow-hidden p-0  grid grid-cols-1 lg:grid-cols-2 items-center gap-0" // Removed padding from grid for flush layout
      >
        {/* Image Column (Left) */}
        <div className="relative w-full h-full">
          {" "}
          {/* Ensure the image takes full width and height */}
          <Image
            src={image || "/images/banner.webp"} // Fallback image
            title={data.imageTitle || data.title || "Banner"}
            alt={data.altImage || data.tagline || "No Banner Found"}
            priority={true}
            fill={true} // Fills the parent div
            loading="eager"
            className="   " // Use cover to maintain aspect ratio while filling the div
          />
        </div>

        {/* Text Column (Right) */}
        <div className="flex flex-col justify-center items-center lg:items-start space-y-5 lg:h-full py-14 lg:py-0 px-10 bg-black text-center lg:text-left text-white">
          <div className="flex flex-col gap-4 w-full lg:max-w-[80%]">
            <h1
              style={{ fontSize: data.titleFontSize || 48 }}
              className="font-bold capitalize text-4xl lg:text-5xl" // Responsive text size
            >
              {data.title}
            </h1>
            {data.tagline && (
              <h2
                style={{ fontSize: data.taglineFontSize || 18 }}
                className="leading-tight text-lg lg:text-xl" // Responsive tagline size
              >
                {data.tagline}
              </h2>
            )}
          </div>

          <div
            ref={searchContainerRef}
            className="relative w-6/12 flex items-center gap-5 py-2 px-5 bg-white rounded-full mt-4"
          >
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 bg-transparent outline-none py-2 text-black"
              placeholder="Search..."
              autoFocus
            />
            {searchQuery && (
              <div className="absolute top-full p-1 text-start  lg:p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 mx-auto w-11/12 lg:w-[500px]">
                {filteredBlogs?.length > 0 ? (
                  filteredBlogs.map((item, index) => (
                    <Link
                      key={index}
                      title={item.title}
                      href={`/${sanitizeUrl(
                        item.article_category
                      )}/${sanitizeUrl(item?.title)}`}
                    >
                      <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                        {item.title}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-2 text-gray-600">No articles found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </FullContainer>
    </div>
  );
}
