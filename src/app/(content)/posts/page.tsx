import { Fragment } from "react";
import { Metadata } from "next";

import { Heading } from "@/components/heading";
import { HorizontalRule } from "@/components/horizontal-rule";
import { Link } from "@/components/link";
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
          <Link className="text-inherit! hover:no-underline!" href={post.url}>
            <Heading className="mb-1" level="h2">
              {post.title}
            </Heading>
            <p className="mb-1 text-sm text-zinc-400">
              {formatDate(post.createdAt)} •{" "}
              <ReadingTime
                className="text-sm text-zinc-400"
                minutes={post.readingTime}
              />
            </p>
            <p className="line-clamp-2">{post.description}</p>
          </Link>
        </li>
      </Fragment>
    ))}
  </ul>
);

const PopularPostList = ({ posts }: { posts: Page[] }) => (
  <ul className="flex flex-col gap-4">
    {posts.map((post) => (
      <li key={post.url}>
        <Link className="text-inherit! hover:no-underline! group" href={post.url}>
          <Heading className="mb-1 text-lg group-hover:text-pink-500 transition-colors" level="h3">
            {post.title}
          </Heading>
          <p className="text-xs text-zinc-500 mb-1">
            {formatDate(post.createdAt)} •{" "}
            <ReadingTime
              className="text-xs text-zinc-500"
              minutes={post.readingTime}
            />
          </p>
          <p className="text-sm text-zinc-400 line-clamp-2">{post.description}</p>
        </Link>
      </li>
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

      {popularPosts.length > 0 && (
        <div className="mb-12 rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
          <Heading className="mb-4 text-xl text-zinc-300" level="h2">
            Popular Posts
          </Heading>
          <PopularPostList posts={popularPosts} />
        </div>
      )}

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
