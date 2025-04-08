"use server";

import { redirect } from "next/navigation";
import { parseWithValibot } from "conform-to-valibot";
import { schema } from "./schema";
import { auth } from "@/auth";
import db from "@/db";
import { workTable } from "@/db/schema";

export async function postAction(_prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/login");
  }
  const submission = parseWithValibot(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const [result] = await db
    .insert(workTable)
    .values({ ...submission.value, authorId: session.user.id })
    .returning();

  if (!result) {
    throw new Error("Failed to create work");
  }

  redirect(`/${session.user.id}/${result.id}`);
}
