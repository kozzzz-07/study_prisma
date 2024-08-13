import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl">Welcome to my blog</h1>
      <Link href="/posts" className="underline">
        view posts
      </Link>
    </main>
  );
}
