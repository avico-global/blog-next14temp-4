import React from "react";
import Head from "next/head";
import { Roboto } from "next/font/google";
import NavMenu from "@/components/containers/NavMenu";
import Footer from "@/components/containers/Footer";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

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
  categories,
}) {
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
      <FullContainer>
        <Container>
          <div className="w-full py-16">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="my-3">
              Have a question or need assistance? Don’t hesitate to get in touch
              with us!
            </p>
            <p className="font-semibold text-gray-700">
              Email: admin@rabbiitfirm.com
            </p>
          </div>
        </Container>
      </FullContainer>
      <Footer
        project_id={project_id}
        footer_text={footer_text}
        blog_list={blog_list}
        copyright={copyright}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
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

  return {
    props: {
      project_id,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      meta: meta?.data[0]?.value || null,
      logo: logo.data[0],
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      imagePath,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
    },
  };
}
