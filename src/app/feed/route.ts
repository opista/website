import RSS from "rss";

import { BASE_SITE_URL } from "@/constant";
import { getAllPagesAndContent } from "@/lib/pages";

export function GET() {
  const feed = new RSS({
    description: "Making things for fun (and sometimes profit)",
    feed_url: `${BASE_SITE_URL}/feed.xml`,
    language: "en-gb",
    site_url: BASE_SITE_URL,
    title: "OPISTA Blog",
  });

  getAllPagesAndContent("posts").forEach((post) => {
    feed.item({
      date: post.createdAt,
      description: post.description,
      guid: `${BASE_SITE_URL}${post.url}`,
      title: post.title,
      url: `${BASE_SITE_URL}${post.url}`,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
