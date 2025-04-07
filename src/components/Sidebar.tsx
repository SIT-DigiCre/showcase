"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { buttonVariants } from "./ui/button";
import { cn } from "#/lib/utils";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 h-screen">
      <h1 className="font-black text-4xl">Showcase</h1>
      <ul className="my-8">
        <li>
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "w-full justify-start px-4 text-xl"
            )}
            href="/timeline"
          >
            Timeline
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "w-full justify-start px-4 text-xl"
            )}
            href="/timeline"
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "w-full justify-start px-4 text-xl"
            )}
            href="/timeline"
          >
            Me
          </Link>
        </li>
      </ul>
      <Navbar />
    </aside>
  );
}
