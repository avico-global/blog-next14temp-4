import React from "react";
import Head from "next/head";
import { Roboto } from "next/font/google";
import NavMenu from "@/components/containers/NavMenu";
import MustRead from "@/components/containers/MustRead";
import Footer from "@/components/containers/Footer";
import LatestBlogs from "@/components/containers/LatestBlogs";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import Banner from "@/components/containers/Banner";
import MostPopular from "@/components/containers/MostPopular";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import SectionHeading from "@/components/common/SectionHeading";

const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Home({
  logo,
  footer_text,
  blog_list,
  project_id,
  imagePath,
  meta,
  domain,
  copyright,
  categories,
  banner,
  contact_details,
}) {
  return (
    <div className={myFont.className}>
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
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
      </Head>
      <NavMenu
        project_id={project_id}
        blog_list={blog_list}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
      />
      <Banner
        title={banner.value.title}
        tagline={banner.value.tagline}
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${banner?.file_name}`}
      />

      <LatestBlogs articles={blog_list} project_id={project_id} />
      <MostPopular articles={blog_list} project_id={project_id} />
      <MustRead articles={blog_list} project_id={project_id} />
      <FullContainer className="mt-16">
        <Container>
          {categories?.map((category, index) => (
            <div key={index} className="w-full mb-12">
              <SectionHeading title={category} className="mb-7" />
              <div className="grid grid-cols-3 gap-8">
                {blog_list?.map(
                  (item, index) =>
                    item.article_category.name === category && (
                      <Link
                        title={item.imageTitle}
                        href={
                          project_id
                            ? `/${item.article_category.name}/${item.key}?${project_id}`
                            : `/${item.article_category.name}/${item.key}`
                        }
                        key={index}
                        className="flex flex-col gap-2 text-lg"
                      >
                        <div className="overflow-hidden relative h-52 w-full bg-gray-200 rounded-md ">
                          <Image
                            title={item.imageTitle}
                            alt={`blog ${item.imageTitle}`}
                            src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${item.image}`}
                            fill={true}
                            loading="lazy"
                            className="w-full h-full object-cover absolute top-0 scale-125"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-center text-inherit leading-tight">
                            {item.title}
                          </p>
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <p className="text-xs">
                              <span className="text-gray-400 text-xs">By</span>:{" "}
                              {item.author}
                            </p>
                            <span className="text-gray-400">--</span>
                            <p className="text-xs text-gray-400">
                              {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                )}
              </div>
            </div>
          ))}
        </Container>
      </FullContainer>
      <Footer
        blog_list={blog_list}
        categories={categories}
        contact_details={contact_details}
        project_id={project_id}
        imagePath={imagePath}
        copyright={copyright}
        footer_text={footer_text}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domain}/`,
              url: `http://${domain}/`,
              name: meta.title,
              isPartOf: {
                "@id": `http://${domain}`,
              },
              description: meta.description,
              inLanguage: "en-US",
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
                  url: `http://${domain}/${blog.title
                    ?.toLowerCase()
                    .replaceAll(" ", "-")}`,
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

  const logo = await callBackendApi({
    domain,
    query,
    type: "logo",
  });

  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });

  // Footer
  const footer_text = await callBackendApi({
    domain,
    query,
    type: "footer_text",
  });
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const banner = await callBackendApi({ domain, query, type: "banner" });

  return {
    props: {
      project_id,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      meta: meta?.data[0]?.value || null,
      logo: logo.data[0],
      banner: banner.data[0],
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      imagePath,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      contact_details: contact_details.data[0].value,
    },
  };
}
