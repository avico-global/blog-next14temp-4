import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style3({
  searchQuery,
  searchContainerRef,
  handleSearchChange,
  filteredBlogs,
  image,
  data,
}) {
  return (
    <FullContainer
      className="h-auto min-h-[50vh] overflow-hidden"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100})`,
        color: data.textColor || "white",
      }}
    >
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
      <Container className="gap-3 flex flex-col items-center justify-center py-28 text-center">
        <h1
          style={{ fontSize: data.titleFontSize || 48 }}
          className="font-bold capitalize"
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
        <div
          ref={searchContainerRef}
          className="relative w-6/12 flex items-center gap-4 py-3 px-5 bg-white rounded-full mt-4"
        >
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1 bg-transparent outline-none text-black"
            placeholder="Search..."
            autoFocus
          />
          {searchQuery && (
            <div className="absolute top-full w-full p-1 left-0 text-start lg:p-3 bg-white shadow-2xl rounded-md mt-1 z-10 mx-auto">
              {filteredBlogs?.length > 0 ? (
                filteredBlogs.map((item, index) => (
                  <Link
                    key={index}
                    title={item.title}
                    href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                      item?.title
                    )}`}
                  >
                    <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                      {item.title}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-2 text-gray-600 text-center">
                  No articles found.
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </FullContainer>
  );
}
