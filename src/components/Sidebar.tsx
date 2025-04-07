"use client";

import Link from "next/link";
import Navbar from "./Navbar";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 h-screen">
      <h1 className="font-black text-4xl">Showcase</h1>
      <ul>
        <li className="mb-4">
          <Link href="/timeline" className="hover:text-blue-600">
            Timeline
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/search" className="hover:text-blue-600">
            Search
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/mypage" className="hover:text-blue-600">
            Me
          </Link>
        </li>
      </ul>
      <Navbar />
    </aside>
  );
}
