import db from "@/db";
import { workTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ user_slug: string; work_id: number }>;
}) {
  const { work_id } = await params;
  const [work] = await db
    .select()
    .from(workTable)
    .where(eq(workTable.id, work_id));
  if (!work) {
    return <div>Work not found</div>;
  }

  return (
    <div className="my-10">
      <h1 className="text-4xl font-bold">{work.title}</h1>
      <p className="text-gray-500">{work.description}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Content</h2>
        <p className="text-gray-700">{work.content}</p>
      </div>
    </div>
  );
}
