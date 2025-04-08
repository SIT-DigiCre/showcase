import UserHeader from "@/components/common/user-header";
import db from "@/db";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function UserPage({
  params,
}: {
  params: Promise<{ user_slug: string }>;
}) {
  const { user_slug } = await params;
  const user = await db.query.userTable.findFirst({
    where: (user) => eq(user.slug, user_slug),
    with: {
      works: {
        with: {
          items: true,
        },
      },
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="my-10">
      <UserHeader user={user} />
      {user.works.length === 0 ? (
        <p>No works found</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,300px))] gap-4 justify-center">
          {user.works.map((work) => (
            <Link
              key={work.id}
              href={`/${user.slug}/${work.id}`}
              className="block w-full"
            >
              {work.items.length > 0 && (
                <img
                  src={work.items[0].fileUrl}
                  alt="Image"
                  className="w-full object-cover aspect-square"
                />
              )}
              <div className="text-2xl font-bold text-center">{work.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
