import UserHeader from "@/components/common/user-header";
import db from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function UserPage({
  params,
}: {
  params: Promise<{ user_slug: string }>;
}) {
  const { user_slug } = await params;
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.slug, user_slug))
    .limit(1);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="my-10">
      <UserHeader user={user} />
    </div>
  );
}
