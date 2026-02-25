import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { ReadingTime } from "@/components/reading-time";
import { formatDate } from "@/lib/format-date";
import { Page } from "@/lib/pages";

export type PopularPostsProps = {
  posts: Page[];
};

export const PopularPosts = ({ posts }: PopularPostsProps) => {
  // Take only the 2 latest popular posts
  const displayedPosts = posts.slice(0, 2);

  if (displayedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 border border-zinc-200 p-6">
      <Heading className="mb-6" level="h2">
        Popular Posts
      </Heading>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayedPosts.map((post) => (
          <li key={post.url}>
            <Link className="text-inherit! hover:no-underline! group block h-full" href={post.url}>
              <Heading className="mb-2 text-lg group-hover:text-pink-500 transition-colors" level="h3">
                {post.title}
              </Heading>
              <p className="text-xs text-zinc-500 mb-2">
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
    </div>
  );
};
