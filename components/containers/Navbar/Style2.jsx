import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style2({
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
}) {
  const navLink =
    "font-semibold capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all duration-300 ease-in-out p-3 relative group";
  return (
    <>
      <div className="flex items-center justify-center shadow-lg border-b border-gray-100 w-full text-gray-500 sticky top-0 z-20 bg-white/95 backdrop-blur-sm">
        {staticPages.map((item, index) => (
          <Link
            key={index}
            title={item.page}
            href={item.href}
            className={cn(
              navLink,
              isActive(item.href) && "border-black text-black bg-gray-50/30"
            )}
          >
            <span className="relative z-10">{item.page}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50/0 to-gray-50/20 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        ))}
        {categories?.map((item, index) => (
          <Link
            key={index}
            title={item?.title}
            href={`/${sanitizeUrl(item?.title)}`}
            className={cn(
              navLink,
              (category === item?.title || isActive(`/${item?.title}`)) &&
                "border-black text-black bg-gray-50/30"
            )}
          >
            <span className="relative z-10">{item?.title}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50/0 to-gray-50/20 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        ))}
        <div
          className="flex items-center justify-end gap-3 relative"
          ref={searchContainerRef}
        >
          {openSearch ? (
            <>
              {searchQuery && (
                <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-lg mt-2 z-10 w-[calc(100vw-40px)] lg:w-[650px] border border-gray-100 backdrop-blur-sm">
                  {filteredBlogs?.map((item, index) => (
                    <Link
                      key={index}
                      title={item.title}
                      href={`/${sanitizeUrl(
                        item.article_category
                      )}/${sanitizeUrl(item?.title)}`}
                    >
                      <div className="p-3 hover:bg-gray-50 border-b border-gray-100 text-gray-600 transition-colors duration-200 rounded-md hover:shadow-sm group">
                        <span className="group-hover:text-gray-800 transition-colors duration-200">
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-lg p-2 px-3 transition-all duration-300 ease-in-out opacity-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:shadow-md backdrop-blur-sm"
                placeholder="Search articles..."
                autoFocus
              />
            </>
          ) : (
            <button
              className="flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300 ease-in-out rounded-lg font-semibold p-2 px-3 group shadow-sm hover:shadow-md"
              onClick={handleSearchToggle}
            >
              <Search className="w-5 md:w-4 cursor-pointer group-hover:scale-110 transition-transform duration-200" />
              <span>Search</span>
            </button>
          )}
          <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer group lg:hidden">
            <Menu
              onClick={toggleSidebar}
              className="w-6 h-6 text-black group-hover:text-gray-700 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
      <div className="p-10 border-b border-gray-100 bg-gradient-to-r from-gray-50/30 to-white">
        <div className="flex justify-center">
          <div className="transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <Logo logo={logo} imagePath={imagePath} />
          </div>
        </div>
      </div>
    </>
  );
}
