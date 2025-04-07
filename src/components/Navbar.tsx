"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      {session ? (
        <>
          <span className="mr-4">ようこそ、{session.user?.name}さん</span>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            サインアウト
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          サインイン
        </button>
      )}
    </div>
  );
}
