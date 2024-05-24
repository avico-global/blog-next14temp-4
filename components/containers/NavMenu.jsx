import React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import { cn } from "@/lib/utils";

export default function NavMenu({ logo, blog_categories, category }) {
  return (
    <FullContainer className="py-2 sticky -top-1 z-50 shadow-sm bg-white">
      <Container className="md:flex-row md:justify-between">
        <div className="flex items-center justify-between w-full gap-6">
          <Link href="/">
            <Image height={70} width={80} src={logo} alt="logo" />
          </Link>
          <div className="text-lg font-bold hidden lg:flex items-center">
            {blog_categories?.map((item, index) => (
              <Link
                key={index}
                href={`/categories/${item}`}
                className={cn(
                  "font-bold capitalize px-4 py-1",
                  category === item && "border-b-2 mt-[2px] border-purple-500"
                )}
              >
                {item}
              </Link>
            ))}
          </div>
          <Search className="w-6" />
        </div>
      </Container>
    </FullContainer>
  );
}
