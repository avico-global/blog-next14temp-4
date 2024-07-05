import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Footer from "@/components/containers/Footer";
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import LatestBlogs from "@/components/containers/LatestBlogs";
import Head from "next/head";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";

import { Roboto } from "next/font/google";
import JsonLd from "@/components/json/JsonLd";
import GoogleTagManager from "@/lib/GoogleTagManager";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SocialShare from "@/components/containers/SocialShare";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import NavMenu from "@/components/containers/NavMenu";
import MostPopular from "@/components/containers/MostPopular";
import MustRead from "@/components/containers/MustRead";
const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Blog({
  logo,
  myblog,
  blog_list,
  project_id,
  imagePath,
  categories,
  domain,
  about_me,
  contact_details,
  copyright,
  tag_list,
}) {
  const router = useRouter();
  const { category } = router.query;
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(myblog?.value.articleContent);
  const breadcrumbs = useBreadcrumbs();
  const lastFiveBlogs = blog_list.slice(-6);

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
        blog_list={blog_list}
        category={category}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
        project_id={project_id}
        contact_details={contact_details}
      />
      <FullContainer>
        <Container className="h-[62vh] bg-gradient-to-t from-black/50 overflow-hidden rounded-lg relative p-10 text-white md:justify-end">
          <Image
            title={myblog?.value?.imageTitle}
            alt={`blog ${myblog?.value?.imageTitle}`}
            src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`}
            fill={true}
            priority={true}
            loading="eager"
            className="-z-10 w-full h-full object-cover absolute top-0"
          />
          <div className="flex flex-col w-full gap-7">
            <Badge className="w-fit">
              {myblog?.value?.article_category?.name}
            </Badge>
            <h1 className="font-bold text-6xl capitalize max-w-screen-md">
              {myblog?.value.title}
            </h1>
            <p>{myblog?.value.tagline}</p>
            <div className="flex items-center gap-3">
              <p>{myblog?.value.author}</p> -<p>{myblog?.value.published_at}</p>
            </div>
          </div>
        </Container>
      </FullContainer>

      <FullContainer>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} className="pt-7 pb-5" />
          <div className="grid grid-cols-1 md:grid-cols-article gap-14 w-full">
            <div>
              <article className="prose lg:prose-xl max-w-full">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </article>
              <div className="mt-12">
                <h3 className="text-lg font-semibold">Share this article:</h3>
                <SocialShare
                  url={`http://${domain}${myblog?.article_category?.name}/${myblog?.key}`}
                  title={myblog?.value.title}
                />
              </div>
            </div>
            <Rightbar
              lastFiveBlogs={lastFiveBlogs}
              imagePath={imagePath}
              project_id={project_id}
              tag_list={tag_list}
              about_me={about_me}
              categories={categories}
              category={category}
              contact_details={contact_details}
            />
          </div>
        </Container>
      </FullContainer>

      <LatestBlogs articles={blog_list} project_id={project_id} />
      <MostPopular articles={blog_list} project_id={project_id} />
      <MustRead articles={blog_list} project_id={project_id} />
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
              "@type": "BlogPosting",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": myblog
                  ? `http://${domain}${myblog?.article_category?.name}/${myblog?.key}`
                  : "",
              },
              headline: myblog?.value.title,
              description: myblog?.value.articleContent,
              datePublished: myblog?.value.published_at,
              author: myblog?.value.author,
              image: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`,
              publisher: "Site Manager",
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
              "@type": "ItemList",
              url: `http://${domain}${myblog?.article_category?.name}/${myblog?.key}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}${blog?.article_category?.name}/${blog?.key}`,
                  name: blog.title,
                },
              })),
            },
            {
              "@type": "WebPage",
              "@id": `http://${domain}/${myblog?.key}`,
              url: `http://${domain}/${myblog?.article_category?.name}/${myblog?.key}`,
              name: myblog?.value?.meta_title,
              description: myblog?.value?.meta_description,
              publisher: {
                "@id": `http://${domain}`,
              },
              inLanguage: "en-US",
              isPartOf: { "@id": `http://${domain}` },
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`,
              },
              datePublished: myblog?.value.published_at,
              dateModified: myblog?.value.published_at,
            },
          ],
        }}
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
    type: params.blog,
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });

  const isValidBlog = blog_list.data[0].value.some(
    (item) => item.key === params.blog
  );

  if (!isValidBlog) {
    return {
      notFound: true,
    };
  }

  const tag_list = await callBackendApi({ domain, query, type: "tag_list" });
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({ domain, query, type: "copyright" });

  return {
    props: {
      domain,
      imagePath,
      project_id,
      logo: logo?.data[0] || null,
      myblog: blog?.data[0] || null,
      blog_list: blog_list.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value,
      copyright: copyright.data[0].value || null,
    },
  };
}
