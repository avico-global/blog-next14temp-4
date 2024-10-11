import React, { useState, useRef, useEffect } from "react";
import Style1 from "./Style1";
import Style2 from "./Style2";
import Style3 from "./Style3";
import Style4 from "./Style4";
import Style5 from "./Style5";
import Style6 from "./Style6";
import Style7 from "./Style7";
import Style8 from "./Style8";
import Style9 from "./Style9";

export default function Banner({ image, data, blog_list }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const filteredBlogs = blog_list?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );
  const searchContainerRef = useRef(null);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleSearchToggle = () => {
    setOpenSearch((prev) => !prev);
    if (!openSearch) setSearchQuery("");
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
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

  const renderActiveStyle = () => {
    const props = {
      openSearch,
      searchQuery,
      searchContainerRef,
      handleSearchChange,
      handleSearchToggle,
      filteredBlogs,
      image,
      data,
    };

    switch (data?.active) {
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
  return renderActiveStyle();
}
