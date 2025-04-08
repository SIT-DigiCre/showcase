import { auth } from "@/auth";
import H1 from "@/components/common/H1";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

export default async function MePage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <>
        <H1>Not logged in</H1>
      </>
    );
  }

  return (
    <>
      {session.user.cover && (
        <div className="relative w-full h-full max-h-[30vh]">
          <Image
            src={session.user.cover}
            alt="Cover Image"
            fill
            className="object-cover rounded-b-4xl"
          />
        </div>
      )}
      <div className="flex gap-4 items-center mt-4 mb-8">
        <Avatar src={session.user.image} alt="User Icon" size="extra-large" />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">{session.user.name}</h1>
          <p>@{session.user.slug}</p>
        </div>
      </div>
    </>
  );
}
