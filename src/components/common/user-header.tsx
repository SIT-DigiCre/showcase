import Image from "next/image";
import { Avatar } from "../ui/avatar";
import type { UserSchema } from "@/db/schema";

type UserHeaderProps = {
  user: UserSchema;
};

const UserHeader: React.FC<UserHeaderProps> = ({ user }) => {
  return (
    <>
      {user.cover && (
        <div className="relative w-full h-full max-h-[30vh]">
          <Image
            src={user.cover}
            alt="Cover Image"
            fill
            className="object-cover rounded-b-4xl"
          />
        </div>
      )}
      <div className="flex gap-4 items-center mt-4 mb-8">
        <Avatar src={user.image} alt="User Icon" size="extra-large" />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p>@{user.slug}</p>
        </div>
      </div>
    </>
  );
};

export default UserHeader;
