import { useEffect, useState } from "react";
import { callBackendApi, getDomain, getProjectId } from "@/lib/myFun";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const SitemapLinks = ({ blog_list, domain, project_id, blog_categories }) => {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSitemapAndUpdateLinks = async () => {
      try {
        const response = await fetch("/sitemap-0.xml");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const sitemapXML = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sitemapXML, "application/xml");
        const urlElements = xmlDoc.getElementsByTagName("url");
        const sitemapUrls = Array.from(urlElements).map(
          (urlElement) => urlElement.getElementsByTagName("loc")[0].textContent
        );

        if (blog_list && blog_categories && domain) {
          const blogLinks = blog_list.map((blog) =>
            project_id
              ? `${domain}/${blog.title
                  ?.toLowerCase()
                  .replaceAll(" ", "-")}?${project_id}`
              : `${domain}/${blog.title.toLowerCase().replaceAll(" ", "-")}`
          );
          const blogCategories = blog_categories.map((item) =>
            project_id
              ? `${domain}/categories/${item}?${project_id}`
              : `${domain}/categories/${item}`
          );

          setLinks([...sitemapUrls, ...blogCategories, ...blogLinks]);
        } else {
          setLinks(sitemapUrls);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSitemapAndUpdateLinks();
  }, [blog_list, domain, project_id, blog_categories]);

  return (
    <FullContainer>
      <Container className="md:max-w-screen-md">
        <h1 className="text-3xl font-bold mb-2 w-full mt-5">XML Sitemap</h1>
        <p className="text-sm w-full">
          This is an XML Sitemap, meant for consumption by search engines.
        </p>
        <p className="mb-5 w-full pb-5 border-b">
          Find more information about XML sitemaps at sitemaps.org.
        </p>
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <ul className="space-y-1 w-full mb-6">
            {links.map((link, index) => (
              <li
                className={`text-xs py-1 px-3 ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
                key={index}
              >
                <a
                  href={`http://${link.replace(
                    "https://www.yourdomain.com",
                    domain
                  )}`}
                  className="hover:underline"
                >
                  {link.replace("https://www.yourdomain.com", domain)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </FullContainer>
  );
};

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const project_id = getProjectId(query);

  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const blog_categories = await callBackendApi({
    domain,
    query,
    type: "blog_categories",
  });

  return {
    props: {
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      blog_list: blog_list?.data[0]?.value || null,
      blog_categories: blog_categories?.data[0]?.value || null,
      project_id,
    },
  };
}

export default SitemapLinks;
