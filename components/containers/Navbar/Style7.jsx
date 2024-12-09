import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";

export default function Style7({
  logo,
  isActive,
  category,
  imagePath,
  categories,
  staticPages,
  toggleSidebar,
}) {
  const STYLES = {
    nav: "font-semibold capitalize border-b-4 border-transparent hover:border-purple-400 transition-all px-4 pb-4 pt-5",
    logoContainer: "p-5 bg-white",
    navContainer:
      "flex justify-between items-center mx-auto shadow-sm w-full bg-purple-100 text-purple-600 sticky top-0 z-20",
    linksWrapper: "container flex justify-center items-center",
    desktopLinks: "hidden lg:flex justify-center items-center",
    menuButton: "w-6 h-6 ml-1 text-black lg:hidden",
  };

  const renderNavLink = (item, href, isCurrentPage) => (
    <Link
      key={href}
      title={item.page || item.title}
      href={href}
      className={cn(STYLES.nav, isCurrentPage && "border-white text-white")}
    >
      {item.page || item.title}
    </Link>
  );

  return (
    <>
      <div className={STYLES.logoContainer}>
        <Logo logo={logo} imagePath={imagePath} />
      </div>
      <nav className={STYLES.navContainer}>
        <div className={STYLES.linksWrapper}>
          <div className={STYLES.desktopLinks}>
            {categories?.length < 3 &&
              staticPages.map((item) =>
                renderNavLink(item, item.href, isActive(item.href))
              )}

            {categories?.map((item) =>
              renderNavLink(
                item,
                `/${sanitizeUrl(item.title)}`,
                category === item.title || isActive(`/${item.title}`)
              )
            )}
          </div>

          <Menu onClick={toggleSidebar} className={STYLES.menuButton} />
        </div>
      </nav>
    </>
  );
}
