import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import dayjs from "dayjs";
import SectionHeading from "../common/SectionHeading";

export default function LatestBlogs({ articles, project_id }) {
  return (
    <FullContainer className="mt-16">
      <Container>
        <SectionHeading title="Latest Posts" className="mb-7" />
        <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-2 gap-x-12 gap-y-4">
          {articles
            ?.slice(-8)
            ?.reverse()
            ?.map((item, index) => (
              <Link
                href={
                  project_id
                    ? `/${item.title
                        ?.toLowerCase()
                        .replaceAll(" ", "-")}?${project_id}`
                    : `/${item.title?.toLowerCase().replaceAll(" ", "-")}`
                }
                title={item.imageTitle}
                key={index}
                className="lg:first:col-span-3 lg:first:row-span-3 flex flex-col gap-2 first:gap-4 text-lg first:text-xl first:mb-5"
              >
                <div className="overflow-hidden relative min-h-40 lg:min-h-32 w-full bg-black flex-1 rounded-lg flex items-center flex-col">
                  <Image
                    title={item.imageTitle}
                    src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${item.image}`}
                    fill={true}
                    loading="lazy"
                    alt="blog"
                    className="w-full h-full object-cover absolute top-0 scale-105"
                  />
                  <p className="bg-purple-500/80 backdrop-blur-sm uppercase text-xs font-semibold text-white pt-1 pb-[1px] px-4 rounded-t-md absolute bottom-0 mx-auto">
                    {item?.article_category?.name}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-center text-inherit leading-tight">
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
      </Container>
    </FullContainer>
  );
}
