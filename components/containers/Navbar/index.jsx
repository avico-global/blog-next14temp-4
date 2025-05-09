import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import Style1 from "./Style1";
import Style2 from "./Style2";
import Style3 from "./Style3";
import Style4 from "./Style4";
import Style5 from "./Style5";
import Style6 from "./Style6";
import Style7 from "./Style7";
import Style8 from "./Style8";
import Style9 from "./Style9";
import { sanitizeUrl } from "@/lib/myFun";
import FullContainer from "@/components/common/FullContainer";
import Logo from "./Logo";

const Navbar = ({
  logo,
  nav_type,
  imagePath,
  blog_list,
  categories,
  category,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const searchContainerRef = useRef(null);
  const addFromRef = useRef();
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleSearchToggle = () => {
    setOpenSearch((prev) => !prev);
    if (!openSearch) setSearchQuery("");
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target) &&
      !event.target.closest('input[type="text"]') &&
      !event.target.closest('a')
    ) {
      setOpenSearch(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (openSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  // Add router event listener to close search on navigation
  useEffect(() => {
    const handleRouteChange = () => {
      setOpenSearch(false);
      setSearchQuery("");
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const toggleSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const handleClickOutsideSidebar = (event) => {
      if (addFromRef.current && !addFromRef.current.contains(event.target)) {
        if (sidebar) toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutsideSidebar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSidebar);
    };
  }, [sidebar]);

  const filteredBlogs = blog_list?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const staticPages = [
    { page: "Home", href: "/" },
    { page: "About Us", href: "/about" },
    // { page: "Contact Us", href: "/contact" },
  ];

  const renderActiveStyle = () => {
    const props = {
      logo,
      category,
      staticPages,
      isActive,
      imagePath,
      openSearch,
      searchQuery,
      searchContainerRef,
      handleSearchChange,
      handleSearchToggle,
      toggleSidebar,
      filteredBlogs,
      categories,
    };

    switch (nav_type?.active) {
      case "style_1":
        return <Style1 {...props} />;
      case "style_2":
        return <Style2 {...props} />;
      case "style_3":
        return <Style3 {...props} />;
      case "style_4":
        return <Style4 {...props} />;
      case "style_5":
        return <Style5 {...props} />;
      case "style_6":
        return <Style6 {...props} />;
      case "style_7":
        return <Style7 {...props} />;
      case "style_8":
        return <Style8 {...props} />;
      case "style_9":
        return <Style9 {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="hidden lg:block">{renderActiveStyle()}</div>

      <FullContainer className="lg:hidden sticky top-0 z-20 bg-white shadow lg:py-0">
        <div className="flex justify-between lg:grid grid-cols-nav w-11/12 md:w-10/12 mx-auto items-center">
          <div className="py-2">
            <Logo logo={logo} imagePath={imagePath} />
          </div>
          <div
            className="flex items-center justify-end gap-3 text-gray-500 relative "
            ref={searchContainerRef}
          >
            <div className="flex items-center justify-end gap-2">
              <Search
                className="w-5 md:w-4 text-black cursor-pointer"
                onClick={handleSearchToggle}
              />
              <Menu
                onClick={toggleSidebar}
                className="w-6 h-6 ml-1 text-black lg:hidden"
              />
            </div>
            {openSearch && (
              <>
                <div className="fixed lg:absolute top-16 lg:right-0 lg:ml-auto w-full lg:w-fit flex flex-col items-start justify-center lg:justify-end left-0">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="lg:text-xl border border-gray-300 inputField rounded-md outline-none bg-white shadow-xl p-2 px-3 mx-auto transition-opacity duration-300 ease-in-out opacity-100 w-5/6 lg:w-[650px] focus:ring-2 focus:ring-yellow-500"
                    placeholder="Search..."
                    autoFocus
                  />
                  {searchQuery && (
                    <div className="lg:absolute top-full p-1 lg:p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 mx-auto w-5/6 lg:w-[650px]">
                      {filteredBlogs?.length > 0 ? (
                        filteredBlogs.map((item, index) => (
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
                        ))
                      ) : (
                        <div className="p-2 text-gray-600">
                          No articles found.
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

      <div
        ref={addFromRef}
        className={`h-screen w-7/12 transition-all overflow-y-scroll z-50 fixed right-0 top-0 px-4 bg-white dark:bg-gray-800 capitalize ${
          sidebar && "shadow-xl"
        }`}
        style={{ transform: sidebar ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-end gap-3 h-[52px]">
          <Search
            className="w-5 md:w-4 text-black cursor-pointer"
            onClick={() => {
              toggleSidebar();
              handleSearchToggle();
            }}
          />
          <Menu onClick={toggleSidebar} className="w-6 h-6 md:hidden ml-1" />
        </div>
        <div className="flex flex-col mt-5">
          <Link
            title="Home"
            href="/"
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/") && "border-black text-black"
            )}
          >
            Home
          </Link>
          {categories?.map((item, index) => (
            <Link
              key={index}
              title={item}
              href={`/${sanitizeUrl(item?.title)}`}
              className={cn(
                "font-semibold text-gray-500 capitalize hover:text-black transition-all py-3 px-2 border-b hover:border-black",
                (category === item?.title || isActive(`/${item?.title}`)) &&
                  "border-black text-black"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Link
            title="About"
            href="/about"
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/about") && "border-black text-black"
            )}
          >
            About
          </Link>
          <Link
            title="Contact"
            href="/contact"
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/contact") && "border-black text-black"
            )}
          >
            Contact
          </Link>
          <Link
            title="Privacy Policy"
            href="/privacy-policy"
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/privacy-policy") && "border-black text-black"
            )}
          >
            Privacy Policy
          </Link>
          <Link
            title="Terms & Conditions"
            href="/terms-and-conditions"
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/terms-and-conditions") && "border-black text-black"
            )}
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
