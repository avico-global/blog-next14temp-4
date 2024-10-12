import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import SocialShare from "@/components/common/SocialShare";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style5({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  imagePath,
  handleSearchChange,
  toggleSidebar,
  category,
  searchQuery,
  domain,
  myblog,
}) {
  const navLink =
    "font-semibold capitalize border-t-2 border-transparent hover:text-black hover:border-black transition-all p-3";

  return (
    <>
      <div className="p-10 lg:my-4 w-full border-b">
        <Logo logo={logo} imagePath={imagePath} />
      </div>
      <div className="border-b text-gray-500 sticky top-0 z-20 bg-white ">
        <div className="lg:w-10/12 max-w-screen-lg flex items-center justify-between mx-auto">
          <div className=" hidden lg:flex items-center">
            {staticPages.map((item, index) => (
              <Link
                key={index}
                title={item.page}
                href={item.href}
                className={cn(
                  navLink,
                  isActive(item.href) && "border-black text-black"
                )}
              >
                {item.page}
              </Link>
            ))}
            {categories?.map((item, index) => (
              <Link
                key={index}
                title={item?.title}
                href={`/${sanitizeUrl(item?.title)}`}
                className={cn(
                  navLink,
                  (category === item.title || isActive(`/${item.title}`)) &&
                    "border-black text-black"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="  flex justify-between items-center gap-28  lg:gap-0 my-2">
            {searchQuery && (
              <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                {filteredBlogs?.map((item, index) => (
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
                ))}
              </div>
            )}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md p-1 transition-opacity duration-300 ease-in-out opacity-100"
              placeholder="Search..."
            />
            <Menu
              onClick={toggleSidebar}
              className="w-6 h-6 ml-1 text-black lg:hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
}
