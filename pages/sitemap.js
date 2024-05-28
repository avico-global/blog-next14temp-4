import { useEffect, useState } from "react";
import { callBackendApi, getDomain, getProjectId } from "@/lib/myFun";

const SitemapLinks = ({ blog_list, domain, project_id }) => {
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

        if (blog_list && domain) {
          const blogLinks = blog_list.map((blog) =>
            project_id
              ? `${domain}/${blog.title
                  ?.toLowerCase()
                  .replaceAll(" ", "-")}?${project_id}`
              : `${domain}/${blog.title.toLowerCase().replaceAll(" ", "-")}`
          );

          setLinks([...sitemapUrls, ...blogLinks]);
        } else {
          setLinks(sitemapUrls);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSitemapAndUpdateLinks();
  }, [blog_list, domain, project_id]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Sitemap Links</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.replace("https://www.yourdomain.com", domain)}
                className="text-blue-600 hover:underline"
              >
                {link.replace("https://www.yourdomain.com", domain)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const project_id = getProjectId(query);

  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });

  return {
    props: {
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      blog_list: blog_list.data[0].value,
      project_id,
    },
  };
}

export default SitemapLinks;
