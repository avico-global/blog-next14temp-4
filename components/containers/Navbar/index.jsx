import React, { useState,useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

export default function Navbar({
   logo,
   categories, 
   category, 
   blog_list,
   searchContainerRef, 
   handleSearchToggle,

}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const filteredBlogs = blog_list?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  const [hostName, setHostName] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostName(window.location.hostname);
    }
  }, []);

  return (
    <FullContainer className="py-3 sticky top-0 z-50 shadow-sm bg-white">
      <Container className="md:flex-row md:justify-between">
        <div className="flex items-center justify-between w-full gap-6">
          <Link 
           title={categories}
            href="/">
            <Image
              title={`Logo - ${hostName}`}
              height={70}
              width={80}
              src={logo}
              className="w-16 md:w-20"
              alt="logo"
            />
          </Link>
          <div className="text-lg font-bold hidden lg:flex items-center"
          ref={searchContainerRef}
          >
            {categories?.map((item, index) => (
              <Link
           title={categories}
                key={index}
                href={`/${item?.toLowerCase()?.replaceAll(" ", "-")}`}
                className={cn(
                  "font-bold capitalize px-3 py-1",
                  category === item && "border-b-2 mt-[2px] border-purple-500"
                )}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 relative bg-gray-100 rounded-md px-3 border">
            <Search className="w-4 -mt-1" 
            onClick={handleSearchToggle}
            />
            <input
              type="text"
              placeholder="Search article"
              className="border-none py-2 outline-none flex-1 bg-transparent"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                {filteredBlogs?.map((item, index) => (
                  <Link
           title={categories}
                    key={index}
                    href={`/${item?.article_category?.name
                      .toLowerCase()
                      ?.replaceAll(" ", "-")}/${item.title
                      ?.toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    <div className="p-2 hover:bg-gray-200 border-b">
                      {item.title}
                    </div>
                  </Link>
                ))}
                <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md p-1 transition-opacity duration-300 ease-in-out opacity-100"
                placeholder="Search..."
              />
              </div>
            )}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
