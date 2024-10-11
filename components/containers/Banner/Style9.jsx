import React from "react";
import FullContainer from "../../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import MostPopular from "../MostPopular";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
} from "@/lib/myFun";

export default function Style9({ image, data, blog_list, imagePath }) {
  return (
    <FullContainer
      className="min-h-[63vh] overflow-hidden p-4   grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-20" // Adjusted gap for responsiveness
      style={{
        color: data.textColor || "white",
      }}
    >
      <Image
        src={image}
        title={data.imageTitle || data.title || "Banner"}
        alt={data.altImage || data.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0"
        objectFit="cover"
        sizes="(max-width: 320px) 320px,
               (max-width: 480px) 480px,
               (max-width: 768px) 768px,
               (max-width: 1024px) 1024px,
               (max-width: 1280px) 1280px,
               (max-width: 1600px) 1600px,
               (max-width: 1920px) 1920px,
               (max-width: 2560px) 2560px,
               (max-width: 3840px) 3840px,
               100vw"
      />
      {/* Text Column */}
      <div className="flex flex-col justify-center  mx-auto max-w-[1200px] items-center lg:items-start space-y-5 py-14 lg:py-28 lg:px-6  lg:rounded-lg text-center lg:text-left">
        <div className="flex flex-col gap-4">
          <h1
            style={{ fontSize: data.titleFontSize || 48 }}
            className="font-bold capitalize text-white text-4xl lg:text-5xl" // Responsive text size
          >
            {data.title}
          </h1>
          {data.tagline && (
            <h2
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-tight text-white text-lg lg:text-xl" // Responsive tagline size
            >
              {data.tagline}
            </h2>
          )}
        </div>
        <Link
          href="/"
          className="inline-block text-white bg-black py-3 px-6 rounded-full text-lg lg:text-xl hover:bg-white hover:text-black transition-colors duration-300"
        >
          View Our Blogs
        </Link>
      </div>

      {/* Image Column */}
      {blog_list?.length > 0 && (
        <MostPopular blog_list={blog_list} imagePath={imagePath} />
      )}
    </FullContainer>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  console.log("blog_list", blog_list);
  const categories = await callBackendApi({ domain, type: "categories" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const all_data = await callBackendApi({ domain, type: "" });
  const imagePath = await getImagePath(project_id, domain);

  robotsTxt({ domain });

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      copyright: copyright?.data[0].value || null,
      about_me: about_me?.data[0] || null,
      banner: banner?.data[0],
      contact_details: contact_details?.data[0]?.value,
      nav_type: nav_type?.data[0]?.value || {},
      tag_list: tag_list?.data[0]?.value || null,
      all_data,
    },
  };
}
