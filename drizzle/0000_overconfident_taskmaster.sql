CREATE TABLE `audio` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`file_url` text NOT NULL,
	`duration` integer
);
--> statement-breakpoint
CREATE TABLE `document` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`file_url` text NOT NULL,
	`format` text,
	`preview_url` text
);
--> statement-breakpoint
CREATE TABLE `image` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`file_url` text NOT NULL,
	`width` integer,
	`height` integer,
	`alt_text` text
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`work_id` integer NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer DEFAULT '"2025-04-08T04:17:09.709Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-04-08T04:17:09.709Z"' NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `work`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `series` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_by` integer NOT NULL,
	`created_at` integer DEFAULT '"2025-04-08T04:17:09.709Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-04-08T04:17:09.709Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `series_name_unique` ON `series` (`name`);--> statement-breakpoint
CREATE TABLE `text` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`item_text` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`icon_url` text,
	`cover_url` text,
	`bio` text,
	`role` text DEFAULT 'user' NOT NULL,
	`is_verified` integer DEFAULT false,
	`created_at` integer DEFAULT '"2025-04-08T04:17:09.709Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-04-08T04:17:09.709Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_slug_unique` ON `user` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `video` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`file_url` text NOT NULL,
	`width` integer,
	`height` integer
);
--> statement-breakpoint
CREATE TABLE `work_series` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`work_id` integer NOT NULL,
	`series_id` integer NOT NULL,
	`created_at` integer DEFAULT '"2025-04-08T04:17:09.709Z"' NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `work`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`series_id`) REFERENCES `series`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `work` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`content` text,
	`author_id` integer NOT NULL,
	`is_visible` integer DEFAULT false,
	`created_at` integer DEFAULT '"2025-04-08T04:17:09.709Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-04-08T04:17:09.709Z"' NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
