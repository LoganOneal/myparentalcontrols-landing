import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import postsData from "@/data/blog-posts.json";

export const metadata = {
  title: "Blog | Cal AI",
  description: "Cal AI blog — calorie tracking, nutrition, and fitness insights.",
};

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

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="mt-16">
        <h1 className="text-center text-4xl sm:text-5xl font-bold mb-12">
          Our Blog
        </h1>
        <ul className="grid gap-8 max-w-4xl mx-auto px-5 pb-20">
          {posts.map((p) => (
            <li key={p.slug} className="hover:underline">
              <Link href={`/blog/${p.slug}`} className="block">
                <h2 className="text-xl font-semibold">{decode(p.title)}</h2>
                <p className="text-gray-600 mt-1">{p.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
