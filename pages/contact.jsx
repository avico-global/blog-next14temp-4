import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import Head from "next/head";
import React from "react";
import Map from "@/components/containers/Map";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";

import { Roboto } from "next/font/google";
const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Contact({
  logo,
  project_id,
  imagePath,
  blog_list,
  about_me,
  categories,
  copyright,
  contact_details,
}) {
  return (
    <div className={myFont.className}>
      <Head>
        <title>Next 14 Template</title>
      </Head>
      <Navbar
        blog_list={blog_list}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        project_id={project_id}
        categories={categories}
        contact_details={contact_details}
      />

      <FullContainer>
        <Container className="mt-16">
          <Map location="united states" />
          <div className="flex flex-col items-center text-center text-gray-500 text-xs gap-3">
            <p className="text-xl mt-3 font-bold text-black">
              {contact_details?.name}
            </p>
            <p>{contact_details?.email}</p>
            <p>{contact_details?.address}</p>
            <p>{contact_details?.phone}</p>
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
        copyright={copyright}
        contact_details={contact_details}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const imagePath = await getImagePath({ domain, query });
  const project_id = getProjectId(query);
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const copyright = await callBackendApi({ domain, query, type: "copyright" });

  return {
    props: {
      logo: logo.data[0] || null,
      imagePath,
      project_id,
      blog_list: blog_list.data[0].value,
      contact_details: contact_details.data[0].value,
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      copyright: copyright.data[0].value || null,
    },
  };
}
