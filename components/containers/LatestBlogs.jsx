import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import { sanitizeUrl } from "@/lib/myFun";

export default function LatestBlogs({ articles, imagePath }) {
  return (
    <div className="">
      <SectionHeading title="Latest Posts" className="mb-4 lg:mb-7" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-12 lg:gap-y-6 border  p-4 lg:p-6">
        {articles
          ?.slice(-8)
          ?.reverse()
          ?.map((item, index) => (
            <Link
              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}`}
              title={item.imageTitle || "IMAGE"}
              key={index}
              className={`lg:first:col-span-4 lg:first:row-span-4 first:h-[400px] sm:first:h-[500px] lg:first:h-[600px] flex flex-col gap-2 text-base sm:text-lg first:text-lg sm:first:text-xl first:mb-3 lg:first:mb-5 ${
                index === 0 ? "col-span-1 sm:col-span-2 lg:col-span-4" : ""
              }`}
            >
              <div
                className={`overflow-hidden relative min-h-[200px] sm:min-h-[250px] lg:min-h-32 w-full bg-gray-300 rounded-lg flex items-center flex-col ${
                  index === 0 && "flex-1"
                }`}
              >
                <Image
                  title={item.imageTitle || item.title || "Article Thumbnail"}
                  alt={item.altImage || item.tagline || "No Thumbnail Found"}
                  src={`${imagePath}/${item.image}`}
                  fill={true}
                  loading="lazy"
                  className="w-full h-full object-cover absolute top-0 scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <p className="bg-purple-500/80 backdrop-blur-sm uppercase text-xs text-center font-semibold text-white pt-1 pb-[1px] px-4 rounded-t-md absolute bottom-0 mx-auto">
                  {item?.article_category}
                </p>
              </div>
              <div className="px-2 sm:px-0">
                <p className="font-bold text-center text-inherit leading-tight hover:underline line-clamp-2 sm:line-clamp-none">
                  {item.title}
                </p>
                <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
                  <p className="text-xs">
                    <span className="text-gray-400 text-xs">By</span>:{" "}
                    {item.author}
                  </p>
                  <span className="text-gray-400">--</span>
                  <p className="text-xs text-gray-400">
                    {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
