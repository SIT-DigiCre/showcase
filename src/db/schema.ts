import { relations } from "drizzle-orm";
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
  emailVerified: integer("email_verified", { mode: "timestamp_ms" }),
  name: text().notNull(),
  image: text(),
  cover: text(),
  bio: text(),
  role: text({ enum: ["admin", "user"] })
    .notNull()
    .default("user"),
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(userTable, ({ many }) => ({
  works: many(workTable),
  series: many(seriesTable),
}));

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
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});

export const workRelations = relations(workTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [workTable.authorId],
    references: [userTable.id],
  }),
  items: many(itemTable),
}));

export const itemTable = sqliteTable("item", {
  id: integer().primaryKey({ autoIncrement: true }),
  workId: integer("work_id")
    .notNull()
    .references(() => workTable.id),
  name: text().notNull(),
  fileUrl: text("file_url").notNull(),
  type: text({
    enum: ["image", "audio", "video", "asset"],
  }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});

export const itemRelations = relations(itemTable, ({ one }) => ({
  work: one(workTable, {
    fields: [itemTable.workId],
    references: [workTable.id],
  }),
}));

export const videoTable = sqliteTable("video", {
  id: text().primaryKey(),
  itemId: integer("item_id").references(() => itemTable.id),
  width: integer(),
  height: integer(),
});

export const audioTable = sqliteTable("audio", {
  id: text().primaryKey(),
  itemId: integer("item_id").references(() => itemTable.id),
  duration: integer(),
});

export const assetTable = sqliteTable("asset", {
  id: text().primaryKey(),
  itemId: integer("item_id").references(() => itemTable.id),
  format: text(),
  previewUrl: text("preview_url"),
});

export const imageTable = sqliteTable("image", {
  id: text().primaryKey(),
  itemId: integer("item_id").references(() => itemTable.id),
  width: integer(),
  height: integer(),
  altText: text("alt_text"),
});

export const seriesTable = sqliteTable("series", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  description: text(),
  createdBy: text("created_by")
    .notNull()
    .references(() => userTable.id),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date())
    .$onUpdate(() => new Date()),
});

export const seriesRelations = relations(seriesTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [seriesTable.createdBy],
    references: [userTable.id],
  }),
  works: many(workSeriesTable),
}));

export const workSeriesTable = sqliteTable("work_series", {
  id: integer().primaryKey({ autoIncrement: true }),
  workId: integer("work_id")
    .notNull()
    .references(() => workTable.id),
  seriesId: integer("series_id")
    .notNull()
    .references(() => seriesTable.id),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
});
