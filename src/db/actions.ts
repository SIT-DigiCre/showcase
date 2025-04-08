"use server";

import db from "./index";
import { eq } from "drizzle-orm";
import { userTable } from "./schema";
import { auth } from "@/auth";

type UserData = {
  email: string;
  name: string;
  icon_url: string;
};

/**
 * 指定されたメールアドレスが存在しない場合にのみ、新規ユーザーレコードを挿入する。
 * @param data.email - ユーザーのメールアドレス
 * @param data.name - ユーザーの名前
 * @param data.icon_url - ユーザーのアイコンURL
 */
export const createUserIfNotExists = async (data: UserData) => {
  // 1. メールアドレスの存在確認: 同一メールアドレスのユーザーレコードが存在するかをチェック
  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, data.email))
    .limit(1);

  // 2. 存在しない場合、新規レコードを挿入
  if (existingUser.length === 0) {
    await db
      .insert(userTable)
      .values({ ...data, slug: data.email.split("@")[0] })
      .run();
  }
};

/**
 * 現在のユーザーの情報を取得する。
 * @returns ユーザー情報が存在する場合はその情報、存在しない場合はnull
 */
export const getCurrentUser = async () => {
  const session = await auth();
  if (!session || !session.user?.email) {
    return null;
  }
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, session.user.email))
    .limit(1);
  if (user.length === 0) {
    return null;
  }
  return user[0];
};
