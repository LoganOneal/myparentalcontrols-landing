import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import postsData from "@/data/blog-posts.json";

type Post = { slug: string; title: string; date: string };
const posts = postsData as Post[];

function decode(html: string) {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Cal AI Blog" };
  const title = decode(post.title);
  return {
    title: `${title} | Cal AI`,
    description: title,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const title = decode(post.title);

  return (
    <>
      <SiteHeader />
      <main>
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="mx-auto max-w-3xl mt-14">
            <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-1 lg:leading-tight">
              {title}
            </h1>
            <div className="flex gap-2 mt-3 items-center">
              <span className="text-gray-400">•</span>
              <time className="text-gray-400">{post.date}</time>
            </div>
            <div className="rounded-xl mt-6 w-full aspect-[2400/1350] bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 flex items-center justify-center">
              <span className="text-amber-900/40 text-xl font-semibold px-8 text-center">
                {title}
              </span>
            </div>
          </div>
          <div className="mx-auto prose-cal mt-6 max-w-3xl pb-20">
            <p>
              This is a clone of <Link href="https://calai.app/blog" className="text-blue-600 underline">calai.app/blog</Link>. The full article content is hosted on the original site.
            </p>
            <p>
              <Link
                href={`https://calai.app/blog/${slug}`}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read this article on the original Cal AI blog →
              </Link>
            </p>
            <h2>Looking for similar posts?</h2>
            <ul>
              {posts
                .filter((p) => p.slug !== slug)
                .slice(0, 5)
                .map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="text-blue-600 underline">
                      {decode(p.title)}
                    </Link>
                    <span className="text-gray-400 ml-2 text-sm">{p.date}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
