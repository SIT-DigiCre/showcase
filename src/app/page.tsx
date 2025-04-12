import db from "@/db";
import Link from "next/link";
import H1 from "@/components/common/H1";

export default async function Home() {
  const works = await db.query.workTable.findMany({
    with: {
      items: true,
    },
  });

  return (
    <>
      <H1>Timeline</H1>
      <div className="flex flex-col gap-6">
        {works.map((work) => (
          <div key={work.id} className="border-b pb-4">
            {work.items.length > 0 && (
              <Link href={`/${work.authorId}/${work.id}`}>
                <img
                  src={work.items[0].fileUrl}
                  alt={work.items[0].name}
                  className="w-full h-auto rounded-lg"
                />
              </Link>
            )}
            <div className="mt-2 text-lg font-bold">{work.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}
