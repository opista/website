import { Heading } from "@/components/heading";
import { HorizontalRule } from "@/components/horizontal-rule";
import { Link } from "@/components/link";
import { PageLayout } from "@/components/page-layout";
import { getAllPagesAndContent } from "@/lib/pages";
import { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Posts - OPISTA",
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);

export default async function Apps() {
  const posts = await getAllPagesAndContent("posts");

  return (
    <PageLayout>
      <Heading className="mb-12" level="h1">
        Posts
      </Heading>

      <div>
        <ul>
          {posts.map((post, idx) => (
            <Fragment key={post.url}>
              {idx !== 0 && <HorizontalRule className="mb-8" />}
              <li className="mb-8">
                <Link
                  className="text-inherit hover:text-inherit hover:no-underline"
                  href={post.url}
                >
                  <Heading className="mb-1" level="h2">
                    {post.title}
                  </Heading>
                  <p className="mb-1 text-sm text-zinc-400">
                    {formatDate(post.createdAt)}
                  </p>
                  <p className="line-clamp-2">{post.description}</p>
                </Link>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
