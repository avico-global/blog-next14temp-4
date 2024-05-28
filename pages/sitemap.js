import { useEffect, useState } from "react";

const SitemapLinks = () => {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const response = await fetch("/sitemap-0.xml");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const sitemapXML = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sitemapXML, "application/xml");
        const urlElements = xmlDoc.getElementsByTagName("url");
        const urls = Array.from(urlElements).map(
          (urlElement) => urlElement.getElementsByTagName("loc")[0].textContent
        );
        setLinks(urls);
      } catch (err) {
        setError(err.message);
      }
    };

    if (typeof window !== "undefined") {
      fetchSitemap();
    }
  }, []);

  return (
    <div>
      <h1>Sitemap Links</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {links.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SitemapLinks;
