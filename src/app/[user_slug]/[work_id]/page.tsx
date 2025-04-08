import db from "@/db";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ user_slug: string; work_id: number }>;
}) {
  const { work_id } = await params;
  const [work] = await db.query.workTable.findMany({
    where: (work) => eq(work.id, work_id),
    with: {
      items: true,
      user: true,
    },
  });

  if (!work) {
    return <div>Work not found</div>;
  }

  return (
    <div className="my-10">
      <Link
        href={`/${work.user.slug}/`}
        className="text-blue-500 hover:text-blue-700"
      >
        Back to User page
      </Link>
      <h1 className="text-4xl font-bold">{work.title}</h1>
      <p className="text-gray-500">{work.description}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Content</h2>
        <p className="text-gray-700">{work.content}</p>
      </div>
      <div className="flex flex-col gap-4 my-8">
        {work.items.map((item) => (
          <div key={item.id}>
            {item.type === "image" && (
              <img
                src={item.fileUrl}
                className="rounded-lg max-w-full max-h-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
