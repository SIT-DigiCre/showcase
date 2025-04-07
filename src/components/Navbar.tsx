"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <Button
          onPress={() => signOut()}
          intent="secondary"
          className="w-full text-xl"
        >
          Post
        </Button>
      ) : (
        <Button onPress={() => signIn("google")} className="w-full text-xl">
          Sign In
        </Button>
      )}
    </div>
  );
}
