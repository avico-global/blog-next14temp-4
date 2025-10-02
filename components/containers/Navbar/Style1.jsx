import FullContainer from "@/components/common/FullContainer";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style1({
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
  return (
    <FullContainer className="sticky top-0 z-20 bg-white shadow-lg backdrop-blur-sm bg-white/95 border-b border-gray-100">
      <div className="flex justify-between lg:grid grid-cols-nav w-11/12 md:w-10/12 border-0 max-w-[1300px] gap-10 mx-auto items-center py-2">
        <div className="hidden lg:flex items-center justify-start space-x-1">
          {staticPages.map((item, index) => (
            <Link
              key={index}
              title={item.page}
              href={item.href}
              className={cn(
                "font-semibold text-gray-500 capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all duration-300 ease-in-out px-3 py-4 rounded-t-lg hover:bg-gray-50/50 relative group",
                isActive(item.href) && "border-black text-black bg-gray-50/30"
              )}
            >
              <span className="relative z-10">{item.page}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50/0 to-gray-50/20 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
        <div className="py-2 flex justify-center">
          <div className="transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <Logo logo={logo} imagePath={imagePath} />
          </div>
        </div>
        <div
          className="flex items-center justify-between gap-3 text-gray-500 relative"
          ref={searchContainerRef}
        >
          <div className="hidden lg:flex items-center justify-end space-x-1">
            {categories?.map((item, index) => (
              <Link
                key={index}
                title={item?.title}
                href={`/${sanitizeUrl(item?.title)}`}
                className={cn(
                  "font-semibold text-gray-500 capitalize hover:text-black border-transparent transition-all duration-300 ease-in-out py-4 px-3 border-b-2 hover:border-black w-fit rounded-t-lg hover:bg-gray-50/50 relative group",
                  (category === item?.title || isActive(`/${item.title}`)) &&
                    "border-black text-black bg-gray-50/30"
                )}
              >
                <span className="relative z-10">{item.title}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50/0 to-gray-50/20 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2">
            <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
              <Search
                className="w-5 md:w-4 text-black group-hover:text-gray-700 transition-colors duration-200"
                onClick={handleSearchToggle}
              />
            </div>
          </div>
          {openSearch && (
            <>
              <div className="fixed lg:absolute top-20 lg:right-0 lg:ml-auto w-full lg:w-fit flex flex-col items-start justify-center lg:justify-end left-0">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="lg:text-xl border border-gray-300 inputField rounded-lg outline-none bg-white shadow-2xl p-3 px-4 mx-auto transition-all duration-300 ease-in-out opacity-100 w-5/6 lg:w-[650px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:shadow-xl backdrop-blur-sm"
                  placeholder="Search articles..."
                  autoFocus
                />
                {searchQuery && (
                  <div className="lg:absolute top-full p-1 lg:p-3 right-0 bg-white shadow-2xl rounded-lg mt-2 z-10 mx-auto w-5/6 lg:w-[650px] border border-gray-100 backdrop-blur-sm">
                    {filteredBlogs?.length > 0 ? (
                      filteredBlogs.map((item, index) => (
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
                      ))
                    ) : (
                      <div className="p-3 text-gray-500 text-center">
                        <span className="text-sm">No articles found.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </FullContainer>
  );
}
