export interface SiteMetadata {
  url: string;
  title: string;
  description: string;
  image: string;
  favicon: string;
  error?: boolean;
}

export async function fetchSitesMetadata(): Promise<SiteMetadata[]> {
  try {
    const response = await fetch("/api/sites/metadata");
    if (!response.ok) throw new Error("Failed to fetch metadata");
    return await response.json();
  } catch (error) {
    console.error("Error fetching sites metadata:", error);
    // Fallback static data in case API fails
    return [
      {
        url: "https://art.fanso.site",
        title: "Art Fanso",
        description: "Focusing on Art and Creativity",
        image: "",
        favicon: "https://art.fanso.site/favicon.ico",
      },
      {
        url: "https://life.fanso.site",
        title: "Life Fanso",
        description: "Lifestyle and Living insights",
        image: "",
        favicon: "https://life.fanso.site/favicon.ico",
      },
      {
        url: "https://celeb.fanso.site",
        title: "Celeb Fanso",
        description: "Celebrities and Influencers",
        image: "",
        favicon: "https://celeb.fanso.site/favicon.ico",
      },
      {
        url: "https://book.fanso.site",
        title: "Book Fanso",
        description: "Literature and Books",
        image: "",
        favicon: "https://book.fanso.site/favicon.ico",
      },
    ];
  }
}
