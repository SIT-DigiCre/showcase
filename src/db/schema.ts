import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: integer().primaryKey({ autoIncrement: true }),
  slug: text().notNull().unique(),
  email: text().notNull().unique(),
  name: text().notNull(),
  icon_url: text(),
  cover_url: text(),
  bio: text(),
  role: text({ enum: ["admin", "user"] })
    .notNull()
    .default("user"),
  is_verified: integer({ mode: "boolean" }).default(false),
  created_at: integer({ mode: "timestamp" }).notNull().default(new Date()),
  updated_at: integer({ mode: "timestamp" }).notNull().default(new Date()),
});

export const workTable = sqliteTable("work", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text(),
  content: text(),
  author_id: integer()
    .notNull()
    .references(() => userTable.id),
  period: text(),
  is_visible: integer({ mode: "boolean" }).default(false),
  created_at: integer({ mode: "timestamp" }).notNull().default(new Date()),
  updated_at: integer({ mode: "timestamp" }).notNull().default(new Date()),
});

export const itemTable = sqliteTable("item", {
  id: integer().primaryKey({ autoIncrement: true }),
  work_id: integer()
    .notNull()
    .references(() => workTable.id),
  name: text().notNull(),
  type: text({
    enum: ["text", "image", "audio", "video", "document"],
  }).notNull(),
  created_at: integer({ mode: "timestamp" }).notNull().default(new Date()),
  updated_at: integer({ mode: "timestamp" }).notNull().default(new Date()),
});

export const videoTable = sqliteTable("video", {
  item_id: integer().primaryKey(),
  file_url: text().notNull(),
  width: integer(),
  height: integer(),
});

export const audioTable = sqliteTable("audio", {
  item_id: integer().primaryKey(),
  file_url: text().notNull(),
  duration: integer(),
});

export const documentTable = sqliteTable("document", {
  item_id: integer().primaryKey(),
  file_url: text().notNull(),
  format: text(),
  preview_url: text(),
});

export const imageTable = sqliteTable("image", {
  item_id: integer().primaryKey(),
  file_url: text().notNull(),
  width: integer(),
  height: integer(),
  alt_text: text(),
});

export const textTable = sqliteTable("text", {
  item_id: integer().primaryKey(),
  item_text: text().notNull(),
});

export const seriesTable = sqliteTable("series", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  description: text(),
  created_by: integer().notNull(),
  created_at: integer({ mode: "timestamp" }).notNull().default(new Date()),
  updated_at: integer({ mode: "timestamp" }).notNull().default(new Date()),
});

export const workSeriesTable = sqliteTable("work_series", {
  id: integer().primaryKey({ autoIncrement: true }),
  work_id: integer()
    .notNull()
    .references(() => workTable.id),
  series_id: integer()
    .notNull()
    .references(() => seriesTable.id),
  created_at: integer({ mode: "timestamp" }).notNull().default(new Date()),
});
