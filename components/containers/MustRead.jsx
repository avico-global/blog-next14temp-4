import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import dayjs from "dayjs";
import SectionHeading from "../common/SectionHeading";

export default function MustRead({ articles, project_id }) {
  return (
    <FullContainer className="py-10">
      <Container>
        <SectionHeading title="MUST READ" className="mb-7" />
        <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-2 gap-x-12 gap-y-4">
          {articles?.map(
            (item, index) =>
              item.isMustRead && (
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
                  className="lg:first:col-span-3 lg:first:row-span-3 flex flex-col gap-2 first:gap-4 text-lg first:text-xl"
                >
                  <div className="overflow-hidden relative min-h-40 lg:min-h-32 w-full bg-black flex-1 rounded-md ">
                    <Image
                      title={item.imageTitle}
                      src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${item.image}`}
                      fill={true}
                      loading="lazy"
                      alt="blog"
                      className="w-full h-full object-cover absolute top-0 scale-125"
                    />
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
              )
          )}
        </div>
      </Container>
    </FullContainer>
  );
}
