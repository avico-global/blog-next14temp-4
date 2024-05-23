import React from "react";
import Head from "next/head";
import { Roboto } from "next/font/google";
import Banner from "@/components/containers/Banner";
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

const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"], // Add the weights you need
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
}) {
  console.log("Domain", domain);

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
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
      />
      <LatestBlogs articles={blog_list} project_id={project_id} />
      <MustRead articles={blog_list} project_id={project_id} />
      <Footer
        project_id={project_id}
        footer_text={footer_text}
        blog_list={blog_list}
        copyright={copyright}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domain}/`,
              url: `http://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `http://${domain}`,
              },
              description: meta?.description,
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
              itemListElement: blog_list.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `http://${domain}/${blog?.title
                  ?.toLowerCase()
                  .replaceAll(" ", "-")}`,
                name: blog?.title,
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
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });

  return {
    props: {
      logo_black: logo_black?.data[0] || null,
      logo: logo.data[0],
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0].value,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      imagePath,
      project_id,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
    },
  };
}
