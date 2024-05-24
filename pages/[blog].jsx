import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Banner from "@/components/containers/Banner";
import Footer from "@/components/containers/Footer";
import { Montserrat } from "next/font/google";
import MarkdownIt from "markdown-it";
import Head from "next/head";
import LatestBlogs from "@/components/containers/LatestBlogs";
import NavMenu from "@/components/containers/NavMenu";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Blog({
  logo,
  myblog,
  blog_list,
  project_id,
  imagePath,
  domain,
  blog_categories,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(myblog?.value.articleContent);
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
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
      <FullContainer>
        <NavMenu
          blog_categories={blog_categories}
          logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} className="py-4" />
          <div className="grid grid-cols-article gap-12 w-full">
            <div>
              <Banner
                tagline={myblog?.value.tagline}
                image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`}
                published_at={myblog?.value.published_at}
              />
              <div className="flex items-center pl-4 py-1 mt-5 border-l-4 border-purple-400">
                <p className="font-bold text-xl">{myblog?.value.title}</p>
              </div>
              <div className="py-2 bg-gray-50 text-sm mt-5 border-y justify-between flex items-center w-full capitalize">
                <p className="text-sm">
                  By: {myblog?.value.author} On{" "}
                  {dayjs(myblog?.value?.published_at)?.format("MMM D, YYYY")}
                </p>
                <p className="text-sm font-semibold">
                  {myblog?.value?.article_category?.name}
                </p>
              </div>
              <div
                className="prose mt-5 max-w-full"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-black text-white py-2 px-4 font-semibold capitalize">
                Recent {myblog?.value?.article_category?.name} Posts
              </div>
              {blog_list.map(
                (item, index) =>
                  item?.article_category?.name ===
                    myblog?.value?.article_category?.name && (
                    <div
                      key={index}
                      className="grid grid-cols-widget gap-3 border-b pb-6"
                    >
                      <Link
                        href={
                          project_id
                            ? `/${item.title
                                ?.toLowerCase()
                                .replaceAll(" ", "-")}?${project_id}`
                            : `/${item.title
                                ?.toLowerCase()
                                .replaceAll(" ", "-")}`
                        }
                      >
                        <div className="overflow-hidden relative min-h-24 w-full bg-black flex-1">
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
                            className="w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
                          />
                        </div>
                      </Link>
                      <div>
                        <p className="font-bold leading-tight">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs">
                            <span className="text-gray-400 text-xs">By</span>:{" "}
                            {item.author}
                          </p>
                          <span className="text-gray-400">-</span>
                          <p className="text-xs text-gray-400 font-semibold">
                            {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
          <LatestBlogs
            blogs={blog_list}
            project_id={project_id}
            imagePath={imagePath}
          />
        </Container>
      </FullContainer>
      <Footer
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
      />
    </div>
  );
}

export async function getServerSideProps({ params, req, query }) {
  const domain = getDomain(req?.headers?.host);
  const imagePath = await getImagePath({ domain, query });
  const project_id = getProjectId(query);
  const blog = await callBackendApi({
    domain,
    query,
    type: params.blog.replaceAll("-", "_"),
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });

  const isValidBlog = blog_list.data[0].value.some(
    (item) => item.title.toLowerCase().replaceAll(" ", "-") === params.blog
  );

  if (!isValidBlog) {
    return {
      notFound: true,
    };
  }
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });
  const blog_categories = await callBackendApi({
    domain,
    query,
    type: "blog_categories",
  });

  return {
    props: {
      logo: logo?.data[0] || null,
      myblog: blog?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || nul,
      meta: meta?.data[0]?.value || null,
      imagePath,
      project_id,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      blog_categories: blog_categories?.data[0]?.value || null,
    },
  };
}
