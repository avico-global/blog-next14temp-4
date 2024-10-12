import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style6({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  searchContainerRef,
  imagePath,
  handleSearchToggle,
  handleSearchChange,
  toggleSidebar,
  openSearch,
  category,
  searchQuery,
  myblog,
  domain,
}) {
  const navLink =
    "font-semibold capitalize border-b-2 border-transparent hover:text-gray-400 hover:border-black transition-all p-3";

  return (
    <>
      <div className=" bg-white lg:bg-black   sticky top-0 z-20  ">
        <div className="flex justify-between items-center mx-auto max-w-[1700px] shadow-sm  w-full py-3 text-white">
          <div className=" hidden lg:flex ">
            {staticPages.map((item, index) => (
              <Link
                key={index}
                title={item.page}
                href={item.href}
                className={cn(
                  navLink,
                  isActive(item.href) && "border-white text-white"
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
                    "border-black text-white"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div
            className="flex  items-center justify-end  gap-56  lg:gap-3  relative"
            ref={searchContainerRef}
          >
            <div></div>

            {openSearch ? (
              <>
                {searchQuery && (
                  <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                    {filteredBlogs?.map((item, index) => (
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
              </>
            ) : (
              <button
                className="flex items-center gap-1 hover:bg-black text-black lg:text-white hover:text-white transition-all rounded-md font-semibold p-2"
                onClick={handleSearchToggle}
              >
                <Search className="w-5 md:w-4 cursor-pointer" />
                Search
              </button>
            )}
            <Menu
              onClick={toggleSidebar}
              className="w-6 h-6 ml-1 text-black lg:hidden"
            />
          </div>
        </div>
      </div>

      <div className="p-10 border-b">
        <Logo logo={logo} imagePath={imagePath} />
      </div>
    </>
  );
}
