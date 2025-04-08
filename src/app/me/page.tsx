import { auth } from "@/auth";
import H1 from "@/components/common/H1";
import UserHeader from "@/components/common/user-header";
import db from "@/db";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function MePage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <>
        <H1>Not logged in</H1>
      </>
    );
  }

  const works = await db.query.workTable.findMany({
    where: (work) => eq(work.authorId, session.user.id),
    with: {
      items: true,
    },
  });

  return (
    <div>
      <UserHeader user={session.user} />
      <div className="my-10">
        <H1>My Works</H1>
        {works.length === 0 ? (
          <p>No works found</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,400px))] gap-4 justify-center">
            {works.map((work) => (
              <Link
                key={work.id}
                href={`/${session.user.slug}/${work.id}`}
                className="block w-full"
              >
                {work.items.length > 0 && (
                  <img
                    src={work.items[0].fileUrl}
                    alt="Image"
                    className="w-full object-cover aspect-square"
                  />
                )}
                <div className="text-2xl font-bold text-center">
                  {work.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
