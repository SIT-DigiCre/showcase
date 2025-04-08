import { auth } from "@/auth";
import H1 from "@/components/common/H1";
import UserHeader from "@/components/common/user-header";
import db from "@/db";
import { workTable } from "@/db/schema";
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

  const works = await db
    .select()
    .from(workTable)
    .where(eq(workTable.authorId, session.user.id));

  return (
    <div>
      <UserHeader user={session.user} />
      <div className="my-10">
        <H1>My Works</H1>
        {works.length === 0 ? (
          <p>No works found</p>
        ) : (
          <ul>
            {works.map((work) => (
              <li key={work.id}>
                <Link
                  href={`/${session.user.slug}/${work.id}`}
                  className="text-blue-500"
                >
                  {work.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
