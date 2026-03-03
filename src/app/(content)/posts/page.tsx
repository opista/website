import { Fragment } from "react";
import { Metadata } from "next";

import { Heading } from "@/components/heading";
import { HorizontalRule } from "@/components/horizontal-rule";
import { Link } from "@/components/link";
import { PopularPosts } from "@/components/popular-posts";
import { ReadingTime } from "@/components/reading-time";
import { formatDate } from "@/lib/format-date";
import { getAllPages, Page } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Posts - OPISTA",
};

const PostList = ({ posts }: { posts: Page[] }) => (
  <ul>
    {posts.map((post, idx) => (
      <Fragment key={post.url}>
        {idx !== 0 && <HorizontalRule className="mb-8" />}
        <li className="mb-8">
          <Link className="text-inherit! hover:no-underline! group" href={post.url}>
            <Heading className="mb-1 group-hover:text-pink-500 transition-colors" level="h2">
              {post.title}
            </Heading>
            <p className="mb-1 text-sm text-zinc-400">
              {formatDate(post.createdAt)} •{" "}
              <ReadingTime className="text-sm text-zinc-400" minutes={post.readingTime} />
            </p>
            <p className="line-clamp-2">{post.description}</p>
          </Link>
        </li>
      </Fragment>
    ))}
  </ul>
);

export default async function Posts() {
  const posts = await getAllPages("posts");
  const popularPosts = posts.filter((post) => post.popular);

  return (
    <>
      <Heading className="mb-12" level="h1">
        Posts
      </Heading>

      {popularPosts.length > 0 && <PopularPosts posts={popularPosts} />}

      {popularPosts.length > 0 && (
        <Heading className="mb-8" level="h2">
          All Posts
        </Heading>
      )}

      <div>
        <PostList posts={posts} />
      </div>
    </>
  );
}
