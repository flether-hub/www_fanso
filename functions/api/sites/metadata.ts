import * as cheerio from "cheerio";

export const onRequest: any = async (context: any) => {
  const urls = [
    "https://art.fanso.site",
    "https://life.fanso.site",
    "https://celeb.fanso.site",
    "https://book.fanso.site",
  ];

  try {
    const metadata = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
          });
          
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const html = await response.text();
          const $ = cheerio.load(html);

          const title = $("title").text() || $("meta[property='og:title']").attr("content") || url;
          const description = $("meta[name='description']").attr("content") || $("meta[property='og:description']").attr("content") || "";
          const image = $("meta[property='og:image']").attr("content") || "";
          const favicon = $("link[rel='icon']").attr("href") || $("link[rel='shortcut icon']").attr("href") || "/favicon.ico";

          // Resolve relative URLs
          const absoluteFavicon = favicon.startsWith("http") ? favicon : new URL(favicon, url).href;
          const absoluteImage = image.startsWith("http") ? image : image ? new URL(image, url).href : "";

          return {
            url,
            title: title.trim(),
            description: description.trim(),
            image: absoluteImage,
            favicon: absoluteFavicon,
          };
        } catch (error) {
          console.error(`Error crawling ${url}:`, error);
          const name = url.split("//")[1].split(".")[0];
          return {
            url,
            title: name.charAt(0).toUpperCase() + name.slice(1),
            description: `查看 Fanso.site 上的 ${name} 频道`,
            image: "",
            favicon: `${url}/favicon.ico`,
            error: true
          };
        }
      })
    );

    return new Response(JSON.stringify(metadata), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch metadata" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
