import BlogBannerStyle2 from "./BlogBannerStyle2";
import BlogBannerStyle3 from "./BlogBannerStyle3";
import BlogBannerStyle4 from "./BlogBannerStyle4";
import BlogBannerStyle6 from "./BlogBannerStyle6";
import BlogBannerStyle5 from "./BlogBannerStyle5";
import BlogBannerStyle7 from "./BlogBannerStyle7";
import BlogBannerStyle8 from "./BlogBannerStyle8";
import BlogBannerStyle1 from "./BlogBannerStyle1";
import BlogBannerStyle9 from "./BlogBannerStyle9";
import BlogBannerStyle10 from "./BlogBannerStyle10";

export default function BlogBanner({ myblog, imagePath, blog_type }) {
  const renderActiveStyle = () => {
    const props = {
      myblog,
      imagePath,
    };

    switch (blog_type?.active) {
      case "style_1":
        return <BlogBannerStyle1 {...props} />;
      case "style_2":
        return <BlogBannerStyle2 {...props} />;
      case "style_3":
        return <BlogBannerStyle3 {...props} />;
      case "style_4":
        return <BlogBannerStyle4 {...props} />;
      case "style_5":
        return <BlogBannerStyle5 {...props} />;
      case "style_6":
        return <BlogBannerStyle6 {...props} />;
      case "style_7":
        return <BlogBannerStyle7 {...props} />;
      case "style_8":
        return <BlogBannerStyle8 {...props} />;
      case "style_9":
        return <BlogBannerStyle9 {...props} />;
      case "style_10":
        return <BlogBannerStyle10 {...props} />;
      default:
        return null;
    }
  };

  return <>{renderActiveStyle()}</>;
}
