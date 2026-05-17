import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API route to crawl sites
  app.get("/api/sites/metadata", async (req, res) => {
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

      res.json(metadata);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metadata" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
