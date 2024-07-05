import { Button } from "@/components/ui/button";
import { Circle, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import React from "react";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

const md = new MarkdownIt();

export default function Rightbar({
  project_id,
  lastFiveBlogs,
  imagePath,
  tag_list,
  categories,
  category,
}) {
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;

  return (
    <div className="h-fit sticky top-0">
      <div className="flex flex-col">
        {lastFiveBlogs?.length > 0 && (
          <div className="mb-7 bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 font-semibold capitalize">
              Latest Posts
            </div>
            <div className="p-2">
              {lastFiveBlogs?.reverse().map((item, index) => (
                <Link
                  href={
                    project_id
                      ? `/${item.article_category.name}/${item.key}?${project_id}`
                      : `/${item.article_category.name}/${item.key}`
                  }
                  className="grid grid-cols-widget gap-3 p-2 rounded-md hover:shadow-md border border-transparent hover:border-gray-200 transition-all"
                  key={index}
                >
                  <div className="overflow-hidden relative min-h-20 rounded-md w-full bg-black flex-1">
                    <Image
                      title={item?.imageTitle}
                      src={
                        item?.image
                          ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                          : "/no-image.png"
                      }
                      fill={true}
                      loading="lazy"
                      alt="blog"
                      className="w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
                    />
                  </div>
                  <div>
                    <p className="font-bold leading-tight">
                      {item?.title.slice(0, 50)}
                    </p>
                    <div className="flex items-center gap-2 mt-1 justify-between text-gray-400">
                      <p className="text-xs">{item?.author}</p>
                      <p className="text-xs whitespace-nowrap">
                        {item?.published_at}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {tag_list?.length > 0 && (
          <div className="mb-7 bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="shadow-sm text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 mb-3 font-semibold capitalize">
              Tags
            </div>
            <div className="flex items-center gap-1 flex-wrap py-3 px-4">
              {tag_list?.map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.tag?.replaceAll(" ", "-")?.toLowerCase()}`}
                  className="bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer rounded py-1 text-sm px-2"
                >
                  {item.tag}{" "}
                  {item.article_ids?.length > 1 && (
                    <span className="bg-black text-white px-1 ml-1 text-xs rounded-full">
                      {item.article_ids?.length}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {categories?.length > 0 && (
        <div className="mb-7 bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="shadow-sm text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 mb-3 font-semibold capitalize">
            Categories
          </div>
          <div className="flex flex-col w-full text-left px-3 pb-5">
            {categories?.map((item, index) => (
              <Link
                key={index}
                href={project_id ? `/${item}?${project_id}` : `/${item}`}
                className={cn(
                  "text-gray-500 capitalize w-full flex items-center gap-2 hover:text-black transition-all p-2 border-b-2 border-gray-100 hover:border-purple-200",
                  (category === item || isActive(`/${item}`)) &&
                    "bg-purple-50 text-black"
                )}
              >
                <Circle className="w-2 h-2 text-purple-500" />
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
