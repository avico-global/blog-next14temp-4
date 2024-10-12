import React from "react";
import FullContainer from "../../common/FullContainer";
import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style6({
  data,
  searchQuery,
  filteredBlogs,
  image,
  handleSearchChange,
  searchContainerRef,
}) {
  return (
    <div
      style={{
        color: data.textColor || "white",
      }}
    >
      <FullContainer className="min-h-[63vh] flex flex-col justify-center items-center p-10">
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
        <div className="flex flex-col justify-center items-center lg:items-start space-y-5 lg:h-full">
          <h1
            style={{ fontSize: data.titleFontSize || 48 }}
            className="font-bold capitalize text-4xl lg:text-5xl text-center lg:text-left"
          >
            {data.title}
          </h1>
          {data.tagline && (
            <h2
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-tight text-lg lg:text-xl text-center lg:text-left"
            >
              {data.tagline}
            </h2>
          )}

          {/* Search Bar */}
          <div
            ref={searchContainerRef}
            className="relative w-full lg:w-[650px] mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="lg:text-xl border border-gray-300 inputField rounded-full outline-none text-black bg-white shadow-xl p-4 pl-12 pr-5 transition-opacity duration-300 ease-in-out w-full focus:ring-2 focus:ring-yellow-500"
              placeholder="Search..."
              autoFocus
            />

            {/* Search Results */}
            {searchQuery && (
              <div className="absolute top-full p-1 text-start  lg:p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 mx-auto w-11/12 lg:w-[650px]">
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
