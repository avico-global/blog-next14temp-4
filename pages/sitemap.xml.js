import { checkOrCreateSitemap } from "@/lib/createInitialFiles";
import { getDomain, getSitemaps } from "@/lib/myFun";

const Sitemap = () => {};

export const getServerSideProps = async ({ req, res, query }) => {
  try {
    const baseUrl = getDomain(req?.headers?.host);

    // Fetch the XSL content using your function
    const xslContent = checkOrCreateSitemap({ DOMAIN: baseUrl });

    // Log the xslContent for debugging purposes
    console.log("xslContent:", xslContent);

    // Check if xslContent is valid, if not throw an error
    if (!xslContent) {
      throw new Error(
        "xslContent is undefined. Check the return value of checkOrCreateSitemap."
      );
    }

    // Replace placeholders in the xslContent
    const modifiedXslContent = xslContent
      ?.replaceAll(
        "%DOMAIN%",
        `${baseUrl.startsWith("https://") ? "" : "https://"}${baseUrl}`
      )
      ?.replaceAll("%TITLE%", "TITLE");

    // Fetch the sitemaps
    const sitemaps = await getSitemaps({ domain: baseUrl, query });

    // Format current date and time in ISO format
    const currentDate = new Date();
    const isoDate = currentDate?.toISOString();
    const isoDateParts = isoDate?.split("T");
    const datePart = isoDateParts[0];
    const timePart = isoDateParts[1]?.split(".")[0];
    const formattedDate = `${datePart}T${timePart}+00:00`;

    // Ensure modifiedXslContent is valid before using Buffer.from()
    if (!modifiedXslContent) {
      throw new Error(
        "modifiedXslContent is undefined after placeholder replacement."
      );
    }

    // Create the sitemapindex XML
    const sitemapindex = `<?xml version="1.0" encoding="UTF-8"?>
    
    <?xml-stylesheet type="text/xsl" href="data:text/xml;charset=utf-8;base64,${Buffer.from(
      modifiedXslContent
    ).toString("base64")}" ?>
    
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps
      .map(
        (sitemap, index) => `
          <sitemap>
            <loc>
              ${
                baseUrl.startsWith("https://")
                  ? baseUrl
                  : `https://${
                      baseUrl.startsWith("www.") ? baseUrl : `www.${baseUrl}`
                    }`
              }/sitemaps/${index + 1}
            </loc>
            <lastmod>${formattedDate}</lastmod>
          </sitemap>
        `
      )
      .join("")}
    </sitemapindex>`;

    // Set the response headers and send the XML sitemapindex
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapindex);
    res.end();

    // Return empty props as required for getServerSideProps
    return {
      props: {},
    };
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Set response status to 500 and send an error message if an issue occurs
    res.statusCode = 500;
    res.end(`Server Error: ${error.message}`);

    return {
      props: {},
    };
  }
};

export default Sitemap;
