import { Metadata } from "next";

import { Button } from "@/components/button";
import { ContentShell } from "@/components/content-shell";
import { Heading } from "@/components/heading";
import { PopularPosts } from "@/components/popular-posts";
import { getAllPages } from "@/lib/pages";

export const metadata: Metadata = {
  description: "Perhaps you took a wrong turn somewhere?",
  title: "Not Found - OPISTA",
};

export default async function NotFoundPage() {
  const posts = await getAllPages("posts");
  const popularPosts = posts.filter((post) => post.popular);

  return (
    <ContentShell>
      <div className="text-center mt-10 mb-12">
        <Heading spanClassName="block" level="h1">
          Page not found
        </Heading>
        <p className="my-4">Perhaps you took a wrong turn somewhere?</p>
        <Button center href="/">
          Head home
        </Button>
      </div>
      {popularPosts.length > 0 && <PopularPosts posts={popularPosts} />}
    </ContentShell>
  );
}
