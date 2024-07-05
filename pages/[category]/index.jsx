import React from "react";
import Head from "next/head";
import Footer from "@/components/containers/Footer";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import MarkdownIt from "markdown-it";

import { Roboto } from "next/font/google";
import NavMenu from "@/components/containers/NavMenu";
const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Categories({
  logo,
  blog_list,
  imagePath,
  meta,
  domain,
  categories,
  project_id,
  about_me,
  contact_details,
  copyright,
}) {
  const router = useRouter();
  const { category } = router.query;
  const breadcrumbs = useBreadcrumbs();
  const markdownIt = new MarkdownIt();

  const convertMarkdown = (markdownText) => markdownIt?.render(markdownText);

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = category?.replace("-", " ");
    return (
      item.title.toLowerCase().includes(searchContent) ||
      item.article_category.name.toLowerCase().includes(searchContent) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(searchContent)) ||
      item.articleContent.toLowerCase().includes(searchContent)
    );
  });

  return (
    <div
      className={cn(
        myFont.className,
        "flex flex-col min-h-screen justify-between"
      )}
    >
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`http://${domain}`} />
        <link rel="publisher" href={`http://${domain}`} />
        <link rel="canonical" href={`http://${domain}`} />
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

      <NavMenu
        category={category}
        project_id={project_id}
        blog_list={blog_list}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        contact_details={contact_details}
      />
      <FullContainer className="w-full py-8 bg-gray-100">
        <p className="text-2xl font-semibold capitalize px-4 py-1">
          {category?.replace("-", " ")}
        </p>
        <div className="w-24 mt-2 h-1 bg-gray-500"></div>
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          className="mt-1 justify-center"
        />
      </FullContainer>
      <FullContainer className="py-16">
        <Container>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredBlogList.map((item, index) => (
              <div key={index}>
                <Link
                  href={
                    project_id
                      ? `/${category}/${item.key}?${project_id}`
                      : `/${category}/${item.key}`
                  }
                >
                  <div className="overflow-hidden relative min-h-40 rounded lg:min-h-72 w-full bg-black flex-1">
                    <Image
                      title={item.imageTitle}
                      src={
                        item.image
                          ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                          : "/no-image.png"
                      }
                      fill={true}
                      loading="lazy"
                      alt="blog"
                      className="w-full h-full object-cover absolute top-0 scale-125"
                    />
                  </div>
                </Link>
                <p className="mt-2 lg:mt-3 font-bold text-lg text-inherit leading-tight">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm font-semibold">
                    <span className="text-gray-400 text-sm">By</span>:{" "}
                    {item.author}
                  </p>
                  <span className="text-gray-400">--</span>
                  <p className="text-sm text-gray-400 font-semibold">
                    {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                  </p>
                </div>
                <div
                  className="mt-1 markdown-content"
                  style={{ fontSize: 12 }}
                  dangerouslySetInnerHTML={{
                    __html: convertMarkdown(item?.articleContent).slice(0, 200),
                  }}
                />
              </div>
            ))}
          </div>
        </Container>
      </FullContainer>
      <Footer
        blog_list={blog_list}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
        project_id={project_id}
        imagePath={imagePath}
        about_me={about_me}
        contact_details={contact_details}
        copyright={copyright}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domain}/${category}`,
              url: `http://${domain}/${category}`,
              name: meta?.title,
              isPartOf: {
                "@id": `http://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
              })),
            },
            {
              "@type": "Organization",
              "@id": `http://${domain}`,
              name: domain,
              url: `http://${domain}/`,
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`,
              },
              sameAs: [
                "http://www.facebook.com",
                "http://www.twitter.com",
                "http://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `http://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${blog?.article_category?.name}/${blog.key}`,
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
  const project_id = getProjectId(query);
  const imagePath = await getImagePath({ domain, query });

  const logo_black = await callBackendApi({
    domain,
    query,
    type: "logo_black",
  });

  const logo = await callBackendApi({
    domain,
    query,
    type: "logo",
  });

  const banner = await callBackendApi({ domain, query, type: "banner" });
  const footer_text = await callBackendApi({
    domain,
    query,
    type: "footer_text",
  });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });

  return {
    props: {
      logo_black: logo_black?.data[0] || null,
      logo: logo.data[0],
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      imagePath,
      project_id,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value,
    },
  };
}
