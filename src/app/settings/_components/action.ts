"use server";

import { redirect } from "next/navigation";
import { parseWithValibot } from "conform-to-valibot";
import { schema } from "./schema";
import { auth } from "@/auth";
import db from "@/db";
import { userTable } from "@/db/schema";

export async function settingAction(formData: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/login");
  }
  const submission = parseWithValibot(formData, {
    schema,
  });

  if (submission.status !== "success") {
    throw new Error("Validation failed");
  }

  const result = await db.update(userTable).set({
    name: submission.value.name,
    slug: submission.value.slug,
    bio: submission.value.bio,
  });
  if (!result) {
    throw new Error("Failed to update user");
  }
  redirect("/me");
}
