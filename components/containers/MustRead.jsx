import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import { sanitizeUrl } from "@/lib/myFun";

export default function MustRead({ articles, imagePath }) {
  const mustReadArticles = articles?.filter((item) => item.isMustRead);

  return (
    mustReadArticles?.length > 0 && (
      <div>
        <SectionHeading title="MUST READ" className="mb-7" />
        <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-2 gap-x-10 gap-y-3">
          {mustReadArticles?.map((item, index) => (
            <Link
              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}`}
              title={item.imageTitle || "IMAGE"}
              key={index}
              className="lg:first:col-span-4 lg:first:row-span-4 first:h-[600px] flex flex-col gap-2 text-lg first:text-xl first:mb-5"
            >
              <div
                className={`overflow-hidden relative min-h-40 lg:min-h-32 w-full bg-gray-300 rounded-lg flex items-center flex-col ${
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
                />
                <p className="bg-purple-500/80 backdrop-blur-sm uppercase text-xs text-center font-semibold text-white pt-1 pb-[1px] px-4 rounded-t-md absolute bottom-0 mx-auto">
                  {item?.article_category}
                </p>
              </div>
              <div>
                <p className="font-bold text-center text-inherit leading-tight hover:underline">
                  {item.title}
                </p>
                <div className="flex items-center justify-center gap-2 mt-1">
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
    )
  );
}
