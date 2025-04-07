CREATE TABLE `item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`work_id` integer NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `item_audio` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`file_url` text NOT NULL,
	`duration` integer
);
--> statement-breakpoint
CREATE TABLE `item_document` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`file_url` text NOT NULL,
	`format` text,
	`preview_url` text
);
--> statement-breakpoint
CREATE TABLE `item_image` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`file_url` text NOT NULL,
	`width` integer,
	`height` integer,
	`alt_text` text
);
--> statement-breakpoint
CREATE TABLE `item_text` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`item_text` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `item_video` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`file_url` text NOT NULL,
	`width` integer,
	`height` integer,
	`has_caption` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `series` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_by` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `series_name_unique` ON `series` (`name`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`icon_url` text,
	`bio` text,
	`role` text DEFAULT 'user' NOT NULL,
	`is_verified` integer DEFAULT 0 NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `work` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`content` text,
	`author_id` integer NOT NULL,
	`visibility` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `work_series` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`work_id` integer NOT NULL,
	`series_id` integer NOT NULL,
	`created_at` integer
);
