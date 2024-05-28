import { useEffect, useState } from "react";

const SitemapLinks = () => {
  const [links, setLinks] = useState([]);
  const [domain, setDomain] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get the current domain
      const currentDomain = window.location.origin;
      setDomain(currentDomain);

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
            (urlElement) =>
              urlElement.getElementsByTagName("loc")[0].textContent
          );
          setLinks(urls);
        } catch (err) {
          setError(err.message);
        }
      };

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
            <li key={index}>
              {link.replace("https://www.yourdomain.com", domain)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SitemapLinks;
