import React, { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import { cn } from "@/lib/utils";

export default function NavMenu({
  logo,
  categories,
  category,
  blog_list,
  project_id,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogs = blog_list?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <FullContainer className="py-3 sticky top-0 z-50 shadow-sm bg-white">
      <Container className="md:flex-row md:justify-between">
        <div className="flex items-center justify-between w-full gap-6">
          <Link href="/">
            <Image
              height={70}
              width={80}
              src={logo}
              className="w-16 md:w-20"
              alt="logo"
            />
          </Link>
          <div className="text-lg font-bold hidden lg:flex items-center">
            {categories?.map((item, index) => (
              <Link
                key={index}
                href={
                  project_id
                    ? `/categories/${item}?${project_id}`
                    : `/categories/${item}`
                }
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
            <Search className="w-4 -mt-1" />
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
                    key={index}
                    href={
                      project_id
                        ? `/${item.title
                            ?.toLowerCase()
                            .replaceAll(" ", "-")}?${project_id}`
                        : `/${item.title?.toLowerCase().replaceAll(" ", "-")}`
                    }
                  >
                    <div className="p-2 hover:bg-gray-200 border-b">
                      {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
