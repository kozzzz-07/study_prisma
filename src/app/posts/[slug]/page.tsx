import { unstable_cache } from "next/cache";
import prisma from "../../../../util/db";

const getCachedPost = unstable_cache((slug: string) => {
  return prisma.post.findUnique({
    where: {
      slug,
    },
  });
});

export default async function Page({ params }: { params: { slug: string } }) {
  // NOTE: 毎回アクセスするのではなく、キャッシュさせる`
  // const post = await getCachedPost(params.slug);

  // Accelerateを利用してキャッシュすることもできる
  // https://www.prisma.io/docs/accelerate/getting-started#prerequisites
  // https://www.prisma.io/docs/accelerate/caching#time-to-live-ttl
  const post = await prisma.post.findUnique({
    where: {
      slug: decodeURI(params.slug),
    },
    // NOTE:ここに追加できる
    // cacheStrategy: {
    //   ttl: 60,
    // },
  });

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
