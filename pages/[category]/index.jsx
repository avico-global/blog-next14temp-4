import React, { useEffect } from "react";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/containers/Navbar";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Container from "@/components/common/Container";
import Footer from "@/components/containers/Footer";
import JsonLd from "@/components/json/JsonLd";
import Image from "next/image";
import Link from "next/link";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";

export default function Category({
  copyright,
  blog_list,
  tag_list,
  about_me,
  domain,
  logo,
  meta,
  page,
  nav_type,
  imagePath,
  categories,
  contact_details,
}) {
  const router = useRouter();
  const { category } = router.query;

  const breadcrumbs = useBreadcrumbs();

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = sanitizeUrl(category);
    const articleCategory = sanitizeUrl(item.article_category);
    return articleCategory === searchContent;
  });

  useEffect(() => {
    const currentPath = router.asPath;

    if (category && (category.includes("%20") || category.includes(" "))) {
      const newCategory = category.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [category, router]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {meta?.title?.replaceAll(
            "##category##",
            category?.replaceAll("-", " ")
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          )}
        </title>
        <meta
          name="description"
          content={meta?.description.replaceAll(
            "##category##",
            category?.replaceAll("-", " ")
          )}
        />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/${category}`} />
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`https://api15.ecommcube.com/${domain}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`https://api15.ecommcube.com/${domain}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`https://api15.ecommcube.com/${domain}/favicon-16x16.png`}
        />
      </Head>

      {page?.enable
        ? page?.sections?.map((item, index) => {
            if (!item.enable) return null;
            switch (item.section?.toLowerCase()) {
              case "navbar":
                return (
                  <Navbar
                    key={index}
                    category={category}
                    blog_list={blog_list}
                    categories={categories}
                    logo={logo}
                    nav_type={nav_type}
                    imagePath={imagePath}
                    contact_details={contact_details}
                  />
                );

              case "breadcrumbs":
                return (
                  <FullContainer
                    key={index}
                    className="w-full py-8 bg-gray-100"
                  >
                    <h1 className="text-2xl font-semibold capitalize px-4 py-1">
                      {category?.replace("-", " ")}
                    </h1>
                    <div className="w-24 mt-2 h-1 bg-gray-500"></div>
                    <Breadcrumbs
                      breadcrumbs={breadcrumbs}
                      className="mt-1 justify-center"
                    />
                  </FullContainer>
                );

              case "search result":
                return (
                  <FullContainer key={index} className="py-16">
                    <Container>
                      <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full">
                        <div>
                          {/* <h1 className="text-2xl font-semibold border-l-4 border-primary capitalize px-4 py-1 mb-7 w-full">
                            Browsing: {category?.replaceAll("-", " ")}
                          </h1> */}
                          {filteredBlogList?.length > 0 ? (
                            ""
                          ) : (
                            <div className="flex items-center justify-center border px-10 py-40 text-lg bg-gray-200">
                              No articles found related to {category}
                            </div>
                          )}
                          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredBlogList.map((item, index) => (
                              <div key={index}>
                                <Link
                                  title={item?.title || "Article Link"}
                                  href={`/${sanitizeUrl(
                                    item.article_category
                                  )}/${sanitizeUrl(item?.title)}`}
                                >
                                  <div className="overflow-hidden relative min-h-40 rounded lg:min-h-52 w-full bg-black flex-1">
                                    <Image
                                      title={item?.title || item.imageTitle}
                                      src={
                                        item.image
                                          ? `${imagePath}/${item.image}`
                                          : "/no-image.png"
                                      }
                                      fill={true}
                                      loading="lazy"
                                      alt="blog"
                                      className="w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
                                    />
                                  </div>
                                </Link>
                                <Link
                                  title={item?.title || "Article Link"}
                                  href={`/${sanitizeUrl(
                                    item.article_category
                                  )}/${sanitizeUrl(item?.title)}`}
                                >
                                  <p className="mt-2 lg:mt-4 font-bold text-lg text-inherit leading-tight hover:underline">
                                    {item.title}
                                  </p>
                                </Link>
                                <div className="flex items-center gap-2 mt-2">
                                  <p className="text-sm font-semibold">
                                    <span className="text-gray-400 text-sm">
                                      By
                                    </span>
                                    : {item.author}
                                  </p>
                                  <span className="text-gray-400">--</span>
                                  <p className="text-sm text-gray-400 font-semibold">
                                    {dayjs(item?.published_at)?.format(
                                      "MMM D, YYYY"
                                    )}
                                  </p>
                                </div>
                                <p className="text-gray-500 mt-4">
                                  {item.tagline}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Rightbar
                          about_me={about_me}
                          tag_list={tag_list}
                          blog_list={blog_list}
                          imagePath={imagePath}
                          categories={categories}
                          contact_details={contact_details}
                          widgets={page?.widgets}
                        />
                      </div>
                    </Container>
                  </FullContainer>
                );

              case "footer":
                return (
                  <Footer
                    key={index}
                    blog_list={blog_list}
                    categories={categories}
                    logo={logo}
                    imagePath={imagePath}
                    about_me={about_me}
                    contact_details={contact_details}
                    copyright={copyright}
                  />
                );
              default:
                return null;
            }
          })
        : "Page Disabled, under maintenance"}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `https://${domain}${breadcrumb.url}`,
              })),
            },
            {
              "@type": "WebPage",
              "@id": `https://${domain}/${category}`,
              url: `https://${domain}/${category}`,
              name: meta?.title?.replaceAll(
                "##category##",
                category?.replaceAll("-", " ")
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              ),
              description: meta?.description.replaceAll(
                "##category##",
                category?.replaceAll("-", " ")
              ),
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `https://${domain}`,
              },
            },
            {
              "@type": "ItemList",
              url: `https://${domain}/${category}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `https://${domain}/${sanitizeUrl(
                    blog?.article_category.replaceAll(" ", "-")
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog.title,
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category } = query;

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const footer_text = await callBackendApi({ domain, type: "footer_text" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const meta = await callBackendApi({ domain, type: "meta_category" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "category");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0],
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value,
      tag_list: tag_list?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
