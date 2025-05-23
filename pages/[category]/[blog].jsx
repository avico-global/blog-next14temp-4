import React, { useEffect } from "react";
import Footer from "@/components/containers/Footer";
import LatestBlogs from "@/components/containers/LatestBlogs";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Navbar from "@/components/containers/Navbar";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import JsonLd from "@/components/json/JsonLd";
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import Head from "next/head";

import {
  getDomain,
  sanitizeUrl,
  getImagePath,
  callBackendApi,
} from "@/lib/myFun";

import GoogleTagManager from "@/lib/GoogleTagManager";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SocialShare from "@/components/containers/SocialShare";
import MostPopular from "@/components/containers/MostPopular";
import BlogBanner from "@/components/containers/BlogBanner";
import MustRead from "@/components/containers/MustRead";

export default function Blog({
  contact_details,
  categories,
  blog_list,
  copyright,
  tag_list,
  domain,
  logo,
  page,
  myblog,
  about_me,
  nav_type,
  blog_type,
  imagePath,
  project_id,
}) {
  const router = useRouter();
  const { category, blog } = router.query;

  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    myblog?.value?.articleContent?.replaceAll(
      `https://api.sitebuilderz.com/images/project_images/${project_id}/`,
      imagePath
    ) || ""
  );

  const breadcrumbs = useBreadcrumbs();

  useEffect(() => {
    if (
      category.includes("%20") ||
      category.includes(" ") ||
      blog.includes("%20") ||
      blog.includes(" ", "-")
    ) {
      const newCategory = sanitizeUrl(category);
      const newBlog = sanitizeUrl(blog);
      router.replace(`/${newCategory}/${newBlog}`);
    }
  }, [category, router, blog]);

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/${category}/${blog}`} />
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
          href={`${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${imagePath}/${logo.file_name}`}
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
                    blog_list={blog_list}
                    category={category}
                    categories={categories}
                    logo={logo}
                    nav_type={nav_type}
                    imagePath={imagePath}
                    contact_details={contact_details}
                  />
                );
              case "banner":
                return (
                  <BlogBanner
                    key={index}
                    myblog={myblog}
                    imagePath={imagePath}
                    blog_type={blog_type}
                  />
                );
              case "breadcrumbs":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <Breadcrumbs
                        breadcrumbs={breadcrumbs}
                        className="pt-7 pb-5"
                      />
                    </Container>
                  </FullContainer>
                );
              case "blog text":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <div className="grid grid-cols-1 md:grid-cols-article gap-14 w-full">
                        <div>
                          <article className="prose lg:prose-xl max-w-full">
                            <div
                              dangerouslySetInnerHTML={{ __html: content }}
                            />
                          </article>
                          <div className="mt-12">
                            <h3 className="text-lg font-semibold">
                              Share this article:
                            </h3>
                            <SocialShare
                              url={`http://${domain}${myblog?.article_category}/${myblog?.key}`}
                              title={myblog?.value.title}
                            />
                          </div>
                        </div>
                        <Rightbar
                          about_me={about_me}
                          imagePath={imagePath}
                          categories={categories}
                          contact_details={contact_details}
                          tag_list={tag_list}
                          widgets={page?.widgets}
                          blog_list={blog_list}
                          category={category}
                        />
                      </div>
                    </Container>
                  </FullContainer>
                );
              case "latest posts":
                return (
                  <FullContainer className="mt-14" key={index}>
                    <Container>
                      <LatestBlogs articles={blog_list} imagePath={imagePath} />
                    </Container>
                  </FullContainer>
                );
              case "popular posts":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <MostPopular articles={blog_list} imagePath={imagePath} />
                    </Container>
                  </FullContainer>
                );
              case "must read":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <MustRead articles={blog_list} imagePath={imagePath} />
                    </Container>
                  </FullContainer>
                );
              case "footer":
                return (
                  <Footer
                    key={index}
                    logo={logo}
                    about_me={about_me}
                    blog_list={blog_list}
                    imagePath={imagePath}
                    copyright={copyright}
                    categories={categories}
                    contact_details={contact_details}
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
              "@type": "BlogPosting",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": myblog
                  ? `https://${domain}${sanitizeUrl(
                      myblog.article_category
                    )}/${sanitizeUrl(myblog.value.title)}`
                  : "",
                url: myblog
                  ? `https://${domain}${sanitizeUrl(
                      myblog.article_category
                    )}/${sanitizeUrl(myblog.value.title)}`
                  : "",
              },
              headline: myblog?.value?.title || "Default Title",
              description:
                myblog?.value?.articleContent || "Default Description",
              datePublished:
                myblog?.value?.published_at || new Date().toISOString(),
              author: {
                "@type": "Person",
                name: myblog?.value?.author || "Unknown Author",
              },
              image: myblog?.file_name
                ? `${imagePath}/${myblog.file_name}`
                : `${imagePath}/default-image.jpg`,
              publisher: {
                "@type": "Organization",
                name: "Site Manager",
                logo: {
                  "@type": "ImageObject",
                  url: `${imagePath}/${logo?.file_name}`,
                },
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label || `Breadcrumb ${index + 1}`,
                item: breadcrumb.url
                  ? `https://${domain}${breadcrumb.url}`
                  : `https://${domain}`,
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
  const { category, blog } = query;

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const categories = await callBackendApi({ domain, type: "categories" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });

  const isValidBlog = blog_list?.data[0]?.value?.find((item) => {
    const sanitizedTitle = sanitizeUrl(item.title);
    return sanitizedTitle === blog;
  });

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) => sanitizeUrl(cat?.title) === category
  );

  if (!categoryExists || !isValidBlog) {
    return {
      notFound: true,
    };
  }

  const myblog = await callBackendApi({ domain, type: isValidBlog?.key });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const blog_type = await callBackendApi({ domain, type: "blog_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page?.toLowerCase() === "blog page");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      page,
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      myblog: myblog?.data[0] || {},
      blog_list: blog_list.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
      blog_type: blog_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
      project_id,
    },
  };
}
