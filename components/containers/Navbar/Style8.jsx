import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import SocialShare from "@/components/common/SocialShare";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style8({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  imagePath,
  handleSearchChange,
  toggleSidebar,
  openSearch,
  searchQuery,
  category,
  domain,
  myblog,
}) {
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const navLink =
    "font-semibold capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all p-2 whitespace-nowrap";

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (openSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [openSearch]);

  return (
    <div>
      {/* <div className=" bg-black ">
        <div className=" flex items-center justify-between mx-auto text-white max-w-[1300px] pb-1  ">
          <p className="text-xs lg:text-lg py-3">
            {" "}
            Latest Posts: Latest New Ideas For Mens fashion
          </p>
        </div>
      </div> */}
      <div className="border-b text-gray-500 sticky top-0 z-20 bg-white py-6">
        <div className=" flex items-center justify-between mx-auto max-w-[1300px] ">
          <div className="flex">
            <div className="flex items-center">
              <Logo logo={logo} imagePath={imagePath} />
            </div>

            <div className="hidden lg:flex items-center justify-end">
              {categories?.map((item, index) => (
                <Link
                  key={index}
                  title={item?.title}
                  href={`/${sanitizeUrl(item?.title)}`}
                  className={cn(
                    "font-semibold text-gray-500 capitalize hover:text-black border-transparent transition-all py-4 px-2 border-b-2 hover:border-black w-fit",
                    (category === item?.title || isActive(`/${item?.title}`)) &&
                      "border-black text-black"
                  )}
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 relative">
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
            <div className="hidden lg:flex items-center border border-gray-300 rounded-md px-2 gap-1">
              <Search className="w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-1 transition-opacity duration-300 ease-in-out opacity-100 flex-1 outline-none"
                placeholder="Search..."
              />
            </div>
            <Menu
              onClick={toggleSidebar}
              className="w-6 h-6 ml-1 text-black lg:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
