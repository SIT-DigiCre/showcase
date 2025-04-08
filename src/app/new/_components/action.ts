"use server";

import { redirect } from "next/navigation";
import { parseWithValibot } from "conform-to-valibot";
import { schema } from "./schema";
import { auth } from "@/auth";
import db from "@/db";
import { workTable } from "@/db/schema";
import { uploadFile } from "@/lib/wasabi";

export async function postAction(formData: FormData) {
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

  const [result] = await db
    .insert(workTable)
    .values({ ...submission.value, authorId: session.user.id })
    .returning();

  if (!result) {
    throw new Error("Failed to create work");
  }

  redirect(`/${session.user.slug}/${result.id}`);
}

export async function uploadFileAction(file: File) {
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/login");
  }

  const url = await uploadFile(file, { prefix: "items" });

  if (!url) {
    throw new Error("Failed to upload file");
  }

  return url;
}
