import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style4({
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
}) {
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const navLink =
    "font-semibold capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all p-2 whitespace-nowrap";

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (openSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [openSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b text-gray-500 sticky top-0 z-20 bg-white py-2">
      <div className="w-11/12 max-w-screen-lg flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <Logo logo={logo} imagePath={imagePath} />
        </div>

        <div className="hidden lg:flex items-center justify-center">
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

          <div
            className="relative"
            onMouseEnter={() => setHoveredCategory(true)}
            onMouseLeave={() => setHoveredCategory(false)}
          >
            <button className={navLink}>Categories</button>
            {hoveredCategory && (
              <div className="absolute right-0 w-auto bg-white border rounded shadow-lg">
                <ul>
                  {categories?.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 whitespace-nowrap border-b last:border-none font-semibold hover:text-black transition-all"
                    >
                      <Link href={`/${sanitizeUrl(item?.title)}`}>
                        {item?.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
  
        <div className="flex items-center justify-end gap-3 relative">
          {searchQuery && isSearchOpen && (
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
          <div 
            ref={searchContainerRef}
            className="hidden lg:flex items-center border border-gray-300 rounded-md px-2 gap-1"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-4 h-4" />
            <input
              ref={searchInputRef}
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
  );
}
