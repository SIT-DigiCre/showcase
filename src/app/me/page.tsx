import H1 from "@/components/common/H1";
import { Avatar } from "@/components/ui/avatar";
import { getCurrentUser } from "@/db/actions";
import Image from "next/image";

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <H1>Not logged in</H1>
      </>
    );
  }

  return (
    <>
      {user.cover_url && (
        <div className="relative w-full h-full max-h-[30vh]">
          <Image
            src={user.cover_url}
            alt="Cover Image"
            fill
            className="object-cover rounded-b-4xl"
          />
        </div>
      )}
      <div className="flex gap-4 items-center mt-4 mb-8">
        <Avatar src={user.icon_url} alt="User Icon" size="extra-large" />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p>@{user.slug}</p>
        </div>
      </div>
    </>
  );
}
