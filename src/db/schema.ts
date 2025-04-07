import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// 1. Users テーブル
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  icon_url: text("icon_url"),
  bio: text("bio"),
  role: text("role").notNull().default("user"),
  is_verified: integer("is_verified").notNull().default(0),
  created_at: integer({ mode: "timestamp" }),
  updated_at: integer({ mode: "timestamp" }),
});

// 2. Work テーブル
export const work = sqliteTable("work", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  author_id: integer("author_id").notNull(),
  visibility: text("visibility").notNull(),
  created_at: integer({ mode: "timestamp" }),
  updated_at: integer({ mode: "timestamp" }),
});

// 3. Item テーブル
export const item = sqliteTable("item", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  work_id: integer("work_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  created_at: integer({ mode: "timestamp" }),
  updated_at: integer({ mode: "timestamp" }),
});

// 4. 拡張テーブル：動画 (item_video)
export const item_video = sqliteTable("item_video", {
  item_id: integer("item_id").primaryKey(),
  file_url: text("file_url").notNull(),
  width: integer("width"),
  height: integer("height"),
  has_caption: integer("has_caption").notNull().default(0),
});

// 5. 拡張テーブル：音声 (item_audio)
export const item_audio = sqliteTable("item_audio", {
  item_id: integer("item_id").primaryKey(),
  file_url: text("file_url").notNull(),
  duration: integer("duration"),
});

// 6. 拡張テーブル：ドキュメント (item_document)
export const item_document = sqliteTable("item_document", {
  item_id: integer("item_id").primaryKey(),
  file_url: text("file_url").notNull(),
  format: text("format"),
  preview_url: text("preview_url"),
});

// 7. 拡張テーブル：画像 (item_image)
export const item_image = sqliteTable("item_image", {
  item_id: integer("item_id").primaryKey(),
  file_url: text("file_url").notNull(),
  width: integer("width"),
  height: integer("height"),
  alt_text: text("alt_text"),
});

// 8. 拡張テーブル：リッチテキスト／プログラム (item_text)
export const item_text = sqliteTable("item_text", {
  item_id: integer("item_id").primaryKey(),
  item_text: text("item_text").notNull(),
});

// 9. シリーズ (Series) テーブル
export const series = sqliteTable("series", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
  created_by: integer("created_by").notNull(),
  created_at: integer({ mode: "timestamp" }),
  updated_at: integer({ mode: "timestamp" }),
});

// 10. Work_series テーブル（多対多関係）
export const work_series = sqliteTable("work_series", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  work_id: integer("work_id").notNull(),
  series_id: integer("series_id").notNull(),
  created_at: integer({ mode: "timestamp" }),
});
