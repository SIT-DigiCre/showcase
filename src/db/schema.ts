import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const userTable = sqliteTable("user", {
  id: text().primaryKey(),
  slug: text().unique(),
  email: text().notNull().unique(),
  emailVerified: integer("email_verified", { mode: "timestamp" }),
  name: text().notNull(),
  image: text(),
  cover: text(),
  bio: text(),
  role: text({ enum: ["admin", "user"] })
    .notNull()
    .default("user"),
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});

export type UserSchema = typeof userTable.$inferSelect;

export const accountTable = sqliteTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
    index("user_id").on(account.userId),
  ]
);

export const sessionTable = sqliteTable("session", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const workTable = sqliteTable("work", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text(),
  content: text(),
  authorId: text("author_id")
    .notNull()
    .references(() => userTable.id),
  period: text(),
  isVisible: integer("is_visible", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});

export const itemTable = sqliteTable("item", {
  id: integer().primaryKey({ autoIncrement: true }),
  workId: integer("work_id")
    .notNull()
    .references(() => workTable.id),
  name: text().notNull(),
  type: text({
    enum: ["text", "image", "audio", "video", "document"],
  }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});

export const videoTable = sqliteTable("video", {
  itemId: integer("item_id").primaryKey(),
  fileUrl: text("file_url").notNull(),
  width: integer(),
  height: integer(),
});

export const audioTable = sqliteTable("audio", {
  itemId: integer("item_id").primaryKey(),
  fileUrl: text("file_url").notNull(),
  duration: integer(),
});

export const documentTable = sqliteTable("document", {
  itemId: integer("item_id").primaryKey(),
  fileUrl: text("file_url").notNull(),
  format: text(),
  previewUrl: text("preview_url"),
});

export const imageTable = sqliteTable("image", {
  itemId: integer("item_id").primaryKey(),
  fileUrl: text("file_url").notNull(),
  width: integer(),
  height: integer(),
  altText: text("alt_text"),
});

export const textTable = sqliteTable("text", {
  itemId: integer("item_id").primaryKey(),
  itemText: text("item_text").notNull(),
});

export const seriesTable = sqliteTable("series", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  description: text(),
  createdBy: integer("created_by").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});

export const workSeriesTable = sqliteTable("work_series", {
  id: integer().primaryKey({ autoIncrement: true }),
  workId: integer("work_id")
    .notNull()
    .references(() => workTable.id),
  seriesId: integer("series_id")
    .notNull()
    .references(() => seriesTable.id),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});
