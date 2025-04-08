"use server";

import { redirect } from "next/navigation";
import { parseWithValibot } from "conform-to-valibot";
import { schema } from "./schema";
import { auth } from "@/auth";
import db from "@/db";
import {
  audioTable,
  imageTable,
  itemTable,
  videoTable,
  workTable,
} from "@/db/schema";
import { uploadFile } from "@/lib/wasabi";
import { nanoid } from "nanoid";

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

  const { items, ...data } = submission.value;

  const [result] = await db
    .insert(workTable)
    .values({ ...data, authorId: session.user.id })
    .returning();

  if (!result) {
    throw new Error("Failed to create work");
  }

  for (const item of items) {
    if (!item) {
      throw new Error("Failed to upload file");
    }
    const url = await uploadFile(item, { prefix: "items" });
    if (!url) {
      throw new Error("Failed to upload file");
    }
    const type = item.type.split("/")[0] as
      | "image"
      | "audio"
      | "video"
      | "asset";
    await db.insert(itemTable).values({
      name: item.name,
      fileUrl: url,
      type,
      workId: result.id,
    });
    switch (type) {
      case "video": {
        const video = await db
          .insert(videoTable)
          .values({ id: nanoid(), itemId: result.id })
          .returning();
        if (!video) {
          throw new Error("Failed to create video");
        }
        break;
      }
      case "audio": {
        const audio = await db
          .insert(audioTable)
          .values({ id: nanoid(), itemId: result.id })
          .returning();
        if (!audio) {
          throw new Error("Failed to create audio");
        }
        break;
      }
      case "image": {
        const image = await db
          .insert(imageTable)
          .values({
            id: nanoid(),
            itemId: result.id,
          })
          .returning();
        if (!image) {
          throw new Error("Failed to create image");
        }
        break;
      }
      default:
        break;
    }
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
